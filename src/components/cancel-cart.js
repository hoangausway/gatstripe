import React from 'react'

import Cancel from './cancel'
import Cart from './cart'
import style from './cancel.module.scss'

const CancelCart = ({ location }) => {
  return (
    <div className={style.layout}>
      <Cancel />
      <Cart />
    </div>
  )
}
export default CancelCart
