import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import cns from 'classnames'
import style from './checkout.module.scss'
import { aChkoutCreate, aChkoutUpdate } from '../state/checkout-reducer'

/*
  3 factors for checkout process
  - Who: customer's name, phone, and a VALID email. Verify and confirm email against server.
  - Where: outlet's location. Location list is available offline in app.
  - What: selected items. Items list is available offline in app.
*/
const Reasons = {
  SHOULD_CONFIRM_EMAIL:
    'Your email is first time use with our system. Please check your email and follow instructions for confirming.',
  ERROR_INVALID_REQUEST: 'Invalid request',
  ERROR_INVALID_DATA: 'Invalid data',
  ERROR_INVALID_USER: 'Invalid user',
  ERROR_INVALID_LOCATION: 'Invalid location',
  ERROR_INVALID_CART: "Invalid cart's contents",
  ERROR_EMAIL_VERIFY: 'Could not verify email',
  ERROR_USER_UPDATE: 'Could not update data'
}

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

const calTotal = cart => {
  const extraItems = cart.reduce((acc, i) => acc.concat(i.extraItems || []), [])

  const extrasTotal = extraItems.reduce(
    (acc, i) => acc + i.chargePrice * i.qty,
    0
  )

  const cartTotal = cart.reduce((acc, i) => acc + i.chargePrice * i.qty, 0)
  return ((extrasTotal + cartTotal) / 100).toFixed(2)
}

// Helpers - API
// purchaseIntent:: chkout -> chkout or reject(reason)
const purchaseIntent = chkout => {
  return window
    .fetch(urlVerify, reqVerify(chkout))
    .then(res =>
      res.status === 200 ? res.json() : reject(new ErrorRequest(res.statusText))
    )
    .then(json => {
      const isReady = json.chkoutId && json.chkoutId === chkout.chkoutId
      return isReady ? chkout : reject(new ErrorEmail(json.message))
    })
}
const urlVerify = '/.netlify/functions/purchase-intent'
const reqVerify = chkout => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify(chkout)
})

// Helpers - CSS
const clsLoading = loading =>
  loading ? cns(style.button, style.button_disable) : style.button

// Helpers - logics
const startLoading = setIsLoading => chkout => {
  setIsLoading(true)
  return chkout
}
const endLoading = setIsLoading => setIsLoading(false)

const createChkout = (user, location, cart) => ({
  chkoutId: uuidv4(),
  user,
  location,
  cart, // [..., {itemId, qty, extras, options, priceId, productId}]
  tsCreated: Date.now(), // timestamp
  tsCharged: null,
  tsCharging: null,
  tsChargeFailed: null
})

const purchase = chkout => ({
  mode: 'payment',
  clientReferenceId: chkout.chkoutId,
  customerEmail: chkout.user.email,
  lineItems: cartLineItems(chkout.cart),
  successUrl: `${window.location.origin}/success`,
  cancelUrl: `${window.location.origin}/cancel`
})

const stripeRedirect = dispatch => chkout => {
  dispatch(aChkoutCreate({ ...chkout, tsCharging: Date.now() }))

  return loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
    .then(stripe => stripe.redirectToCheckout(purchase(chkout)))
    .then(result => {
      if (!result.error) {
        dispatch(aChkoutUpdate({ chkout, tsCharged: Date.now() }))
        return result
      }
      dispatch(aChkoutUpdate({ chkout, tsChargeFailed: Date.now() }))
      return reject(result.error.message || 'Could not redirect to checkout')
    })
}

const validateContact = user =>
  user.email.length * user.name.length * user.phone.length > 0
const validateLocation = location => location.locId !== 'LOC_NONE'
const validateCart = cart => cart.length > 0
// validateChkout:: chkout -> Promise
const validateChkout = chkout => {
  if (!validateContact(chkout.user)) {
    return reject(Reasons.ERROR_INVALID_USER)
  }
  if (!validateLocation(chkout.location)) {
    return reject(Reasons.ERROR_INVALID_LOCATION)
  }
  if (!validateCart(chkout.cart)) {
    return reject(Reasons.ERROR_INVALID_CART)
  }

  return resolve(chkout)
}

class ErrorEmail extends Error {}
class ErrorRequest extends Error {}
const reject = err => Promise.reject(err)
const resolve = res => Promise.resolve(res)

const Checkout = () => {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  const location = useSelector(state => state.location)

  const [isLoading, setIsLoading] = useState(false)

  const [total, setTotal] = useState(0)

  const handler = (user, location, cart) => e => {
    e.preventDefault()

    const chkout = createChkout(user, location, cart)
    resolve(chkout)
      .then(startLoading(setIsLoading)) // chkout -> chkout
      .then(validateChkout) // chkout -> chkout
      .then(purchaseIntent) // chkout -> chkout
      .then(stripeRedirect(dispatch))
      .catch(err => console.log(err.name))
      .finally(() => endLoading(setIsLoading))
  }

  React.useEffect(() => {
    setTotal(calTotal(cart))
  }, [cart])

  return (
    <div
      disabled={isLoading}
      className={clsLoading(isLoading)}
      onClick={handler(user, location, cart)}
    >
      {`Checkout $${total}`}
    </div>
  )
}

export default Checkout
