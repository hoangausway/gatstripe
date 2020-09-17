require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = { sgMail }
