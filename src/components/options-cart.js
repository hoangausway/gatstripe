import React from 'react'

import Options from './options'
import Cart from './cart'
import style from './options.module.scss'

const OptionsCart = ({ location }) => {
  console.log('location', location.href)
  return (
    <div className={style.layout}>
      <Options />
      <Cart />
    </div>
  )
}
export default OptionsCart
