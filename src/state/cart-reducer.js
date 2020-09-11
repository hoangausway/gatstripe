import { v4 as uuidv4 } from 'uuid'
import { set, get } from 'idb-keyval'

// types
export const CartActions = {
  CART_LOADED: 'CART_LOADED',
  CART_UPDATED: 'CART_UPDATED'
}

// action creators
const aCartLoaded = cart => ({
  type: CartActions.CART_LOADED,
  payload: cart
})

const aCartUpdated = cart => ({
  type: CartActions.CART_UPDATED,
  payload: cart
})

// asynchronous action creators
export const aCartAddItem = item => dispatch =>
  updateCart(addItem, item).then(cart => dispatch(aCartUpdated(cart)))

export const aCartCopyItem = item => dispatch =>
  updateCart(copyItem, item).then(cart => dispatch(aCartUpdated(cart)))

export const aCartRemItem = itemId => dispatch =>
  updateCart(remItem, itemId).then(cart => dispatch(aCartUpdated(cart)))

export const aCartIncQty = itemId => dispatch =>
  updateCart(incQty, itemId).then(cart => dispatch(aCartUpdated(cart)))

export const aCartDecQty = itemId => dispatch =>
  updateCart(decQty, itemId).then(cart => dispatch(aCartUpdated(cart)))

export const aCartLoad = () => dispatch =>
  load().then(cart => dispatch(aCartLoaded(cart)))

// cart contents
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
  user: { name: '', phone: '', email: '' },
  location: { locId: '', address: '' },
  items: [], // [..., {itemId, qty, extras, options, priceId, productId}]
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
const updateCart = (f, param) =>
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

const copyItem = item => cart => {
  const idx = cart.items.findIndex(i => i.itemId === item.itemId)
  return { ...cart, items: insertAfter(cart.items, idx, createItem(item, 1)) }
}

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

// Helpers - insert item into items array
const insertAfter = (arr, index, newItem) => {
  if (index >= arr.length) {
    return arr.concat[newItem]
  }
  return [...arr.slice(0, index + 1), newItem, ...arr.slice(index + 1)]
}
