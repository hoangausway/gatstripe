require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const jwt = require('jwt-simple')
const createLink = user => {
  const token = jwt.encode(user, process.env.TOKEN_SALT)
  return `${process.env.CLIENT_ORIGIN}/verify-email/${token}`
}

const { sendLink } = require('./email.template')

// Helpers - query construction
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

const onehr = 60 * 60 * 1000
const next24hrs = () => Date.now() + 24 * onehr

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

const qUpdateLink = userDoc => link => {
  return q.Update(userDoc.ref, {
    data: {
      ...userDoc.data,
      link,
      expired: next24hrs()
    }
  })
}

// Helpers - json response construction
const jsonResponse = data => ({
  statusCode: 200,
  body: JSON.stringify(data)
})

/*
  Accept: user object {..., email, name, phone}
  Check collections 'users' if any user record having the same email.

  If existed the user record, check if 'verified'.
    - If 'false' and prvious link not expired yet in next 1 hour, create new link, update existing record and return {email, verified: false, link}
    - Else, verified is true, return {..., email, name, phone, verified: true}

  If not, create new user record {...user, verified: false, link, expried} and return {email, verified: false, link}
*/
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return Promise.resolve({ statusCode: 500, body: 'Invalid request' })
  }

  const body = JSON.parse(event.body)
  if (!body.email || body.email === '') {
    return Promise.resolve({ statusCode: 500, body: 'Missing email' })
  }

  const user = { email: body.email, name: body.name, phone: body.phone }

  return client
    .query(qSearchValue('users-email')(user.email))
    .then(ret => {
      if (ret.type !== 'Found') {
        // not found: create new then return
        const link = createLink(user)
        const dataUser = {
          ...user,
          verified: false,
          link,
          expired: next24hrs()
        }

        // send link
        sendLink(user.email)(link)

        // then return
        return client
          .query(qNewUser(dataUser))
          .then(ret => jsonResponse({ ...dataUser, link: '' }))
      }

      // found
      const { email, name, phone, verified, expired } = ret.doc.data

      // verified: true or previous link not expired in next 1 hour
      if (verified || Date.now() < expired - onehr) {
        return jsonResponse({ email, name, phone, verified })
      }

      // verified: false
      // send link then update and return
      const link = createLink({ email, name, phone })
      sendLink(email)(link)
      return client
        .query(qUpdateLink(ret.doc)(link))
        .then(_ => jsonResponse({ email, name, phone, verified: false }))
    })
    .catch(err => {
      console.log(err)
      return { statusCode: 400, body: JSON.stringify(err) }
    })
}
