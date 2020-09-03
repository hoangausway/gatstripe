import { v4 as uuidv4 } from 'uuid'
import { set, get } from 'idb-keyval'
import { dispatch } from 'rxjs/internal/observable/pairs'

// types
export const CartActions = {
  CART_LOADED: 'cart loaded',
  CART_UPDATED: 'cart updated'
}

// action creators
export const aCartLoaded = cart => ({
  type: CartActions.CART_LOADED,
  payload: cart
})

export const aCartUpdated = cart => ({
  type: CartActions.CART_UPDATED,
  payload: cart
})

// asynchronous action creators
export const aCartAddItem = item => dispatch => {
  return updateCartItems(item, addItem).then(cart =>
    dispatch(aCartUpdated(cart))
  )
}

export const aCartRemItem = itemId => dispatch => {
  return updateCartItems(itemId, remItem).then(cart =>
    dispatch(aCartUpdated(cart))
  )
}

export const aCartIncQty = itemId => dispatch => {
  return updateCartItems(itemId, incQty).then(cart =>
    dispatch(aCartUpdated(cart))
  )
}

export const aCartDecQty = itemId => dispatch => {
  return updateCartItems(itemId, decQty).then(cart =>
    dispatch(aCartUpdated(cart))
  )
}

export const aCartLoad = () => dispatch =>
  load().then(cart => dispatch(aCartLoaded(cart)))

// cart contents
const MailStatus = {
  MAIL_UNVERIFIED: 'not verified',
  MAIL_VERIFYING: 'verifying',
  MAIL_VERIMAIED: 'verified'
}

const CartStatus = {
  CART_CREATED: 'created',
  CART_CHARGED: 'charged',
  CART_CHARGING: 'charging',
  CART_CANCELLED: 'cancelled',
  CART_REMOVED: 'removed'
}

// cart shape:
export const cartInitialState = {
  cartId: '',
  items: [], // {itemId, qty, extras, options, priceId, productId}
  name: '',
  phone: '',
  email: null,
  verified: MailStatus.MAIL_UNVERIFIED,
  dateCreated: null,
  dateCharged: null,
  dateRemoved: null,
  status: CartStatus.CART_CREATED
}

// reducer
export default (state = cartInitialState, { type, payload }) => {
  switch (type) {
    case CartActions.CART_LOADED:
    case CartActions.CART_UPDATED:
      return payload
    default:
      return state
  }
}

// Helpers
// load a pending cart from db; create new one if undefined
const load = () => getCart().then(setCart)

// getCart:: () -> Promise.resolve(cart)
const getCart = () =>
  get('cart').then(
    cart =>
      cart || { ...cartInitialState, cartId: uuidv4(), dateCreated: Date.now() }
  )

// setCart:: cart -> Promise.resolve(cart)
const setCart = cart => set('cart', cart).then(() => Promise.resolve(cart))

// updateCartItems:: param -> f -> Promise.resolve(cart)
// f:: param -> cart -> cart
const updateCartItems = (param, f) =>
  getCart()
    .then(f(param))
    .then(setCart)

// create an item
const createItem = (item, qty) => {
  const itemId = uuidv4()
  return { ...item, itemId, qty }
}

// functions updating cart's items
const addItem = item => cart => ({
  ...cart,
  items: cart.items.concat([createItem(item, 1)])
})

const remItem = itemId => cart => {
  const items = cart.items.reduce(
    (acc, i) => (i.itemId !== itemId ? [...acc, i] : acc),
    []
  )
  return { ...cart, items }
}

const incQty = itemId => cart => {
  const items = cart.items.map(i =>
    i.itemId !== itemId ? i : { ...i, qty: i.qty + 1 }
  )
  return { ...cart, items }
}

const decQty = itemId => cart => {
  const items = cart.items.map(i =>
    i.itemId !== itemId ? i : { ...i, qty: i.qty - 1 < 0 ? 0 : i.qty - 1 }
  )
  return { ...cart, items }
}
