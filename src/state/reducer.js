import { combineReducers } from 'redux'
import user, { userInitialState } from './user-reducer'
import cart, { cartInitialState } from './cart-reducer'
import list, { listInitialState } from './list-reducer'
import locations, { locationsInitialState } from './locations-reducer'
import location, { locationInitialState } from './location-reducer'

export const initialAppState = {
  location: locationInitialState,
  user: userInitialState,
  cart: cartInitialState,
  list: listInitialState,
  locations: locationsInitialState
}
export default combineReducers({ location, user, cart, list, locations })
