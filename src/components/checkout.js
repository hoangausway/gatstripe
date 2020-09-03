import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

// !!!To be refactored: cart.email should be filled with valid email
const Checkout = ({ cart }) => {
  const [loading, setLoading] = useState(false)
  const amount = cart.items.reduce((acc, i) => acc + i.qty * i.chargePrice, 0)
  const purchase = {
    mode: 'payment',
    lineItems: cartLineItems(cart.items),
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
    clientReferenceId: `${cart.email}_${Date.now()}_${amount}`,
    customerEmail: cart.email
      ? cart.email
      : process.env.FULFILLMENT_EMAIL_ADDRESS
  }

  console.log('clientReferenceId', purchase.clientReferenceId)

  const redirectToCheckout = async event => {
    event.preventDefault()
    setLoading(true)

    const stripe = await getStripe()
    await stripe.redirectToCheckout(purchase)

    setLoading(false)
  }

  return (
    <button
      disabled={loading}
      style={
        loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
      }
      onClick={redirectToCheckout}
    >
      Checkout
    </button>
  )
}

export default Checkout

// Helpers
const cartLineItems = items =>
  items.map(i => ({ price: i.priceId, quantity: i.qty }))

// Helpers CSS
const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#000',
  padding: '12px 60px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: 'rgb(255, 178, 56)',
  borderRadius: '6px',
  letterSpacing: '1.5px'
}

const buttonDisabledStyles = {
  opacity: '0.5',
  cursor: 'not-allowed'
}
