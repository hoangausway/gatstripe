import React from 'react'

import Cancel from './cancel'
import Cart from './cart'
import style from './cancel.module.scss'

const CancelCart = ({ location }) => {
  console.log('location', location.href)
  return (
    <div className={style.layout}>
      <Cancel />
      <Cart />
    </div>
  )
}
export default CancelCart
