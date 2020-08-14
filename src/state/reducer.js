import ActionTypes from './action-types'
import { index, store, categories } from '../../static/lr-stripe-index.json'

export const initialAppState = { categories , index, store, needle: ''}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ActionTypes.NEEDLE_CHANGE:
      return { ...state, needle: payload }
    default:
      return state
  }
}

export default reducer
