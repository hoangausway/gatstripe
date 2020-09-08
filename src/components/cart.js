import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from '@reach/router'

import Checkout from './checkout'
import { useKeyupAction } from './utils'
import {
  aUserConfirmEmail,
  aUserChangeEmail,
  aUserChangeName,
  aUserChangePhone
} from '../state/user-reducer'
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
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const emailKeyupEmit = useKeyupAction(aUserChangeEmail)
  const nameKeyupEmit = useKeyupAction(aUserChangeName)
  const phoneKeyupEmit = useKeyupAction(aUserChangePhone)

  return (
    <div className={style.cart}>
      <h3>Cart</h3>
      <Checkout cart={cart} user={user} />
      <section>
        <div>
          <input
            id='name'
            type='text'
            placeholder='name'
            onKeyUp={nameKeyupEmit}
            defaultValue={user.name}
          />
          <input
            id='phone'
            type='text'
            placeholder='phone'
            onKeyUp={phoneKeyupEmit}
            defaultValue={user.phone}
          />
        </div>
        <div>
          <input
            id='email'
            type='text'
            placeholder='email'
            onKeyUp={emailKeyupEmit}
            defaultValue={user.email}
          />
          <button
            disabled={user.verified}
            onClick={e => dispatch(aUserConfirmEmail(user))}
          >
            {user.verified ? 'Verified' : 'Not verified'}
          </button>
        </div>
      </section>
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
