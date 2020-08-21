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

    default:
      return state
  }
}

export default reducer

// Helpers
const initWithDataFeed = (state, { items, extras, index }) => {
  const categories = toCategories(items)
  return {
    ...state,
    items,
    extras,
    categories,
    index: createIndex(items),
    foundCats: categories
  }
}

const updateFoundCats = (state, payload) => {
  const prods = searchQuery(state.index, payload)
  console.log('result', prods)
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

  index.search('meat', function (res) {
    console.log('meat: --- ', res)
  })
  return index
}
