require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendLink = email => link => {
  const msg = {
    to: email,
    from: process.env.FROM_EMAIL_ADDRESS,
    subject: 'La Roll Online: Verifying email',
    text: `<a href=${link}>Click to confirm email. The link is valid in next 24 hours.</a>`
  }
  sgMail.send(msg)
}

module.exports = { sendLink }
