import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from '@reach/router'
import Checkout from './checkout'

import {
  aCartIncQty,
  aCartDecQty,
  aCartRemItem,
  aCartAddItem
} from '../state/cart-reducer'
import style from './cart.module.scss'

const Cart = ({ location }) => {
  const nav = useNavigate()

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  return (
    <div className={style.cart}>
      <h3>Cart</h3>
      <Checkout cart={cart} />
      <section>
        {cart.items.map(i => (
          <div key={i.itemId}>
            <p>{`${i.name} --- $${i.price} --- Qty: ${i.qty} `}</p>
            <button onClick={e => dispatch(aCartIncQty(i.itemId))}>
              Qty +
            </button>
            <button onClick={e => dispatch(aCartDecQty(i.itemId))}>
              Qty -
            </button>
            <button onClick={e => dispatch(aCartRemItem(i.itemId))}>
              Remove Item
            </button>
            <button onClick={e => dispatch(aCartAddItem(i))}>New Item</button>
          </div>
        ))}
      </section>
      <br />
      <div onClick={e => nav('../list')}>click going to LIST</div>
      <div onClick={e => nav('../options')}>click going to OPTIONS</div>
      <div onClick={e => nav('../success')}>click going to SUCCESS</div>
      <div onClick={e => nav('../cancel')}>click going to CANCEL</div>
    </div>
  )
}
export default Cart
