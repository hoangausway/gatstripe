export const actPricesFeed = prices => ({
  type: ActionTypes.PRICES_FEED,
  payload: prices
})

export const actNeedleChange = needle => ({
  type: ActionTypes.NEEDLE_CHANGE,
  payload: needle
})

const ActionTypes = {
  PRICES_FEED: 'prices feed',
  NEEDLE_CHANGE: 'needle change'
}

export default ActionTypes
