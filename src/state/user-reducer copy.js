import { set, get } from 'idb-keyval'

// types
export const UserActions = {
  USERS_LOADED: 'USERS_LOADED',
  USER_UPDATED: 'USER_UPDATED'
}

// action creators
const aUsersLoaded = user => ({
  type: UserActions.USERS_LOADED,
  payload: user
})

const aUserUpdated = user => ({
  type: UserActions.USER_UPDATED,
  payload: user
})

// asynchronous action creators
export const aUsersLoad = () => dispatch =>
  load().then(users => dispatch(aUsersLoaded(users)))

export const aUserUpdate = user => dispatch =>
  updateUser(user).then(users => dispatch(aUserUpdated(users)))

export const aUserVerifyEmail = user => dispatch =>
  verifyUser(user)(verifyUserUrl).then(users => dispatch(aUserUpdated(users)))

export const aUserConfirmEmail = token => dispatch =>
  confirmUser(token)(confirmUserUrl).then(users =>
    dispatch(aUserUpdated(users))
  )

// initialiazed with empty array of users
export const usersInitialState = []

const userTemplate = {
  email: '',
  name: '',
  phone: '',
  verified: false,
  dateUpdated: null
}

// reducer
export default (state = usersInitialState, { type, payload }) => {
  switch (type) {
    case UserActions.USERS_LOADED:
    case UserActions.USER_UPDATED:
      return payload
    default:
      return state
  }
}

// Helpers
// load a pending cart from db; create new one if undefined
const load = () => getUsers()

// getUsers:: () -> Promise.resolve(users)
const getUsers = () => {
  return get('users').then(users => {
    if (!users || users.length === 0) {
      const u = { ...userTemplate, dateUpdated: Date.now() }
      return setUsers([u])
    }
    return Promise.resolve(users)
  })
}

// setUsers:: users -> Promise.resolve(users)
const setUsers = users => {
  const sorted = users.sort((u1, u2) => u2.dateUpdated - u1.dateUpdated)
  return set('users', sorted).then(_ => Promise.resolve(sorted))
}
const updateUser = user =>
  load().then(users => {
    const updated = { ...user, dateUpdated: Date.now() }
    const updatedUsers = [updated].concat(
      users.filter(u => u.email !== user.email)
    )
    return setUsers(updatedUsers)
  })

// confirmUser:: a -> b -> Promise.resovle(a)
const confirmUser = token => url => {
  return window
    .fetch(url, confirmUserRequest(token))
    .then(res => res.json()) // expected format {email, name, phone, verified}
    .then(updateUser)
    .catch(err => {
      console.log(err)
      return load()
    })
}

const verifyUser = user => url => {
  return window
    .fetch(url, verifyUserRequest(user))
    .then(res => res.json()) // expected format {email, name, phone, verified}
    .then(updateUser)
    .catch(err => {
      console.log(err)
      return load() // error: just return current user array
    })
}

const confirmUserUrl = '/.netlify/functions/confirm-email'
const verifyUserUrl = '/.netlify/functions/verify-email'

const confirmUserRequest = token => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify({ token })
})

const verifyUserRequest = user => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify(user)
})
