export const LocationsActions = {
  LOCATIONS_FEED: 'LOCATIONS_FEED'
}

/* Action creators */
export const aLocationsFeed = data => ({
  type: LocationsActions.LOCATIONS_FEED,
  payload: data
})

export const locationsInitialState = []

export default (state = locationsInitialState, { type, payload }) => {
  switch (type) {
    case LocationsActions.LOCATIONS_FEED:
      return [].concat(JSON.parse(payload))

    default:
      return state
  }
}

// Helpers
