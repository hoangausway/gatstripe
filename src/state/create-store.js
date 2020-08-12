import { createStore as reduxCreateStore } from 'redux'
import reducer, { initialAppState } from './reducer'

const createStore = () => reduxCreateStore(reducer, initialAppState)
export default createStore
