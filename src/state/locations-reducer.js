export const LocationsActions = {
  LOCATIONS_FEED: 'LOCATIONS_FEED'
}

/* Action creators */
export const aLocationsFeed = data => ({
  type: LocationsActions.LOCATIONS_FEED,
  payload: data
})

export const locationsInitialState = {
  locations: []
}

export default (state = locationsInitialState, { type, payload }) => {
  switch (type) {
    case LocationsActions.LOCATIONS_FEED:
      return { ...state, locations: [].concat(JSON.parse(payload)) }

    default:
      return state
  }
}

// Helpers
