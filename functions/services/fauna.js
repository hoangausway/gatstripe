require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const faunadb = require('faunadb')

// Fauna API
const q = faunadb.query
const fauna = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

// Helpers - queries construction
// search a value in an index; return the document if found
const qSearchValue = index => value =>
  q.Let(
    { ref: q.Match(q.Index(index), value) },
    q.If(
      q.Exists(q.Var('ref')),
      { found: true, doc: q.Get(q.Var('ref')) },
      { found: false, doc: null, message: value }
    )
  )

module.exports = { q, fauna, qSearchValue }
