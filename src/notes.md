#Production build error:
- gatsby build
- Error:
"You did not provide an API key. You need to provide your API key in the Authorization header, using Bearer auth   (e.g. 'Authorization: Bearer YOUR_SECRET_KEY'). See https://stripe.com/docs/api#authentication for details, or we can   help at https://support.stripe.com/"

- Reason: missing .env.production
- Fix: add .env.production with valid environment variables


#Production build error:
- gatsby build
- Error: 
"Building static HTML failed for path ..."
eturn function useStore() {
  20 |     var _useReduxContext = useReduxContext(),
> 21 |         store = _useReduxContext.store;
     | ^
  22 | 
  23 |     return store;
  24 |   };
"WebpackError: TypeError: Cannot read property 'store' of null"

- Reason: gatsby-ssr.js doesn't have codes relating to wrapRootElement
- Fix: gatsby-ssr.js
Add the same codes as in gatsby-browser.js regarding 'wrapRootElement'
import wrapWithProvider from './wrap-with-provider'
export const wrapRootElement = wrapWithProvider


<!-- Sample stripe notification objects sending to webhook endpoints -->
export const handleChargeSucceeded1 = {
  id: 'evt_1HLlqaE6fo1LgU9nMoIZaewD',
  object: 'event',
  api_version: '2020-08-27',
  created: 1598775907,
  data: {
    object: {
      id: 'ch_1HLlqYE6fo1LgU9nNMbeZTwA',
      object: 'charge',
      amount: 3140,
      amount_refunded: 0,
      application: null,
      application_fee: null,
      application_fee_amount: null,
      balance_transaction: 'txn_1HLlqZE6fo1LgU9niR8C2w9J',
      billing_details: [Object],
      calculated_statement_descriptor: 'AUSWAY',
      captured: true,
      created: 1598775906,
      currency: 'aud',
      customer: 'cus_Hvd63kUcRcaRza',
      description: '3x BANH MI BACON & Eggs 4x BANH MI PLAIN Roll',
      destination: null,
      dispute: null,
      disputed: false,
      failure_code: null,
      failure_message: null,
      fraud_details: {},
      invoice: null,
      livemode: false,
      metadata: {},
      on_behalf_of: null,
      order: null,
      outcome: [Object],
      paid: true,
      payment_intent: 'pi_1HLlpxE6fo1LgU9nqaZAjQtR',
      payment_method: 'pm_1HLlqYE6fo1LgU9nYAqwP0TV',
      payment_method_details: [Object],
      receipt_email: null,
      receipt_number: null,
      receipt_url:
        'https://pay.stripe.com/receipts/acct_175C1oE6fo1LgU9n/ch_1HLlqYE6fo1LgU9nNMbeZTwA/rcpt_Hvd6eND6VTxcGoAer53Ytj5FZM8PkKS',
      refunded: false,
      refunds: [Object],
      review: null,
      shipping: null,
      source: null,
      source_transfer: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: 'succeeded',
      transfer_data: null,
      transfer_group: null
    }
  },
  livemode: false,
  pending_webhooks: 4,
  request: { id: 'req_gTdysu7QCwa3XI', idempotency_key: null },
  type: 'charge.succeeded'
}

export const handleChargeSucceeded2 = {
  id: 'evt_1HLlxmE6fo1LgU9naPu0ObEX',
  object: 'event',
  api_version: '2020-08-27',
  created: 1598776353,
  data: {
    object: {
      id: 'ch_1HLlxlE6fo1LgU9ndhK9DUmt',
      object: 'charge',
      amount: 140,
      amount_refunded: 0,
      application: null,
      application_fee: null,
      application_fee_amount: null,
      balance_transaction: 'txn_1HLlxlE6fo1LgU9nqZUb1pon',
      billing_details: [Object],
      calculated_statement_descriptor: 'AUSWAY',
      captured: true,
      created: 1598776353,
      currency: 'aud',
      customer: 'cus_HvdEmtaDw0LUF6',
      description: '1x BANH MI PLAIN Roll',
      destination: null,
      dispute: null,
      disputed: false,
      failure_code: null,
      failure_message: null,
      fraud_details: {},
      invoice: null,
      livemode: false,
      metadata: {},
      on_behalf_of: null,
      order: null,
      outcome: [Object],
      paid: true,
      payment_intent: 'pi_1HLlxIE6fo1LgU9nNLhpHta2',
      payment_method: 'pm_1HLlxkE6fo1LgU9n4ETlUTA9',
      payment_method_details: [Object],
      receipt_email: null,
      receipt_number: null,
      receipt_url:
        'https://pay.stripe.com/receipts/acct_175C1oE6fo1LgU9n/ch_1HLlxlE6fo1LgU9ndhK9DUmt/rcpt_HvdEt7SxI9zk2OGN2FvesyhkiwGgo00',
      refunded: false,
      refunds: [Object],
      review: null,
      shipping: null,
      source: null,
      source_transfer: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: 'succeeded',
      transfer_data: null,
      transfer_group: null
    }
  },
  livemode: false,
  pending_webhooks: 3,
  request: { id: 'req_GkF4kYy60JioO7', idempotency_key: null },
  type: 'charge.succeeded'
}

export const handleCheckoutSessionCompleted1 = {
  id: 'evt_1HLlqaE6fo1LgU9ntG6G80Rh',
  object: 'event',
  api_version: '2020-08-27',
  created: 1598775908,
  data: {
    object: {
      id: 'cs_test_U240Cc3NFSUw7R6xw8WQrOgTeIje8p8bclsFynjrRNDCJL5UjGCw69p9',
      object: 'checkout.session',
      allow_promotion_codes: null,
      amount_subtotal: 3140,
      amount_total: 3140,
      billing_address_collection: null,
      cancel_url: 'http://localhost:8000/cancel',
      client_reference_id: '1598775867377-3140}',
      currency: 'aud',
      customer: 'cus_Hvd63kUcRcaRza',
      customer_email: null,
      livemode: false,
      locale: null,
      metadata: {},
      mode: 'payment',
      payment_intent: 'pi_1HLlpxE6fo1LgU9nqaZAjQtR',
      payment_method_types: [Array],
      setup_intent: null,
      shipping: null,
      shipping_address_collection: null,
      submit_type: null,
      subscription: null,
      success_url: 'http://localhost:8000/success',
      total_details: [Object]
    }
  },
  livemode: false,
  pending_webhooks: 3,
  request: { id: null, idempotency_key: null },
  type: 'checkout.session.completed'
}
export const handleCheckoutSessionCompleted2 = {
  id: 'evt_1HLlxmE6fo1LgU9nf37Tw2AC',
  object: 'event',
  api_version: '2020-08-27',
  created: 1598776354,
  data: {
    object: {
      id: 'cs_test_h0bRhda7169SlkcXp288SozL6IpLiRAX3cNv6a7aSORDjcZyZ7cqzywT',
      object: 'checkout.session',
      allow_promotion_codes: null,
      amount_subtotal: 140,
      amount_total: 140,
      billing_address_collection: null,
      cancel_url: 'http://localhost:8000/cancel',
      client_reference_id: '1598776322751-140}',
      currency: 'aud',
      customer: 'cus_HvdEmtaDw0LUF6',
      customer_email: null,
      livemode: false,
      locale: null,
      metadata: {},
      mode: 'payment',
      payment_intent: 'pi_1HLlxIE6fo1LgU9nNLhpHta2',
      payment_method_types: [Array],
      setup_intent: null,
      shipping: null,
      shipping_address_collection: null,
      submit_type: null,
      subscription: null,
      success_url: 'http://localhost:8000/success',
      total_details: [Object]
    }
  },
  livemode: false,
  pending_webhooks: 2,
  request: { id: null, idempotency_key: null },
  type: 'checkout.session.completed'
}
/*
  With prefilled customer email
*/
export const handleCheckoutSessionCompleted = {
  id: 'evt_1HLzeCE6fo1LgU9n8cjloNeY',
  object: 'event',
  api_version: '2020-08-27',
  created: 1598828956,
  data: {
    object: {
      id: 'cs_test_ppF45E70whiSAOtUYWYfmdsUdcW1cEFNRsJWllriSU4JpChL3KZ7Iaqh',
      object: 'checkout.session',
      allow_promotion_codes: null,
      amount_subtotal: 720,
      amount_total: 720,
      billing_address_collection: null,
      cancel_url: 'http://localhost:8000/cancel',
      // purchase ref created right before stripe.redirectToCheckout called from client app
      client_reference_id: '1598828936460-720',
      currency: 'aud',
      customer: 'cus_HvrMphNouXJ4z7',
      // prefilled customer email
      customer_email: 'hoang21@gmail.com',
      livemode: false,
      locale: null,
      metadata: {},
      mode: 'payment',
      payment_intent: 'pi_1HLzduE6fo1LgU9ni70dkiWe',
      payment_method_types: [Array],
      setup_intent: null,
      shipping: null,
      shipping_address_collection: null,
      submit_type: null,
      subscription: null,
      success_url: 'http://localhost:8000/success',
      total_details: [Object]
    }
  },
  livemode: false,
  pending_webhooks: 3,
  request: { id: null, idempotency_key: null },
  type: 'checkout.session.completed'
}

export const handleChargeSucceeded = {
  id: 'evt_1HLzeBE6fo1LgU9n5rZcw4rt',
  object: 'event',
  api_version: '2020-08-27',
  created: 1598828955,
  data: {
    object: {
      id: 'ch_1HLzeAE6fo1LgU9nIEAaxXov',
      object: 'charge',
      amount: 720,
      amount_refunded: 0,
      application: null,
      application_fee: null,
      application_fee_amount: null,
      balance_transaction: 'txn_1HLzeBE6fo1LgU9nph13nh8j',
      billing_details: [Object],
      calculated_statement_descriptor: 'AUSWAY',
      captured: true,
      created: 1598828954,
      currency: 'aud',
      customer: 'cus_HvrMphNouXJ4z7',
      description: '1x BANH MI VEGGIES',
      destination: null,
      dispute: null,
      disputed: false,
      failure_code: null,
      failure_message: null,
      fraud_details: {},
      invoice: null,
      livemode: false,
      metadata: {},
      on_behalf_of: null,
      order: null,
      outcome: [Object],
      paid: true,
      payment_intent: 'pi_1HLzduE6fo1LgU9ni70dkiWe',
      payment_method: 'pm_1HLze9E6fo1LgU9nwNb2RPAT',
      payment_method_details: [Object],
      // thanks to prefilled customer email: Stripe will send receipt to this email address
      receipt_email: 'hoang21@gmail.com',
      receipt_number: null,
      receipt_url:
        'https://pay.stripe.com/receipts/acct_175C1oE6fo1LgU9n/ch_1HLzeAE6fo1LgU9nIEAaxXov/rcpt_HvrMLhDKr191C0YDQFgtF5hE7bKj5Nq',
      refunded: false,
      refunds: [Object],
      review: null,
      shipping: null,
      source: null,
      source_transfer: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: 'succeeded',
      transfer_data: null,
      transfer_group: null
    }
  },
  livemode: false,
  pending_webhooks: 3,
  request: { id: 'req_xFbYDetySADDUK', idempotency_key: null },
  type: 'charge.succeeded'
}
