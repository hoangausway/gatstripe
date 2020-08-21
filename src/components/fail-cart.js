import React from 'react'

import Fail from './fail'
import Cart from './cart'
import style from './fail.module.scss'

const FailCart = ({ location }) => {
  console.log('location', location)
  return (
    <div className={style.layout}>
      <Fail />
      <Cart />
    </div>
  )
}
export default FailCart
