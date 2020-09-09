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
  const [total, setTotal] = useState(0)

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

  React.useEffect(() => {
    setTotal(calTotal(cart.items))
  }, [cart.items])

  return (
    <button
      disabled={loading}
      style={
        loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
      }
      onClick={redirectToCheckout}
    >
      {`Checkout $${total}`}
    </button>
  )
}

export default Checkout

// Helpers
const mergeByPriceId = items => {
  return items.reduce((acc, i, idx) => {
    const p = acc.find(p => p.price && p.price === i.priceId)

    if (!p) return acc.concat([{ price: i.priceId, quantity: i.qty }])

    p.quantity = p.quantity + i.qty
    return acc
  }, [])
}

const cartLineItems = items => {
  const extraItems = items.reduce(
    (acc, i) => acc.concat(i.extraItems || []),
    []
  )

  return mergeByPriceId(items).concat(mergeByPriceId(extraItems))
}

const calTotal = items => {
  const extraItems = items.reduce(
    (acc, i) => acc.concat(i.extraItems || []),
    []
  )

  const extrasTotal = extraItems.reduce(
    (acc, i) => acc + i.chargePrice * i.qty,
    0
  )
  const itemsTotal = items.reduce((acc, i) => acc + i.chargePrice * i.qty, 0)
  return ((extrasTotal + itemsTotal) / 100).toFixed(2)
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
