const FlexSearch = require('flexsearch')
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
        p.options = item.options
        console.log(item.options)
      }
    }
  })

  const prepareItemsNode = createNodeFactory('Items')
  const prepareExtrasNode = createNodeFactory('Extras')
  const prepareIndexNode = createNodeFactory('Index')

  const [extraProds, prods] = _.partition(products, p => p.category === 'EXTRA')

  extraProds.forEach(p => {
    const node = prepareExtrasNode(p)
    createNode({ ...node, id: p.id })
  })

  let c = 1
  prods.forEach(p => {
    p.nid = c++ // add numbered id for faster searching later on
    const node = prepareItemsNode(p)
    createNode({ ...node, id: p.id })
  })

  // indexing
  // const index = createIndex(prods)
  const index = createFlexSearchIndex(prods)
  createNode(prepareIndexNode(index))
}

const createFlexSearchIndex = prods => {
  // add numbered id for faster searching later on
  const idx = new FlexSearch({
    encode: 'advanced',
    tokenize: 'reverse',
    suggest: true,
    cache: true,
    doc: {
      id: 'nid',
      field: ['name', 'tags', 'price']
    }
  })

  idx.add(prods)
  console.log('index.info()', idx.info())

  //  serialize index without docs
  const index = idx.export({ index: true, doc: false })

  return { index }
}

const isAnyDupName = items => {
  var names = items.map(item => item.name)
  return names.some((name, idx) => names.indexOf(name) !== idx)
}
