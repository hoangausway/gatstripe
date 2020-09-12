import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from '@reach/router'

// TBD: wont be used aUserVerifyEmail
// import { aUserVerifyEmail } from '../state/user-reducer'
import style from './verify-email.module.scss'
import Notifications, { notify } from 'react-notify-toast'

const verifyingStatus = {
  VERIFYING: 'Verifying...',
  VERIFIED: 'Verified',
  FAIL: 'Not verified '
}

const VerifyEmail = props => {
  const token = props.token

  const nav = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const [verifying, setVerifying] = React.useState(verifyingStatus.VERIFYING)

  // React.useEffect(() => {
  //   console.log('useEffect', user)
  //   console.log('token', token)
  //   if (!user.verified && token) dispatch(aUserVerifyEmail(token))
  // }, [])

  // React.useEffect(() => {
  //   if (user.verified) {
  //     setVerifying(verifyingStatus.VERIFIED)
  //     notify.show(`user.verified: ${user.verified}`)
  //   }
  // }, [user.verified])

  return (
    <div>
      <Notifications />
      <h3>Verifying email</h3>
      <div>{verifying}</div>
      <div onClick={e => nav('../cart')}>click going to CART</div>
    </div>
  )
}
export default VerifyEmail
