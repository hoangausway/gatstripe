import { combineReducers } from 'redux'
import cart, { cartInitialState } from './cart-reducer'
import list, { listInitialState } from './list-reducer'

export const initialAppState = {
  cart: cartInitialState,
  list: listInitialState
}
export default combineReducers({ cart, list })
