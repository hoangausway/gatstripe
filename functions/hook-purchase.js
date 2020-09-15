/*
  - check the webhook to make sure it’s valid
  - handle checkout.session.completed
*/

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { q, fauna } = require('./fauna')
const sgMail = require('@sendgrid/mail')
const { jsonError, jsonSuccess, reject, log } = require('./utils')

class ErrorUnexpectedEventType extends Error {}

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async ({ body, headers }) => {
  return Promise.resolve(
    stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    )
  )
    .then(handleEvent) // event -> {received}
    .then(jsonSuccess) // {received} -> {status, body}
    .catch(handleError) // err -> {status, body}
}

// Helpers
const handleError = err => {
  console.log('handleError', err.message)
  if (err instanceof ErrorUnexpectedEventType) {
    return jsonError(400, 'Unexpected event type')
  }
  // We won't return error: return jsonError(400, 'Webhook Error')
  // Error here should be our internal error. Just return {received: true} to Stripe
  return jsonSuccess({ received: true })
}

// event -> {received}
const handleEvent = event => {
  if (event.type === 'checkout.session.completed') {
    return handleCheckoutSessionCompleted(event)
  }
  return reject(new ErrorUnexpectedEventType('Not handled'))
}

// event -> {received}
const handleCheckoutSessionCompleted = event => {
  const session = sessionFromEvent(event)
  return searchChkoutId(session) // session -> {session, found, doc}
    .then(switchFound) // {session, found, doc} -> {cfi, doc}
    .then(sendEmailToShop) // {cfi, doc} -> doc
    .then(_ => ({ received: true })) // _ -> {received}
}

// session -> {session, found, doc}
const searchChkoutId = session => {
  return fauna
    .query(qSearchValue('chkouts-chkoutId')(session.client_reference_id))
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
  const shopEmail = doc.data.location.email
  console.log('shopEmail', shopEmail)

  const subject = doc.data
    ? `Purchase: Client reference id: ${cfi}`
    : `Charged without checkout document. Client reference id: ${cfi}`
  console.log('subject', subject)

  const html = doc ? htmlFromChkout(doc.data) : subject
  console.log('html', html)

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
const qSearchValue = index => value =>
  q.Let(
    { ref: q.Match(q.Index(index), value) },
    q.If(
      q.Exists(q.Var('ref')),
      { found: true, doc: q.Get(q.Var('ref')) },
      { found: false, doc: null, message: value }
    )
  )
const qUpdateChkout = (session, doc) => {
  const ts = Date.now()
  const tsCharged = session.payment_status === 'paid' ? ts : null
  return q.Update(doc.ref, {
    data: { ...doc, session, tsUpdated: ts, tsCharged }
  })
}

// Helpers
const htmlFromChkout = chkoutData => {
  return `<html>${JSON.stringify(chkoutData)}</html>` // to be implemeneted
}
