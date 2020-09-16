require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const { q, fauna } = require('./fauna')
const { jsonError, jsonSuccess, reject, resolve } = require('./utils')

class ErrorEmail extends Error {}
class ErrorRequest extends Error {}

// Helpers - queries construction
const qSearchUserEmailLatestCharged = email => {
  const idxSearch = 'chkouts_search_userEmail'
  const idxSort = 'chkouts_sort_tsCharged'
  return q.Map(
    q.Paginate(q.Join(q.Match(q.Index(idxSearch), email), q.Index(idxSort)), {
      size: 1
    }),
    (tsCharged, ref) => q.Get(ref)
  )
}

// Helpers - logics
const errorHandle = err => {
  if (err instanceof ErrorEmail) {
    return jsonError(400, err.message)
  }
  return jsonError(500, err.message)
}

const validateMethod = event => {
  if (event.httpMethod !== 'POST') {
    return reject(new ErrorRequest('Invalid request'))
  }
  return event.body
}

const validateBody = body => {
  const { email } = JSON.parse(body)
  if (!email || email.length < 5) {
    return reject(new ErrorRequest('Invalid email'))
  }

  return email
}

const searchLatestChkoutByEmail = email => {
  return fauna.query(qSearchUserEmailLatestCharged(email)).then(response => {
    if (!response.data || response.data.length === 0) {
      return reject(new ErrorEmail('Not found'))
    }
    return response.data[0].data
  })
}

exports.handler = async (event, context) => {
  return resolve(event)
    .then(validateMethod) // event -> body
    .then(validateBody) // body -> email
    .then(searchLatestChkoutByEmail) // email -> chkout
    .then(jsonSuccess) // chkout -> {statusCode, body}
    .catch(errorHandle) // error -> {statusCode, body}
}
