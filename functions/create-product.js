require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { extrasObject, itemsObject } = require('./products')

exports.handler = async function (event, context) {
  /*
    create name field for extra item based on it's short name and charge price
  */
  const extraArray = Object.keys(extrasObject).map(key => {
    const extra = extrasObject[key]
    const chargePrice = calChargePrice(extra.goal_price)
    return {
      ...extra,
      key,
      chargePrice,
      name: `Extra $${(chargePrice / 100).toFixed(2)} ${extra.short_name}`
    }
  })

  const itemArray = Object.keys(itemsObject).map(key => {
    const item = itemsObject[key]
    const chargePrice = calChargePrice(item.goal_price)
    return { ...item, key, chargePrice }
  })

  const allProducts = extraArray.concat(itemArray)

  // stripe: create product and price for all items
  for (const p of allProducts) {
    const product = await stripe.products.create({
      unit_label: p.unit_label,
      name: p.name,
      description: p.name,
      metadata: { key: p.key }
    })

    // create price for the product
    if (product && product.id) {
      await stripe.prices.create({
        product: product.id,
        currency: 'aud',
        unit_amount: p.chargePrice // included part of transfer fee
      })
    }
  }

  const response = {
    statusCode: 201,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ itemNo: allProducts.length })
  }

  return response
}

// Helpers
const fixFee = 30 // cents
const percentFee = 0.05 // percent
const denom = 1 / (1 - percentFee)
const calChargePrice = goalPrice =>
  10 * Math.round(((goalPrice + fixFee) * denom) / 10)
// Example:
// goal price: 1253 cents -> charge price: 1260 cents -> then after toFixed(2) -> $12.60
