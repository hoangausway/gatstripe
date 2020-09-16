import { get, set } from 'idb-keyval'

// types
export const LocationActions = {
  LOCATION_LOADED: 'LOCATION_LOADED',
  LOCATION_UPDATED: 'LOCATION_UPDATED'
}

// action creators
const aLocationLoaded = location => ({
  type: LocationActions.LOCATION_LOADED,
  payload: location
})

const aLocationUpdated = location => ({
  type: LocationActions.LOCATION_UPDATED,
  payload: location
})

// asynchronous action creators
export const aLocationLoad = () => dispatch =>
  getLocation().then(location => dispatch(aLocationLoaded(location)))

export const aLocationUpdate = location => dispatch =>
  update(location).then(location => dispatch(aLocationUpdated(location)))

// location shape:
export const locationInitialState = {
  id: 'LOC_NONE',
  address: 'Select a location...'
}

// reducer
export default (state = locationInitialState, { type, payload }) => {
  switch (type) {
    case LocationActions.LOCATION_LOADED:
    case LocationActions.LOCATION_UPDATED:
      return payload
    default:
      return state
  }
}

// Helpers
const getLocation = () => {
  return get('location').then(l => l || locationInitialState)
}
// setLocation:: location -> Promise.resolve(location)
const setLocation = location => set('location', location).then(() => Promise.resolve(location))

const update = location => setLocation(location)
