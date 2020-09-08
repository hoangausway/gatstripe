import React from 'react'

import VerifyEmail from './verify-email'
import Cart from './cart'
import style from './verify-email-cart.module.scss'

const VerifyEmailCart = props => {
  console.log('location', props.location.href)
  return (
    <div className={style.layout}>
      <VerifyEmail />
      <Cart />
    </div>
  )
}
export default VerifyEmailCart
