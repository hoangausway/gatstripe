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
const Checkout = ({ cart, user }) => {
  const [loading, setLoading] = useState(false)
  const purchase = () => ({
    mode: 'payment',
    lineItems: cartLineItems(cart.items),
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
    clientReferenceId: cart.cartId,
    customerEmail: user.email
  })

  const redirectToCheckout = async event => {
    event.preventDefault()
    setLoading(true)

    const stripe = await getStripe()
    await stripe.redirectToCheckout(purchase())

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
const cartLineItems = items => {
  const extraItems = items.reduce(
    (acc, i) => acc.concat(i.extraItems || []),
    []
  )

  return mergeByPriceId(items).concat(mergeByPriceId(extraItems))
}

const mergeByPriceId = items => {
  return items.reduce((acc, i, idx) => {
    const p = acc.find(p => p.price && p.price === i.priceId)

    if (!p) return acc.concat([{ price: i.priceId, quantity: i.qty }])

    p.quantity = p.quantity + i.qty
    return acc
  }, [])
}

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
