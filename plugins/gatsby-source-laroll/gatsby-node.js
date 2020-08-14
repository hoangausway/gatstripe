const createNodeHelpers = require('gatsby-node-helpers').default
const Stripe = require('stripe')
const lunr = require('lunr')
const fs = require('fs')
const _ = require('lodash')

exports.onPreInit = () => {
  console.log('Testing plugin gatsby-source-laroll...')
}

exports.sourceNodes = async (
  { actions },
  { secretKey = '', indexFilePath }
) => {
  const { createNode } = actions
  const { createNodeFactory } = createNodeHelpers({
    typePrefix: 'LRStripe'
  })
  const prepareProductsNode = createNodeFactory('Products')

  const stripe = new Stripe(secretKey)
  const priceListObject = await stripe.prices.list({ limit: 100 })
  const productListObject = await stripe.products.list({ limit: 100 })

  const prices = priceListObject.data
  const products = productListObject.data

  const docs = []
  const store = {}

  products.forEach(product => {
    const price = prices.find(p => p.product === product.id)
    if (price) {
      // add price fields to product: mutation by intention
      product.priceId = price.id
      product.priceCents = price.unit_amount
      product.price = (price.unit_amount / 100).toFixed(2)
      product.tags = product.metadata.TAGS

      // create source node
      const node = prepareProductsNode(product)
      createNode({ ...node, id: product.id })

      // accumulate products object for using with lunr later on
      docs.push(product)
    }
  })

  // gorup products by category then sort them
  const cats = _.groupBy(products, product => product.metadata.CATEGORY)
  for (ps in cats) {
    cats[ps] = cats[ps].sort(sortProductName)
  }
  const categories = Object.keys(cats)
    .sort()
    .map(key => [key, cats[key]])

  // create lunr search index and store
  const index = lunr(function () {
    this.ref('id')
    this.field('name')
    this.field('description')
    this.field('tags')
    this.field('price')

    docs.forEach(function (doc) {
      this.add(doc)
      store[doc.id] = doc
    }, this)
  })
  fs.writeFileSync(indexFilePath, JSON.stringify({ index, store, categories }))
}

const sortProductName = (a, b) =>
  a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
