import React from 'react'
import { Link } from '@reach/router'
import { useKeyupAction } from './utils'

import { aNeedleChange } from '../state/list-reducer'
import style from './layout-small.module.scss'
import lrlogo from '../img/lr-icon.svg'

const LayoutSmall = props => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  )
}

export default LayoutSmall

export const Header = () => {
  const keyupEmit = useKeyupAction(aNeedleChange)

  return (
    <div className={style.header}>
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
        <Link to='/cart'>Cart</Link>
      </div>
    </div>
  )
}
