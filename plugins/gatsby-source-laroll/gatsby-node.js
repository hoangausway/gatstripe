const lunr = require('lunr')
const _ = require('lodash')
const createNodeHelpers = require('gatsby-node-helpers').default
const Stripe = require('stripe')
const { items } = require('./products')

exports.onPreInit = () => {
  console.log('Testing plugin gatsby-source-laroll...')
}

exports.sourceNodes = async (
  { actions },
  { secretKey = '', indexFilePath }
) => {
  // make sure items have uniqe names
  if (isAnyDupName(items)) {
    console.log('some name is duplicated')
    return
  }

  const { createNode } = actions
  const { createNodeFactory } = createNodeHelpers({
    typePrefix: 'LRStripe'
  })

  const stripe = new Stripe(secretKey)
  const priceListObject = await stripe.prices.list({ limit: 100 }) // limit 100
  const productListObject = await stripe.products.list({ limit: 100 })

  const prices = priceListObject.data
  const products = productListObject.data

  const itemsByName = items.reduce(
    (acc, item) => ({ ...acc, [item.name]: item }),
    {}
  )
  // first round processing
  products.forEach(p => {
    const price = prices.find(pce => pce.product === p.id)
    if (price) {
      // add price related fields
      p.priceId = price.id
      p.priceCents = price.unit_amount
      p.price = (price.unit_amount / 100).toFixed(2)

      if (p.metadata) {
        p.extras = p.metadata.extras
      }

      // temporary set category as 'extra'
      p.category = 'EXTRA'

      const item = itemsByName[p.name]

      if (item) {
        // reset category for items which are not extra
        p.category = item.category
        p.tags = item.tags
        p.gst = item.gst
      }
    }
  })

  const prepareItemsNode = createNodeFactory('Items')
  const prepareExtrasNode = createNodeFactory('Extras')
  const prepareIndexNode = createNodeFactory('LunrIndex')

  const [extraProds, prods] = _.partition(products, p => p.category === 'EXTRA')

  extraProds.forEach(p => {
    const node = prepareExtrasNode(p)
    createNode({ ...node, id: p.id })
  })

  prods.forEach(p => {
    const node = prepareItemsNode(p)
    createNode({ ...node, id: p.id })
  })

  // indexing
  const index = createIndex(prods)
  createNode(prepareIndexNode(index))
}

const isAnyDupName = items => {
  var names = items.map(item => item.name)
  return names.some((name, idx) => names.indexOf(name) !== idx)
}

const createIndex = prods => {
  // create lunr search index and store
  const store = {}
  const idx = lunr(function () {
    this.ref('id')
    this.field('name')
    this.field('description')
    this.field('tags')
    this.field('price')

    prods.forEach(function (doc) {
      this.add(doc)
      store[doc.id] = doc
    }, this)
  })
  return { index: JSON.stringify({ idx, store }) }
}
