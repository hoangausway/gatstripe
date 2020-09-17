require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const jwt = require('jwt-simple')
const createToken = user => jwt.encode(user, process.env.TOKEN_SALT)
const decodeToken = token => jwt.decode(token, process.env.TOKEN_SALT)

module.exports = { createToken, decodeToken }
