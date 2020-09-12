import React from 'react'

import VerifyEmail from './verify-email'
import Cart from './cart'
import style from './verify-email-cart.module.scss'

const VerifyEmailCart = props => {
  return (
    <div className={style.layout}>
      <VerifyEmail />
      <Cart />
    </div>
  )
}
export default VerifyEmailCart
