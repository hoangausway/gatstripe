import React from 'react'

import List from './list'
import Cart from './cart'
import style from './list-cart.module.scss'

const ListCart = ({ location }) => {
  console.log('location', location)
  return (
    <div className={style.layout}>
      <List />
      <Cart />
    </div>
  )
}
export default ListCart
