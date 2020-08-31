require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async ({ body, headers }) => {
  try {
    // check the webhook to make sure it’s valid
    const event = await stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    )

    switch (event.type) {
      case 'charge.succeeded':
        handleChargeSucceeded(event)
        break
      case 'checkout.session.completed':
        handleCheckoutSessionCompleted(event)
        break
      default:
        // Unexpected event type
        return { statusCode: 400 }
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) }
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`)

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    }
  }
}

const handleChargeSucceeded = event => {
  console.log('handleChargeSucceeded', event)

  const dataObj = event.data.object
  const chargeSucceeded = {
    amount: (dataObj.amount / 100).toFixed(2),
    created: dataObj.created,
    customer: dataObj.customer,
    description: dataObj.description,
    receipt_url: dataObj.receipt_url
  }

  // Send and email to our fulfillment provider using Sendgrid.
  const msg = {
    to: process.env.FULFILLMENT_EMAIL_ADDRESS,
    from: process.env.FROM_EMAIL_ADDRESS,
    subject: `New purchase charged $${chargeSucceeded.amount}`,
    text: emailText(chargeSucceeded)
  }
  sgMail.send(msg)
}

// Helpers
const handleCheckoutSessionCompleted = event => {
  console.log('handleCheckoutSessionCompleted', event)
}

// To be return text from a mail template with content filledup with chargeSucceeded data
const emailText = chargeSucceeded => JSON.stringify(chargeSucceeded)
