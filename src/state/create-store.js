import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer, { initialAppState } from './reducer'

export default () =>
  createStore(reducer, initialAppState, applyMiddleware(thunk, createLogger()))
