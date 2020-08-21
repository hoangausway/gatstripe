import React from 'react'
import { useNavigate } from '@reach/router'
import style from './fail.module.scss'

const Fail = () => {
  const nav = useNavigate()
  return (
    <div className={style.fail}>
      <h3>Fail</h3>
      <p onClick={e => nav('../cart')}>Click to Cart</p>
    </div>
  )
}
export default Fail
