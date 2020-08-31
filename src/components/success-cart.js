import React from 'react'

import Success from './success'
import Cart from './cart'
import style from './success.module.scss'

const SuccessCart = ({ location }) => {
  console.log('location', location.href)
  return (
    <div className={style.layout}>
      <Success />
      <Cart />
    </div>
  )
}
export default SuccessCart
