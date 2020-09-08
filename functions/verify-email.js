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
const jsonResponse = data => ({
  statusCode: 200,
  body: JSON.stringify(data)
})

const jsonNotFound = () => ({
  statusCode: 400,
  body: 'NotFound'
})

const jsonExpiredLink = () => ({
  statusCode: 400,
  body: 'ExpiredLink'
})

const jsonBadRequest = () => ({
  statusCode: 400,
  body: 'BadRequest'
})

const jsonError = err => ({
  statusCode: 500,
  body: JSON.stringify(err)
})

/*
  Accept: token sent from CLIENT_ORIGIN
  Decode token to {email, name, phone}, if failed: NotFound
  Check if any user with the email: NotFound
  Check if expired token: ExpiredLink
  If everything OK, update user with verified: true, then return {email, name, phone, verified}
*/
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return Promise.resolve(jsonBadRequest())
  }

  const { token } = JSON.parse(event.body)
  console.log(token)

  if (!token) {
    return Promise.resolve(jsonNotFound())
  }

  const user = decodeToken(token)
  console.log('decoded', user)
  if (!user || !user.email) {
    return Promise.resolve(jsonNotFound())
  }

  return client
    .query(qSearchValue('users-email')(user.email))
    .then(ret => {
      if (ret.type !== 'Found') {
        return Promise.resolve(jsonNotFound())
      }

      //  found
      if (ret.doc.data.expired < Date.now()) {
        return Promise.resolve(jsonExpiredLink())
      }

      return client.query(qUpdateVerified(ret.doc)).then(ret =>
        jsonResponse({
          email: ret.data.email,
          name: ret.data.name,
          phone: ret.data.phone,
          verified: ret.data.verified
        })
      )
    })
    .catch(err => {
      console.log(err)
      return jsonError(err)
    })
}
