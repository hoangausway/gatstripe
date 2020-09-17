import { set, get } from 'idb-keyval'

// types
export const UserActions = {
  USER_LOADED: 'USER_LOADED',
  USER_UPDATED: 'USER_UPDATED'
}

// action creators
const aUserLoaded = user => ({
  type: UserActions.USER_LOADED,
  payload: user
})

const aUserUpdated = cart => ({
  type: UserActions.USER_UPDATED,
  payload: cart
})

// asynchronous action creators
export const aUserChangeEmail = email => dispatch =>
  updateUserProp(changeEmail, email).then(user => dispatch(aUserUpdated(user)))

export const aUserChangeName = name => dispatch =>
  updateUserProp(changeName, name).then(user => dispatch(aUserUpdated(user)))

export const aUserChangePhone = phone => dispatch =>
  updateUserProp(changePhone, phone).then(user => dispatch(aUserUpdated(user)))

export const aUserLoad = () => dispatch => load().then(user => dispatch(aUserLoaded(user)))

// cart shape:
export const userInitialState = {
  name: '',
  phone: '',
  email: null
}

// reducer
export default (state = userInitialState, { type, payload }) => {
  switch (type) {
    case UserActions.USER_LOADED:
    case UserActions.USER_UPDATED:
      return payload
    default:
      return state
  }
}

// Helpers
// load a pending cart from db; create new one if undefined
const load = () => getUser().then(setUser)

// getUser:: () -> Promise.resolve(user)
const getUser = () => {
  return get('user').then(user => user || userInitialState)
}

// setUser:: user -> Promise.resolve(user)
const setUser = user => set('user', user).then(() => user)

// updateUserProp:: f -> prop -> Promise.resolve(user)
// f:: param -> user -> user
const updateUserProp = (f, prop) => {
  return getUser()
    .then(f(prop))
    .then(setUser)
}
const changeEmail = email => user => ({ ...user, email })
const changeName = name => user => ({ ...user, name })
const changePhone = phone => user => ({ ...user, phone })
