import { v4 as uuidv4 } from 'uuid'
import ActionTypes from './action-types'
import { toCategories, searchQuery } from '../components/utils'
import FlexSearch from 'flexsearch'

export const initialAppState = {
  items: [],
  extras: [],
  categories: [],
  index: null,
  needle: '',
  foundCats: [],
  cart: []
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ActionTypes.DATA_FEED:
      return initWithDataFeed(state, payload)

    case ActionTypes.NEEDLE_CHANGE:
      return updateFoundCats(state, payload)

    case ActionTypes.CART_ADD_ITEM:
      return cartAddItem(state, payload)

    case ActionTypes.CART_REM_ITEM:
      return cartRemItem(state, payload)

    case ActionTypes.CART_INC_QTY:
      return cartIncQty(state, payload)

    case ActionTypes.CART_DEC_QTY:
      return cartDecQty(state, payload)

    default:
      return state
  }
}

export default reducer

// Helpers
const initWithDataFeed = (state, { items, extras, index }) => {
  // remove options with null
  const newItems = items.map(i =>
    i.options ? { ...i, options: normalizeOptions(i.options) } : i
  )
  const categories = toCategories(newItems)
  return {
    ...state,
    items: newItems,
    extras,
    categories,
    index: createIndex(items),
    foundCats: categories
  }
}

const updateFoundCats = (state, payload) => {
  const prods = searchQuery(state.index, payload)
  const cats = prods.length === 0 ? state.categories : toCategories(prods)
  return { ...state, needle: payload, foundCats: cats }
}

const createCartItem = (item, qty) => {
  const itemId = uuidv4()
  return { ...item, itemId, qty }
}

const cartAddItem = (state, productId) => {
  const item = state.items.find(i => i.id === productId)
  const newCart = state.cart.concat(createCartItem(item, 1))
  return { ...state, cart: newCart }
}

const cartRemItem = (state, itemId) => {
  const newCart = state.cart.reduce(
    (acc, i) => (i.itemId !== itemId ? [...acc, i] : acc),
    []
  )
  return { ...state, cart: newCart }
}

const cartIncQty = (state, itemId) => {
  const newCart = state.cart.map(i =>
    i.itemId !== itemId ? i : { ...i, qty: i.qty + 1 }
  )
  return { ...state, cart: newCart }
}

const cartDecQty = (state, itemId) => {
  const newCart = state.cart.map(i =>
    i.itemId !== itemId ? i : { ...i, qty: i.qty - 1 < 0 ? 0 : i.qty - 1 }
  )
  return { ...state, cart: newCart }
}

// Indexing
const createIndex = items => {
  const index = new FlexSearch({
    encode: 'advanced',
    tokenize: 'reverse',
    suggest: true,
    cache: true,
    doc: {
      id: 'nid',
      field: ['name', 'tags', 'price']
    }
  })

  index.add(items)

  return index
}

// Helpers
const normalizeOptions = options => {
  return Object.keys(options).reduce(
    (acc, key) =>
      options[key] !== null ? { ...acc, [key]: options[key] } : acc,
    {}
  )
}
