import { v4 as uuidv4 } from 'uuid'
import { set, get } from 'idb-keyval'

// types
export const ItemsActions = {
  ITEMS_LOADED: 'ITEMS_LOADED',
  ITEMS_UPDATED: 'ITEMS_UPDATED'
}

// action creators
const aItemsLoaded = items => ({
  type: ItemsActions.ITEMS_LOADED,
  payload: items
})

const aItemsUpdated = items => ({
  type: ItemsActions.ITEMS_UPDATED,
  payload: items
})

// asynchronous action creators
export const aAddItem = item => dispatch =>
  updateCart(addItem, item).then(cart => dispatch(aItemsUpdated(cart)))

export const aRemItem = itemId => dispatch =>
  updateCart(remItem, itemId).then(cart => dispatch(aItemsUpdated(cart)))

export const aIncQty = itemId => dispatch =>
  updateCart(incQty, itemId).then(cart => dispatch(aItemsUpdated(cart)))

export const aDecQty = itemId => dispatch =>
  updateCart(decQty, itemId).then(cart => dispatch(aItemsUpdated(cart)))

export const aItemsLoad = () => dispatch =>
  load().then(cart => dispatch(aItemsLoaded(cart)))

// cart shape:
export const cartInitialState = [] // [..., {itemId, qty, extras, options, priceId, productId}]

// reducer
export default (state = cartInitialState, { type, payload }) => {
  switch (type) {
    case ItemsActions.ITEMS_LOADED:
    case ItemsActions.ITEMS_UPDATED:
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
