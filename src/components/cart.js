import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from '@reach/router'

import {
  aCartIncQty,
  aCartDecQty,
  aCartRemItem,
  aCartAddItem
} from '../state/action-types'
import style from './cart.module.scss'

const Cart = ({ location }) => {
  const nav = useNavigate()

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  return (
    <div className={style.cart}>
      <h3>Cart</h3>
      <section>
        {cart.map(i => (
          <div key={i.itemId}>
            <span>{`Item: ${i.name} --- Qty: ${i.qty} --- `}</span>
            <button onClick={e => dispatch(aCartIncQty(i.itemId))}>
              Increase Qty
            </button>
            <button onClick={e => dispatch(aCartDecQty(i.itemId))}>
              Decrease Qty
            </button>
            <button onClick={e => dispatch(aCartRemItem(i.itemId))}>
              Remove Item
            </button>
            <button onClick={e => dispatch(aCartAddItem(i.id))}>
              New Item
            </button>
          </div>
        ))}
      </section>
      <br />
      <div onClick={e => nav('../list')}>click going to LIST</div>
      <div onClick={e => nav('../options')}>click going to OPTIONS</div>
      <div onClick={e => nav('../success')}>click going to SUCCESS</div>
      <div onClick={e => nav('../fail')}>click going to FAIL</div>
    </div>
  )
}
export default Cart
