/*
  - check the webhook to make sure it’s valid
  - handle checkout.session.completed
*/

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const stripe = require('./services/stripe')
const sgMail = require('./services/sendgridmail')
const { q, fauna, qSearchValue } = require('./services/fauna')
const { jsonError, jsonSuccess, reject } = require('./utils')

class ErrorUnexpectedEventType extends Error {}
class ErrorAlreadyHandled extends Error {}

// Helpers - query constructors
const qNewStripeEvent = eventId => {
  return q.Create(q.Collection('stripe_events'), { data: { id: eventId } })
}

// Helpers - logics
const handleError = err => {
  console.log('handleError', err.message)
  if (err instanceof ErrorUnexpectedEventType) {
    return jsonError(400, 'Unexpected event type')
  }
  // We won't return error: return jsonError(400, 'Webhook Error')
  // Error here should be our internal error. Just return {received: true} to Stripe
  return jsonSuccess({ received: true })
}

// event -> session
const selectEvent = event => {
  // filter event
  if (event.type !== 'checkout.session.completed') {
    return reject(new ErrorUnexpectedEventType('Not handled'))
  }

  // reject if already handled
  const idxSearch = 'stripe_events_id'
  return fauna
    .query(qSearchValue(idxSearch)(event.id))
    .then(({ found, doc }) => {
      if (found) {
        return reject(new ErrorAlreadyHandled('Already handled'))
      }

      return fauna.query(qNewStripeEvent).then(_ => sessionFromEvent(event))
    })
}

// session -> {received}
const handleEvent = session => {
  return searchChkoutId(session) // session -> {session, found, doc}
    .then(switchFound) // {session, found, doc} -> {cfi, doc}
    .then(sendEmailToShop) // {cfi, doc} -> doc
    .then(_ => ({ received: true })) // _ -> {received}
}

// session -> {session, found, doc}
const searchChkoutId = session => {
  const idxSearch = 'chkouts_search_id'
  return fauna
    .query(qSearchValue(idxSearch)(session.client_reference_id))
    .then(({ found, doc }) => ({ session, found, doc }))
}

// {session, found, doc} -> {cfi, doc}
const switchFound = ({ session, found, doc }) => {
  if (found) {
    return fauna
      .query(qUpdateChkout(session, doc))
      .then(_ => ({ cfi: session.client_reference_id, doc }))
  }
  console.log(
    `Not found session.client_reference_id ${session.client_reference_id}`
  )
  return { cfi: session.client_reference_id, doc }
}

// {cfi, doc} -> doc
const sendEmailToShop = ({ cfi, doc }) => {
  console.log('to be sending email to shop regarding charge and chkout data')
  const shopEmail = doc.data.locEmail

  const subject = doc.data
    ? `Purchase: Client reference id: ${cfi}`
    : `Charged without checkout document. Client reference id: ${cfi}`

  const html = doc ? htmlFromChkout(doc.data) : subject

  const msg = {
    to: shopEmail,
    from: process.env.FROM_EMAIL_ADDRESS,
    subject,
    html
  }
  return sgMail.send(msg).then(_ => doc)
}

const sessionFromEvent = event => ({
  evId: event.id,
  tsEvent: event.created,
  obId: event.data.object.id,
  amount_total: event.data.object.amount_total,
  client_reference_id: event.data.object.client_reference_id,
  customer: event.data.object.customer,
  customer_email: event.data.object.customer_email,
  payment_method_types: event.data.object.payment_method_types,
  payment_status: event.data.object.payment_status
})

// Helpers - query construction
const qUpdateChkout = (session, doc) => {
  const ts = Date.now()
  const tsCharged = session.payment_status === 'paid' ? ts : null
  return q.Update(doc.ref, {
    data: { ...doc.data, tsUpdated: ts, tsCharged }
  })
}

// Helpers
const htmlFromChkout = chkoutData => {
  return `<html>${JSON.stringify(chkoutData)}</html>` // to be implemeneted
}

// lambda function
exports.handler = async ({ body, headers }) => {
  return Promise.resolve(
    stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    )
  )
    .then(selectEvent) // event -> session
    .then(handleEvent) // session -> {received}
    .then(jsonSuccess) // {received} -> {status, body}
    .catch(handleError) // err -> {status, body}
}
