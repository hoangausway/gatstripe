import React from 'react'

import ConfirmEmail from './confirm-email'
import Cart from './cart'
import style from './confirm-email-cart.module.scss'

const ConfirmEmailCart = props => {
  return (
    <div className={style.layout}>
      <ConfirmEmail />
      <Cart />
    </div>
  )
}
export default ConfirmEmailCart
