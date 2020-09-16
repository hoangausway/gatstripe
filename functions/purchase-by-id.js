require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const { q, fauna } = require('./fauna')
const { jsonError, jsonSuccess, reject, resolve } = require('./utils')

class ErrorId extends Error {}
class ErrorRequest extends Error {}

// Helpers - queries construction
const qSearchValue = index => value =>
  q.Let(
    { ref: q.Match(q.Index(index), value) },
    q.If(
      q.Exists(q.Var('ref')),
      { found: true, doc: q.Get(q.Var('ref')) },
      { found: false, doc: null, message: value }
    )
  )

// Helpers - logics
const errorHandle = err => {
  if (err instanceof ErrorId) {
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
  const { id } = JSON.parse(body)
  if (!id) {
    return reject(new ErrorRequest('Invalid id'))
  }

  return id
}

const searchById = id => {
  const idxSearch = 'chkouts_search_id'
  return fauna.query(qSearchValue(idxSearch)(id)).then(({ found, doc }) => {
    if (!found) {
      return reject(new ErrorId('Not found'))
    }
    return doc.data
  })
}

exports.handler = async (event, context) => {
  return resolve(event)
    .then(validateMethod) // event -> body
    .then(validateBody) // body -> email
    .then(searchById) // id -> chkout
    .then(jsonSuccess) // chkout -> {statusCode, body}
    .catch(errorHandle) // error -> {statusCode, body}
}
