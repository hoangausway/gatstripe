require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const jwt = require('jwt-simple')
const decodeToken = token => {
  return jwt.decode(token, process.env.TOKEN_SALT)
}

// Helpers - query construction
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

const qSearchValue = index => value => {
  const query = q.Let(
    {
      ref: q.Match(q.Index(index), value)
    },
    q.If(
      q.Exists(q.Var('ref')),
      {
        type: 'Found',
        doc: q.Get(q.Var('ref'))
      },
      {
        type: 'NotFound',
        message: value
      }
    )
  )
  return query
}

const qUpdateVerified = userDoc => {
  return q.Update(userDoc.ref, {
    data: {
      ...userDoc.data,
      verified: true
    }
  })
}

// Helpers - json response construction
const jsonSuccess = data => {
  console.log('jsonSuccess', data)
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

const jsonError = err => {
  console.log('jsonError', err)
  return {
    statusCode: 500,
    body: err.message
  }
}

const resolve = data => Promise.resolve(data)
const reject = msg => Promise.reject(new Error(msg))

// Helpers - business logics
// verifyToken:: token -> Promise
const verifyToken = token => {
  return client.query(qSearchValue('users-token')(token)).then(({ type }) => {
    if (type !== 'Found') {
      return reject('InvalidToken')
    }
    return resolve(decodeToken(token))
  })
}

// verifyUser:: user -> Promise
const verifyUser = user => {
  return client
    .query(qSearchValue('users-email')(user.email))
    .then(({ type, doc }) => {
      if (type !== 'Found') {
        return reject('InvalidToken')
      }
      return resolve(doc)
    })
}

// verifyExpired:: doc -> Promise
const verifyExpired = doc => {
  if (doc.data.expired < Date.now()) {
    return reject('ExpiredToken')
  }
  return resolve(doc)
}

// updateVerified:: doc -> Promise
const updateVerified = doc => {
  return client
    .query(qUpdateVerified(doc))
    .then(({ data: { email, name, phone, verified } }) =>
      jsonSuccess({ email, name, phone, verified })
    )
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
  if (event.httpMethod !== 'POST') {
    return reject('NotFound').catch(jsonError)
  }

  const { token } = JSON.parse(event.body)

  if (!token) {
    return reject('NotFound').catch(jsonError)
  }

  return verifyToken(token)
    .then(verifyUser)
    .then(verifyExpired)
    .then(updateVerified)
    .catch(jsonError)
}
