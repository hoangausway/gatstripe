import React from 'react'
import { useNavigate } from '@reach/router'
import style from './cancel.module.scss'

const Cancel = () => {
  const nav = useNavigate()
  return (
    <div className={style.fail}>
      <h3>Cancelled</h3>
      <p onClick={e => nav('../cart')}>Click to Cart</p>
    </div>
  )
}
export default Cancel
