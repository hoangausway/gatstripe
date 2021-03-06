// Helpers - json response construction
const jsonSuccess = data => {
  console.log('jsonSuccess', data)
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

const jsonError = (code, message) => {
  console.log('jsonError', message)
  return {
    statusCode: code,
    body: message
  }
}

const reject = err => Promise.reject(err)
const resolve = data => Promise.resolve(data)

const log = label => data => {
  console.log(`===log ${label} ===`, data)
  return data
}

class ErrorRequest extends Error {}
const validateMethod = event => {
  if (event.httpMethod !== 'POST') {
    return reject(new ErrorRequest('Invalid request'))
  }
  return event.body
}

module.exports = {
  jsonError,
  jsonSuccess,
  reject,
  resolve,
  log,
  ErrorRequest,
  validateMethod
}
