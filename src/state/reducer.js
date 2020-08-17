import ActionTypes from './action-types'
import { toCategories, loadIndex, searchQuery } from '../components/utils'

export const initialAppState = {
  products: [],
  categories: [],
  index: {},
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

    default:
      return state
  }
}

export default reducer

const initWithDataFeed = (state, { items, extras, index }) => {
  const categories = toCategories(items)

  //  load index
  const { idx, store } = JSON.parse(index)

  return {
    ...state,
    items,
    extras,
    categories,
    index: { idx: loadIndex(idx), store },
    foundCats: categories
  }
}

const updateFoundCats = (state, payload) => {
  const prods = searchQuery(state.index, payload)
  const cats = prods.length === 0 ? state.categories : toCategories(prods)
  return { ...state, needle: payload, foundCats: cats }
}

const createCartItem = (productId, qty, options) => {
  return { productId, qty, options }
}

const cartAddItem = (state, payload) => {
  const newCart = state.cart.concat(createCartItem(payload, 1, {}))
  return { ...state, cart: newCart }
}
