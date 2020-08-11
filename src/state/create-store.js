import { createStore as reduxCreateStore } from 'redux'
import ActionTypes from './action-types'

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.DATA_FEED:
      return { ...state, prices: action.payload }
    default:
      return state
  }
}

const initialState = { prices: [], needle: 'meat' }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
