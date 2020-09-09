require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const { sendLink } = require('./email.template')

// Tokenize
const jwt = require('jwt-simple')
const createToken = user => jwt.encode(user, process.env.TOKEN_SALT)
const createLink = token =>
  `${process.env.CLIENT_ORIGIN}/confirm-email/${token}`

// Fauna API
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

// Helpers - query construction
const onehr = 60 * 60 * 1000
const next24hrs = () => Date.now() + 24 * onehr
const isExpiredSoon = expired => expired < Date.now() - onehr

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

const qNewUser = dataUser => {
  return q.Create(q.Collection('users'), { data: dataUser })
}

const qUpdateNamePhone = ({ name, phone }, userDoc) => {
  return q.Update(userDoc.ref, {
    data: { ...userDoc.data, name, phone }
  })
}

const qUpdateNamePhoneToken = ({ name, phone, token }, userDoc) => {
  return q.Update(userDoc.ref, {
    data: { ...userDoc.data, name, phone, token, expired: next24hrs() }
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

// Helpers - precheck incoming data
const validateBody = body => {
  return (
    body &&
    body.email &&
    body.email !== '' &&
    body.name &&
    body.name !== '' &&
    body.phone &&
    body.phone !== ''
  )
}
// Helpers - business logic
const dataUser = user => ({
  ...user,
  verified: false,
  dateUpdated: Date.now(),
  token: createToken(user),
  expired: next24hrs()
})

// notFoundUser:: user -> json_response
const notFoundUser = user => {
  return client
    .query(qNewUser(dataUser(user)))
    .then(doc => {
      return sendLink(doc.data.email)(createLink(doc.data.token))
    })
    .then(_ => jsonSuccess({ ...user, verified: false }))
    .catch(jsonError)
}

const foundVerifiedOrNotExpiredSoonUser = (user, userDoc) => {
  const { name, phone } = user
  if (name !== userDoc.name || phone !== userDoc.phone) {
    return client
      .query(qUpdateNamePhone({ name, phone }, userDoc))
      .then(_ => jsonSuccess({ ...user, verified: userDoc.data.verified }))
      .catch(jsonError)
  }
  return Promise.resolve(
    jsonSuccess({ ...user, verified: userDoc.data.verified })
  )
}

const foundUnverifiedAndExpiredSoonUser = (user, userDoc) => {
  const { name, phone } = user
  const token = createToken(user)

  return client
    .query(qUpdateNamePhoneToken({ name, phone, token }, userDoc))
    .then(doc => sendLink(doc.data.email)(createLink(doc.data.token)))
    .then(_ => jsonSuccess({ ...user, verified: false }))
    .catch(jsonError)
}

/*
  Accept: user object {email, name, phone} = body

  Check collections 'users' if any user record having the given email.

  A. Not found.
  Create new token, new user record {...user, verified: false, token, expried},
  create a link and send it, then return {...user, verified: false}

  B. Found, verified: false and token will soon be expired (in 1 hour).
  Create new token, update db {...user, name, phone, token, expired},
  send email with token, then return {...user, verified: false}

  C. Found, verified: false and token will NOT be expired in 1 hour.
  Update db if {name, phone} not match with db, return {...user, verified: false}

  D. Found, verified: true. (Similar to C)
  Update db if {name, phone} not match with db, then return {...user, verified: true}
*/
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return Promise.resolve({ statusCode: 500, body: 'Invalid request' })
  }

  const body = JSON.parse(event.body)
  console.log('body', body)
  if (!validateBody(body)) {
    return Promise.resolve({ statusCode: 500, body: 'Invalid data' })
  }

  const user = { email: body.email, name: body.name, phone: body.phone }

  return client
    .query(qSearchValue('users-email')(user.email))
    .then(ret => {
      if (ret.type !== 'Found') {
        return notFoundUser(user)
      }

      const userDoc = ret.doc
      const { verified, expired } = userDoc.data
      const expiredSoon = isExpiredSoon(expired)

      // found: unverified and expired soon
      if (!verified && expiredSoon) {
        return foundUnverifiedAndExpiredSoonUser(user, userDoc)
      }

      // found: verified or unverified but not expired soon
      return foundVerifiedOrNotExpiredSoonUser(user, userDoc)
    })
    .catch(err => {
      console.log(err)
      return { statusCode: 400, body: JSON.stringify(err) }
    })
}
