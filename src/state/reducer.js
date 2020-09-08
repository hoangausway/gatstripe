import { combineReducers } from 'redux'
import user, { userInitialState } from './user-reducer'
import cart, { cartInitialState } from './cart-reducer'
import list, { listInitialState } from './list-reducer'

export const initialAppState = {
  user: userInitialState,
  cart: cartInitialState,
  list: listInitialState
}
export default combineReducers({ user, cart, list })
