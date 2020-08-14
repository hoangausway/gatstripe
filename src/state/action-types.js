export const actProductsFeed = products => ({
  type: ActionTypes.PRODUCTS_FEED,
  payload: products
})

export const actNeedleChange = needle => ({
  type: ActionTypes.NEEDLE_CHANGE,
  payload: needle
})

const ActionTypes = {
  PRODUCTS_FEED: 'products feed',
  NEEDLE_CHANGE: 'needle change'
}

export default ActionTypes
