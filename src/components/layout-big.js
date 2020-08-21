import React from 'react'
import { useDispatchKeyUp } from './utils'

import { aNeedleChange } from '../state/action-types'

import style from './layout-big.module.scss'
import lrlogo from '../img/lr-icon.svg'

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
  const keyupEmit = useDispatchKeyUp(aNeedleChange)
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
        <span>Cart information here</span>
        <span>Cart information here</span>
      </div>
    </div>
  )
}