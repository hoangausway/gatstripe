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
    html: `<html><p>To validate your email, please click the link <a href='${link}'>confirm</a>, then follow the instructions.<p>
    <p>Note that, for security this link will be expired in 24 hours.</p></html>`
  }
  console.log(msg)
  return sgMail.send(msg).then(
    () => {
      console.log('sent email to: ', email)
    },
    error => {
      console.error(error)
      if (error.response) {
        console.error(error.response.body)
      }
    }
  )
}

module.exports = { sendLink }
