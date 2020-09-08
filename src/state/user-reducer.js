import { v4 as uuidv4 } from 'uuid'
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
export const aUserVerifyEmail = token => dispatch =>
  verifyUser(token)(verifyUserUrl).then(user => dispatch(aUserUpdated(user)))

export const aUserConfirmEmail = user => dispatch =>
  confirmUser(user)(confirmUserUrl).then(user => dispatch(aUserUpdated(user)))

export const aUserChangeEmail = email => dispatch =>
  updateUser(changeEmail, email).then(user => dispatch(aUserUpdated(user)))

export const aUserChangeName = name => dispatch =>
  updateUser(changeName, name).then(user => dispatch(aUserUpdated(user)))

export const aUserChangePhone = phone => dispatch =>
  updateUser(changePhone, phone).then(user => dispatch(aUserUpdated(user)))

export const aUserLoad = () => dispatch =>
  load().then(user => dispatch(aUserLoaded(user)))

// cart shape:
export const userInitialState = {
  name: '',
  phone: '',
  email: null,
  verified: false,
  dateCreated: null,
  dateUpdated: null,
  dateRemoved: null
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
    user =>
      user || { ...userInitialState, userId: uuidv4(), dateCreated: Date.now() }
  )
}

// setUser:: user -> Promise.resolve(user)
const setUser = user => set('user', user).then(() => Promise.resolve(user))

// updateUser:: f -> param -> Promise.resolve(user)
// f:: param -> user -> user
const updateUser = (f, param) => {
  return getUser()
    .then(f(param))
    .then(setUser)
}
const changeEmail = email => user => ({ ...user, email, verified: false })

const changeName = name => user => ({ ...user, name })

const changePhone = phone => user => ({ ...user, phone })

// verifyUser:: a -> b -> Promise.resovle(a)
const verifyUser = token => url => {
  return (
    window
      .fetch(url, verifyUserRequest(token))
      .then(res => res.json())
      .then(ret => {
        return getUser().then(user => {
          return setUser({
            ...user,
            email: ret.email,
            name: ret.name,
            phone: ret.phone,
            verified: ret.verified
          })
        })
      })
      // error: just retirn current user
      .catch(err => {
        console.log(err)
        return load()
      })
  )
}

const confirmUser = user => url => {
  return (
    window
      .fetch(url, confirmUserRequest(user))
      .then(res => res.json())
      .then(ret =>
        getUser().then(user =>
          setUser({
            ...user,
            email: ret.email,
            name: ret.name,
            phone: ret.phone,
            verified: ret.verified
          })
        )
      )
      // error: just retirn current user
      .catch(err => {
        console.log(err)
        return load()
      })
  )
}

const verifyUserUrl = '/.netlify/functions/verify-email'
const confirmUserUrl = '/.netlify/functions/confirm-email'

const verifyUserRequest = token => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify({ token })
})

const confirmUserRequest = user => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify(user)
})
