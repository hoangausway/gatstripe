import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from '@reach/router'

import Contact from './contact'
import Location from './location'

import {
  aCartIncQty,
  aCartDecQty,
  aCartRemItem,
  aCartCopyItem
} from '../state/cart-reducer'
import style from './cart.module.scss'

const Cart = ({ location }) => {
  const nav = useNavigate()
  const cart = useSelector(state => state.cart)

  return (
    <div className={style.cart}>
      <Contact />
      <div className={style.location}>
        <Location />
      </div>
      <section>
        {cart.map(i => (
          <Item key={i.itemId} item={i} />
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

const Item = ({ item }) => {
  const dispatch = useDispatch()
  return (
    <div>
      <div className={style.item_line1}>
        <div>{item.name}</div>
        <div>{`$${item.price}`}</div>
        <div>x</div>
        <div>{`${item.qty}`}</div>
      </div>
      <div className={style.item_line2}>
        <button onClick={e => dispatch(aCartRemItem(item.itemId))}>
          Remove
        </button>
        <button onClick={e => dispatch(aCartCopyItem(item))}>Copy</button>
        <button onClick={e => dispatch(aCartDecQty(item.itemId))}>
          {' '}
          Qty -{' '}
        </button>
        <button onClick={e => dispatch(aCartIncQty(item.itemId))}>
          {' '}
          Qty +{' '}
        </button>
      </div>
    </div>
  )
}
