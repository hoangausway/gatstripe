/* Action creators */
export const aDataFeed = data => ({
  type: ActionTypes.DATA_FEED,
  payload: data
})

export const aNeedleChange = needle => ({
  type: ActionTypes.NEEDLE_CHANGE,
  payload: needle
})

export const aCartAddItem = item => ({
  type: ActionTypes.CART_ADD_ITEM,
  payload: item
})

const ActionTypes = {
  DATA_FEED: 'data feed',
  NEEDLE_CHANGE: 'needle change',
  CART_ADD_ITEM: 'cart add item'
}

export default ActionTypes
