/* Action creators */
export const aDataFeed = data => ({
  type: ActionTypes.DATA_FEED,
  payload: data
})

export const aNeedleChange = needle => ({
  type: ActionTypes.NEEDLE_CHANGE,
  payload: needle
})

// Cart
export const aCartAddItem = item => ({
  type: ActionTypes.CART_ADD_ITEM,
  payload: item
})

export const aCartRemItem = productId => ({
  type: ActionTypes.CART_REM_ITEM,
  payload: productId
})

export const aCartIncQty = productId => ({
  type: ActionTypes.CART_INC_QTY,
  payload: productId
})

export const aCartDecQty = productId => ({
  type: ActionTypes.CART_DEC_QTY,
  payload: productId
})

const ActionTypes = {
  DATA_FEED: 'data feed',
  NEEDLE_CHANGE: 'needle change',
  CART_ADD_ITEM: 'cart add item',
  CART_REM_ITEM: 'cart remove item',
  CART_INC_QTY: 'increase qty',
  CART_DEC_QTY: 'decrease qty'
}

export default ActionTypes
