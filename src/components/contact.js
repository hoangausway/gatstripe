import React from 'react'
import { useSelector } from 'react-redux'

import { useKeyupAction } from './utils'
import {
  aUserChangeEmail,
  aUserChangeName,
  aUserChangePhone
} from '../state/user-reducer'

import style from './contact.module.scss'

const Contact = () => {
  const user = useSelector(state => state.user)

  const emailKeyupEmit = useKeyupAction(aUserChangeEmail)
  const nameKeyupEmit = useKeyupAction(aUserChangeName)
  const phoneKeyupEmit = useKeyupAction(aUserChangePhone)

  return (
    <div className={style.contact}>
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
      <input
        id='email'
        type='text'
        placeholder='email'
        onKeyUp={emailKeyupEmit}
        defaultValue={user.email}
      />
    </div>
  )
}
export default Contact
