import { combineReducers } from 'redux'
import user, { userInitialState } from './user-reducer'
import cart, { cartInitialState } from './cart-reducer'
import list, { listInitialState } from './list-reducer'
import locations, { locationsInitialState } from './locations-reducer'
import location, { locationInitialState } from './location-reducer'
import chkout, { chkoutInitialState } from './checkout-reducer'
import message, { initialMessageState } from './message-reducer'

export const initialAppState = {
  message: initialMessageState,
  chkout: chkoutInitialState,
  location: locationInitialState,
  user: userInitialState,
  cart: cartInitialState,
  list: listInitialState,
  locations: locationsInitialState
}
export default combineReducers({
  message,
  chkout,
  location,
  user,
  cart,
  list,
  locations
})
