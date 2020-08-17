const _ = require('lodash')

const { exitems, extras, items } = require('../plugins/gatsby-source-laroll/products')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  // no extras and with extras
  const [itemsNoExtras, itemsWithExtras] = _.partition(
    items,
    item => item.extras === 'none'
  )

  // join each 'extra' item to list of related 'regular' items in itemsWithExtras
  const exitemsMap = Object.keys(exitems).map(exitemKey => {
    const is = []
    for (const ie of itemsWithExtras) {
      if (_.includes(extras[ie.extras], exitemKey)) {
        ie.metadata = { extras: [] } // mutate the ie item
        is.push(ie)
      }
    }
    return { ...exitems[exitemKey], items: is }
  })

  /*
    create product and price for each extra item
    assign product.id to related regular items
  */
  for (const exItem of exitemsMap) {
    // create product for extra item
    const exname = `Extra $${(exItem.price / 100).toFixed(2)} ${exItem.name}`
    const product = await stripe.products.create({
      unit_label: exItem.unit_label,
      name: exname,
      description: exname
    })

    // assign product.id to related regular items itemsWithExtras
    for (const i of exItem.items) {
      i.metadata.extras.push(product.id)
    }
    // create price for extra item
    await stripe.prices.create({
      product: product.id,
      currency: 'aud',
      unit_amount: chargePrice(exItem.price) // included part of transfer fee
    })
  }

  /*
    create product and price for regular item
  */
  for (const item of itemsWithExtras) {
    const metadata = {
      ...item.metadata,
      extras: item.metadata.extras.join(',') // array to string
    }
    // create product for regular item
    const product = await stripe.products.create({
      unit_label: item.unit_label,
      name: item.name,
      description: item.description,
      metadata: metadata // this contain object with one field 'extras' which is a list of related extra products, joined by ','
    })

    // create price for extra item
    await stripe.prices.create({
      product: product.id,
      currency: 'aud',
      unit_amount: chargePrice(item.price) // included part of transfer fee
    })
  }

  /*
    create product and price for regular item which have no extra products
  */
  for (const item of itemsNoExtras) {
    // create product for regular item
    const product = await stripe.products.create({
      unit_label: item.unit_label,
      name: item.name,
      description: item.description
    })

    // create price for extra item
    await stripe.prices.create({
      product: product.id,
      currency: 'aud',
      unit_amount: chargePrice(item.price) // included part of transfer fee
    })
  }

  const response = {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    // body: JSON.stringify({ count: products.length, products })
    body: 'please wait till done'
  }

  return response
}

const fixFee = 30 // cents
const percentFee = 0.05 // percent
const denom = 1 / (1 - percentFee)
const chargePrice = goalPrice =>
  10 * Math.round(((goalPrice + fixFee) * denom) / 10) // 1253 cents -> 1260 cents -> then after toFixed(2) -> $12.60
