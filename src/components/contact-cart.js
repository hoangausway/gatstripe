import React from 'react'

import Contact from './contact'
import Cart from './cart'
import style from './contact-cart.module.scss'

const ContactCart = ({ location }) => {
  console.log('location', location.href)
  return (
    <div className={style.layout}>
      <Contact />
      <Cart />
    </div>
  )
}
export default ContactCart
