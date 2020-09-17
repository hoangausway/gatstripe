import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from '@reach/router'

// TBD: wont be used aUserVerifyEmail
// import { aUserVerifyEmail } from '../state/user-reducer'
import style from './confirm-email.module.scss'
import { aUserChangeEmail } from '../state/user-reducer'

class ErrorEmail extends Error {}
class ErrorRequest extends Error {}
const reject = err => Promise.reject(err)
const resolve = res => Promise.resolve(res)

const Messages = {
  CONFIRMING: 'Confirming email',
  SUCCESS: 'Email had been confirmed:',
  ERROR: 'The link you use to confirm email may already be used or broken.'
}
const ConfirmEmail = ({ token }) => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const [message, setMessage] = React.useState(['', 0])

  const notify = message => data => {
    setMessage(message)
    return data
  }

  React.useEffect(() => {
    if (token) {
      resolve(token)
        .then(notify([Messages.CONFIRMING]))
        .then(confirmEmail)
        .then(email => notify([`${Messages.SUCCESS} ${email}.`]))
        .then(email => {
          if (email !== user.email) {
            dispatch(aUserChangeEmail(email))
          }
        })
        .catch(err => {
          console.log(err.message)
          notify([Messages.ERROR, 1])()
        })
    }
  }, [token])

  return (
    <div className={style.confirm}>
      <h3>Confirm email</h3>
      <Notice message={message} />
      <div onClick={e => nav('../cart')}>To Cart</div>
      <div onClick={e => nav('../list')}>To List</div>
    </div>
  )
}
export default ConfirmEmail

// confirmEmail:: token -> Promise.resolve(email) || Promise.reject(err)
const confirmEmail = token => {
  return window
    .fetch(urlConfirm, reqConfirm(token))
    .then(res =>
      res.status === 200 ? res.json() : reject(new ErrorRequest(res.statusText))
    )
    .then(({ email }) => {
      if (!email) {
        return reject(new ErrorEmail('Not found email'))
      }
      return email
    })
}

const urlConfirm = '/.netlify/functions/confirm-email'
const reqConfirm = token => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify({ token })
})

const Notice = props => {
  const [text, level] = props.message
  return (
    <div className={style.notice}>
      <p className={level && level > 0 ? style.error : style.normal}>{text}</p>
    </div>
  )
}
