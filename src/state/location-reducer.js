import { set } from 'idb-keyval'

// types
export const LocationActions = {
  LOCATION_UPDATED: 'LOCATION_UPDATED'
}

// action creators
const aLocationUpdated = location => ({
  type: LocationActions.LOCATION_UPDATED,
  payload: location
})

// asynchronous action creators
export const aLocationUpdate = location => dispatch =>
  update(location).then(location => dispatch(aLocationUpdated(location)))

// location shape:
export const locationInitialState = {
  locId: 'LOC_NONE',
  address: 'Select a location...'
}

// reducer
export default (state = locationInitialState, { type, payload }) => {
  switch (type) {
    case LocationActions.LOCATION_UPDATED:
      return payload
    default:
      return state
  }
}

// Helpers
// setLocation:: location -> Promise.resolve(location)
const setLocation = location =>
  set('location', location).then(() => Promise.resolve(location))

const update = location => setLocation(location)
