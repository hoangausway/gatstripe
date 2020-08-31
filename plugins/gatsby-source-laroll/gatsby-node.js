const createNodeHelpers = require('gatsby-node-helpers').default
const Stripe = require('stripe')
// const { itemsObject, extrasObject } = require('./products')
const { itemsObject, extrasObject } = require('../../functions/products')

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

  /*
    Get price list and product list
    product: {id, name, description, metadata, ...rest}
    price: {id, unit_amount, product, ...rest} where product is id of a product

  */
  const stripe = new Stripe(secretKey)
  const priceListObject = await stripe.prices.list({ limit: 100 }) // limit 100
  const productListObject = await stripe.products.list({ limit: 100 })

  const prices = priceListObject.data
  const products = productListObject.data

  /*
    Transform data: array of regular products and array of extra products
    product:
    {
      key,
      productId, priceId,
      priceCents, price,
      name,
      description,
      unit_label,
      category,
      options,
      extras,
      gst,
      tags
    }

    pextra:
    {
      key,
      productId, priceId,
      priceCents, price,
      name,
      description
      unit_label,
      short_name
    }
  */

  // merge price to product
  const pp = products.map(p => {
    const price = prices.find(pce => pce.product === p.id)
    return price ? { ...p, priceId: price.id, price: price.unit_amount } : p
  })

  // merger products to extras and items
  const extras = Object.keys(extrasObject).map(k => {
    const p = pp.find(p => p.metadata.key === k)
    if (!p) {
      return extrasObject[k] // something not matched; should raise error
    }

    return {
      ...extrasObject[k],
      productId: p.id,
      priceId: p.priceId,
      chargePrice: p.price,
      price: (p.price / 100).toFixed(2),
      name: p.name,
      id: k
    }
  })

  const items = Object.keys(itemsObject).map(k => {
    const p = pp.find(p => p.metadata.key === k)
    if (!p) {
      return itemsObject[k] // something not matched; should raise error
    }

    return {
      ...itemsObject[k],
      productId: p.id,
      priceId: p.priceId,
      chargePrice: p.price,
      price: (p.price / 100).toFixed(2),
      name: p.name,
      id: k
    }
  })

  let c = 1
  items.forEach(i => (i.nid = c++)) // add numbered id for faster searching later on

  const prepareNode = createNodeFactory('JSONData')
  createNode(
    prepareNode({
      items: JSON.stringify(items),
      extras: JSON.stringify(extras),
      id: 'Products'
    })
  )
}
