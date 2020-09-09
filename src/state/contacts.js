import { set, get } from 'idb-keyval'

const ContactActions = {
  CONTACTS_LOADED: 'CONTACTS_LOADED',
  CONTACT_UPDATED: 'CONTACT_UPDATED'
}

// action creators
const aContactsLoaded = contacts => ({
  type: ContactActions.CONTACTS_LOADED,
  payload: contacts
})

// asynchronous action creators
export const aContactConfirmEmail = user => dispatch =>
  confirmContact(contact)(confirmContactUrl).then(user => dispatch(aUserUpdated(user)))

export const aUserVerifyEmail = token => dispatch =>
  verifyUser(token)(verifyUserUrl).then(user => dispatch(aUserUpdated(user)))

const contactsInitialState = []

// reducer
export default (state = contactsInitialState, { type, payload }) => {
  switch (type) {
    case ContactActions.CONTACTS_LOADED:
    case ContactActions.CONTACT_UPDATED:
      return payload
    default:
      return state
  }
}

const initialContact = {
  email: '',
  name: '',
  phone: '',
  verified: false
}

export const latestContact = () => get('contacts').then(latest)

export const updateContact = contact => {
  return get('contacts').then(arr => {
    if (contact.email) {
      return setContacts(update(contact, arr))
    }
    return Promise.resolve(arr)
  })
}

const latest = arr => {
  if (!arr || arr.length) {
    const c = { ...initialContact, dateUpdated: Date.now() }
    setContacts([c])
    return c
  }
  return arr.sort((a, b) => a.dateUpdated > b.dateUpdated)[0]
}

const update = (contact, arr) => {
  const updated = { ...contact, dateUpdated: Date.now() }
  const idx = arr.findIndex(c => c.email === contact.email)
  if (idx < 0) return arr.concat([updated])
  arr[idx] = updated
  return arr
}

const setContacts = arr => set('contacts', arr).then(() => Promise.resolve(arr))

const confirmUser = user => url => {
  return (
    window
      .fetch(url, confirmContactRequest(user))
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
const confirmContactUrl = '/.netlify/functions/confirm-email'

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

const confirmContactRequest = contact => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify(contact)
})
