import React from 'react'
import { useNavigate } from '@reach/router'
import style from './cart.module.scss'

const Cart = ({ location }) => {
  const nav = useNavigate()
  console.log('cart location', location)

  return (
    <div className={style.cart}>
      <h3>Cart</h3>
      <div onClick={e => nav('../list')}>click going to LIST</div>
      <div onClick={e => nav('../options')}>click going to OPTIONS</div>
      <div onClick={e => nav('../success')}>click going to SUCCESS</div>
      <div onClick={e => nav('../fail')}>click going to FAIL</div>
    </div>
  )
}
export default Cart
