require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const faunadb = require('faunadb')

// Fauna API
const q = faunadb.query
const fauna = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

module.exports = { q, fauna }
