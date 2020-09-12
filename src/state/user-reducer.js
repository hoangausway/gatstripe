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

export const aUserLoad = () => dispatch =>
  load().then(user => dispatch(aUserLoaded(user)))

// cart shape:
export const userInitialState = {
  name: '',
  phone: '',
  email: null,
  verified: false,
  dateUpdated: null
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
  return get('user').then(
    user => user || { ...userInitialState, dateUpdated: Date.now() }
  )
}

// setUser:: user -> Promise.resolve(user)
const setUser = user => set('user', user).then(() => Promise.resolve(user))

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


/*
  verify and confirm are just utilities which won't change user state
  TBD: move these functions to appropriate places
*/
// export const aUserVerifyEmail = user => dispatch =>
//   verify(user).then(user => dispatch(aUserUpdated(user)))

// export const aUserConfirmEmail = token => dispatch =>
//   confirm(token).then(user => dispatch(aUserUpdated(user)))

// Update user returning from server
// const updateUser = ({ name, phone, email, verified }) => {
//   return setUser({ name, phone, email, verified, dateUpdated: Date.now() })
// }

// verify:: a -> Promise.resolve(a)
export const verify = user => {
  return (
    window
      .fetch(urlVerify, reqVerify(user))
      .then(res => {
        return res.status === 200 ? res.json() : Promise.reject(res.body)
      }) // expected format {email, name, phone, verified}
      // .then(updateUser)
      .catch(err => {
        console.log(err)
        return load() // error: just return current user array
      })
  )
}
const urlVerify = '/.netlify/functions/verify-email'
const reqVerify = user => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify(user)
})

// confirm:: a -> Promise.resolve(b)
export const confirm = token => {
  return (
    window
      .fetch(urlConfirm, reqConfirm(token))
      .then(res => {
        return res.status === 200 ? res.json() : Promise.reject(res.body)
      }) // expected format {email, name, phone, verified}
      // .then(updateUser)
      .catch(err => {
        console.log(err)
        return load()
      })
  )
}
const urlConfirm = '/.netlify/functions/confirm-email'
const reqConfirm = token => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify({ token })
})
