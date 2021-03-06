require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const sgMail = require('./services/sendgridmail')

const createLink = token => `${process.env.CLIENT_ORIGIN}/confirm-email/${token}`

const sendLink = (email, link) => {
  const msg = {
    to: email,
    from: process.env.FROM_EMAIL_ADDRESS,
    subject: 'La Roll Order Online: Verifying email',
    html: `<html><p>To validate your email, please click the link <a href='${link}'>confirm</a>, then follow the instructions.<p>
    <p>Note that, for security this link will be expired in 24 hours.</p></html>`
  }
  return sgMail.send(msg).then(() => {}, console.log)
}

module.exports = { createLink, sendLink }
