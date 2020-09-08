import { toCategories } from '../components/utils'
import FlexSearch from 'flexsearch'

export const ListActions = {
  DATA_FEED: 'DATA_FEED',
  NEEDLE_CHANGE: 'NEEDLE_CHANGE'
}

/* Action creators */
export const aDataFeed = data => ({
  type: ListActions.DATA_FEED,
  payload: data
})

export const aNeedleChange = needle => ({
  type: ListActions.NEEDLE_CHANGE,
  payload: needle
})

export const listInitialState = {
  items: [],
  extras: [],
  categories: [],
  index: null,
  needle: '',
  foundCats: []
}

export default (state = listInitialState, { type, payload }) => {
  switch (type) {
    case ListActions.DATA_FEED:
      return initWithDataFeed(state, payload)

    case ListActions.NEEDLE_CHANGE:
      return updateFoundCats(state, payload)

    default:
      return state
  }
}

// Helpers
const initWithDataFeed = (state, { jsonItems, jsonExtras }) => {
  // remove options with null
  const items = JSON.parse(jsonItems)
  const extras = JSON.parse(jsonExtras)
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
  const cats = prods.length === 0 ? state.categories : toCategories(prods)
  return { ...state, needle: payload, foundCats: cats }
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

const searchQuery = (index, needle) => {
  if (!index) return []
  return index.search(needle)
}
