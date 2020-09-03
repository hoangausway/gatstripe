import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer, { initialAppState } from './reducer'
import { aCartLoad } from './cart-reducer'

const createStore = () => {
  const store = reduxCreateStore(
    reducer,
    initialAppState,
    applyMiddleware(thunk, createLogger())
  )

  console.log('===createStore===')
  // load cart from indexeddb
  // store.dispatch(aCartLoad())

  return store
}
export default createStore
