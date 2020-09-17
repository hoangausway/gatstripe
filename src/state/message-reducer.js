// types
export const MessageActions = {
  MESSAGE_UPDATED: 'MESSAGE_UPDATED'
}

export const MessageStatuses = {
  NORMAL: 0,
  ERROR: 1
}

export const aMessageUpdated = message => ({
  type: MessageActions.MESSAGE_UPDATED,
  payload: message
})

const messageInitialState = ['', 0]

export default (state = messageInitialState, { type, payload }) => {
  switch (type) {
    case MessageActions.MESSAGE_UPDATED:
      return payload
    default:
      return state
  }
}
