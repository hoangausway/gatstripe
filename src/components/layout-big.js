import React from 'react'
import { useKeyupAction } from './utils'

import { aNeedleChange } from '../state/list-reducer'

import style from './layout-big.module.scss'
import lrlogo from '../img/lr-icon.svg'
import Checkout from './checkout'

const LayoutBig = props => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  )
}

export default LayoutBig

export const Header = () => {
  const keyupEmit = useKeyupAction(aNeedleChange)
  return (
    <div className={style.layout}>
      <div className={style.smallheader}>
        <div>
          <button>=</button>
          <img src={lrlogo} alt='LR Logo' />
        </div>
        <div>
          <input
            id='input'
            placeholder='filter with keywords'
            onKeyUp={keyupEmit}
          />
        </div>
      </div>
      <div className={style.cartinfo}>
        <div>Cart</div>
        <div className={style.checkout_button}><Checkout /></div>
      </div>
    </div>
  )
}
