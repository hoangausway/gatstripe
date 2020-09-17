require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const { decodeToken } = require('./token')
const { q, fauna, qSearchValue } = require('./fauna')
const {
  jsonError,
  jsonSuccess,
  reject,
  resolve,
  validateMethod,
  ErrorRequest
} = require('./utils')

class ErrorToken extends Error {}

// Helpers - query construction
const qUpdateVerified = userDoc => {
  return q.Update(userDoc.ref, {
    data: {
      ...userDoc.data,
      verified: true,
      token: null,
      expired: null
    }
  })
}
const qNullifyToken = userDoc => {
  return q.Update(userDoc.ref, {
    data: {
      ...userDoc.data,
      token: null,
      expired: null
    }
  })
}

// Helpers - business logics
// verifyToken:: token -> Promise
const verifyToken = token => {
  const idxToken = 'users-token'
  return fauna.query(qSearchValue(idxToken)(token)).then(({ found, doc }) => {
    if (!found) {
      return reject(new ErrorToken('Not found token'))
    }

    if (doc.data.expired < Date.now()) {
      return fauna
        .query(qNullifyToken(doc))
        .then(_ => reject(new ErrorToken('Expired token')))
    }

    const user = decodeToken(token)
    if (doc.data.email !== user.email) {
      return fauna
        .query(qNullifyToken(doc))
        .then(_ => reject(new ErrorToken('Email not matched')))
    }

    return doc
  })
}

// updateVerified:: doc -> doc
const updateVerified = doc => {
  return fauna
    .query(qUpdateVerified(doc))
    .then(_ => ({ email: doc.data.email }))
}

const errorHandle = err => {
  if (err instanceof ErrorToken) {
    return jsonError(400, err.message)
  }
  return jsonError(500, err.message)
}

const validateBody = body => {
  const { token } = JSON.parse(body)
  if (!token) {
    return reject(new ErrorRequest('Invalid token'))
  }
  return token
}

/*
  Accept: token sent from CLIENT_ORIGIN
  Validate: is token existed in db. Failed: NotFound
  Decode token to {email, name, phone}, if failed: NotFound
  Check if any user with the email: NotFound
  Check if expired token: ExpiredLink
  If everything OK, update user with verified: true, then return {email, name, phone, verified}
*/
exports.handler = async (event, context) => {
  return resolve(event)
    .then(validateMethod) // event -> body
    .then(validateBody) // body -> token
    .then(verifyToken) // token -> doc
    .then(updateVerified) // doc -> {email}
    .then(jsonSuccess) // {email} -> {statusCode, body}
    .catch(errorHandle) // err -> {statusCode, body}
}
