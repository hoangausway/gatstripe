require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const { fauna, qSearchValue } = require('./services/fauna')
const {
  jsonError,
  jsonSuccess,
  reject,
  resolve,
  validateMethod,
  ErrorRequest
} = require('./utils')

class ErrorId extends Error {}

// Helpers - logics
const errorHandle = err => {
  if (err instanceof ErrorId) {
    return jsonError(400, err.message)
  }
  return jsonError(500, err.message)
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

// lambda function
exports.handler = async (event, context) => {
  return resolve(event)
    .then(validateMethod) // event -> body
    .then(validateBody) // body -> email
    .then(searchById) // id -> chkout
    .then(jsonSuccess) // chkout -> {statusCode, body}
    .catch(errorHandle) // error -> {statusCode, body}
}
