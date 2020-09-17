require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
module.exports = { stripe }
