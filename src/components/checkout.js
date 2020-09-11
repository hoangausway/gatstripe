import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import style from './checkout.module.scss'

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

/*
  3 factors for checkout process
  - Who: name, phone, and a VALID email. Verify and confirm against server.
  - Where: outlet. Available offline in app.
  - What: item list. Available offline in app.
*/
const Checkout = () => {
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)

  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  // stripe purchase structure
  const purchase = () => ({
    mode: 'payment',
    lineItems: cartLineItems(cart.items),
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
    clientReferenceId: cart.cartId,
    customerEmail: user.email
  })

  const handler = e => {
    // check outlet

    // check contact: verify-email against server
    

  }

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
    <div
      disabled={loading}
      className={
        loading ? cx(style.button, style.button_disable) : style.button
      }
      onClick={redirectToCheckout}
    >
      {`Checkout $${total}`}
    </div>
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
