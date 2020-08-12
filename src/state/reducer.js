import ActionTypes from './action-types'

export const initialAppState = { prices: [], needle: '' }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ActionTypes.PRICES_FEED:
      return { ...state, prices: payload }
    case ActionTypes.NEEDLE_CHANGE:
      return { ...state, needle: payload }
    default:
      return state
  }
}

export default reducer
