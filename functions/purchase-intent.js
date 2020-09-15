/*
  Accept: chkout object { chkoutId user location cart } = body
  Validate:
  - Is user exist and valid. If not, create user record { name, phone, email, verified(false)}.
  If exists, always update name and phone if they're newer to existing.
  - Is user's email verified. If not, reject and send confirming link with new token (valid in 24 hours).
  - Is location valid. If not, reject with a reason.
  - Is cart not empty. If not, reject with a reason.

  Happy path:
  - Create purchase record: {chkoutId user location cart tsUpdated tsCharged(null)}
  - Return success with chkoutId
  - Any error, reject with a reason
*/
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const { createLink, sendLink } = require('./email.template')
const { createToken } = require('./token')
const { q, fauna } = require('./fauna')
const { jsonError, jsonSuccess, reject, resolve } = require('./utils')

class ErrorEmail extends Error {}
class ErrorRequest extends Error {}

// Helpers - query construction
const onehr = 60 * 60 * 1000
const twohrs = 2 * 60 * 60 * 1000
const next24hrs = () => Date.now() + 24 * onehr
const isExpiredSoon = expired => !expired || expired < Date.now() - twohrs

// Helpers - queries construction
// search a value in an index; return the document if found
const qSearchValue = index => value =>
  q.Let(
    { ref: q.Match(q.Index(index), value) },
    q.If(
      q.Exists(q.Var('ref')),
      { found: true, doc: q.Get(q.Var('ref')) },
      { found: false, doc: null, message: value }
    )
  )

// create a user record
const qNewUser = userData => {
  return q.Create(q.Collection('users'), { data: userData })
}

const qUpdateNamePhoneToken = ({ name, phone, token }, userDoc) => {
  return q.Update(userDoc.ref, {
    data: { ...userDoc.data, name, phone, token, expired: next24hrs() }
  })
}

const qUpdateNamePhoneTokenExpired = (
  { name, phone, token, expired },
  userDoc
) => {
  return q.Update(userDoc.ref, {
    data: { ...userDoc.data, name, phone, token, expired }
  })
}

// create chkout document
const qNewChkout = chkoutData => {
  return q.Create(q.Collection('chkouts'), { data: chkoutData })
}

// Helpers - utils
const createUserData = user => ({
  ...user,
  verified: false,
  tsUpdated: Date.now(),
  token: createToken(user),
  expired: next24hrs()
})

// don't blindly copy all fields from client's chkout object
// use only needed fields of chkout object: {chkoutId, user, location, cart}
const createChkoutData = chkout => ({
  chkoutId: chkout.chkoutId,
  user: chkout.user,
  location: chkout.location,
  cart: chkout.cart,
  tsUpdated: Date.now(),
  tsCharged: null
})

// Helpers - logics
const errorHandle = err => {
  if (err instanceof ErrorEmail) {
    return jsonSuccess({ chkoutId: null, message: err.message })
  }
  return jsonError(500, err.message)
}

const newChkout = chkout => {
  return fauna
    .query(qNewChkout(createChkoutData(chkout)))
    .then(_ => ({ chkoutId: chkout.chkoutId }))
}

const validateLocation = chkout => {
  const { locId, address } = chkout.location
  const isValid = locId && locId.length > 0 && address && address.length > 0
  return isValid ? chkout : reject(new ErrorRequest('Invalid location'))
}

const validateCart = chkout => {
  return chkout.cart.length > 0
    ? chkout
    : reject(new ErrorRequest('Invalid cart'))
}

const switchFoundEmail = ({ chkout, found, doc }) => {
  if (!found) return notFoundUser({ chkout }) // chkout -> chkout
  if (!doc.data.verified) return foundUnverified({ chkout, doc }) // { chkout, doc } -> chkout
  return foundVerified({ chkout, doc }) // { chkout, doc } -> chkout
}

const searchUserEmail = chkout => {
  return fauna
    .query(qSearchValue('users-email')(chkout.user.email))
    .then(({ found, doc }) => ({ chkout, found, doc }))
}

const validateUser = body => {
  const chkout = JSON.parse(body)
  if (!chkout.user || !isValidUser(chkout.user)) {
    return reject(new ErrorRequest('Invalid user data'))
  }
  return chkout
}

const isValidUser = user => {
  const { email, name, phone } = user
  return email && name && phone && email.length * name.length * phone.length > 0
}

const validateMethod = event => {
  if (event.httpMethod !== 'POST') {
    return reject(new ErrorRequest('Invalid request'))
  }
  return event.body
}

// notFoundUser:: user -> reject(reason)
const notFoundUser = ({ chkout }) => {
  const userData = createUserData(chkout.user)
  return fauna.query(qNewUser(userData)).then(doc => {
    const { email, token } = doc.data
    const link = createLink(token)
    return sendLink(email, link).then(_ =>
      reject(new ErrorEmail('Should confirm email'))
    )
  })
}

// foundUnverified:: user -> userDoc -> reject(reason)
const foundUnverified = ({ chkout, doc }) => {
  const { name, phone } = chkout.user
  const { token, expired } = doc.data
  const expiredSoon = isExpiredSoon(expired)
  const newToken = expiredSoon ? createToken(chkout.user) : token

  return fauna
    .query(qUpdateNamePhoneToken({ name, phone, token: newToken }, doc))
    .then(doc => {
      if (expiredSoon) {
        return sendLink(doc.data.email)(createLink(doc.data.token)).then(_ =>
          reject(new ErrorEmail('Should confirm email'))
        )
      }
      return reject(new ErrorEmail('Should confirm email'))
    })
}

// foundVerified:: user -> userDoc -> resolve(user) | reject(error)
const foundVerified = ({ chkout, doc }) => {
  const { name, phone } = chkout.user
  const shouldUpdate =
    name !== doc.name || phone !== doc.phone || doc.data.token

  if (!shouldUpdate) return chkout

  const data = { name, phone, token: null, expired: null }
  return fauna.query(qUpdateNamePhoneTokenExpired(data, doc)).then(_ => chkout)
}

// lambda function
exports.handler = async (event, context) => {
  return resolve(event)
    .then(validateMethod) // event -> body
    .then(validateUser) // body -> chkout
    .then(searchUserEmail) // chkout -> {chkout, found, doc}
    .then(switchFoundEmail) // {chkout, found, doc} -> _
    .then(validateLocation) // chkout -> _
    .then(validateCart) // chkout -> _
    .then(newChkout) // chkout -> _
    .then(jsonSuccess) // chkout -> _
    .catch(errorHandle) // err -> _
}
