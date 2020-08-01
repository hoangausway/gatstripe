import React from 'react'
import { Link } from 'gatsby'
import styles from './footer.module.scss'

import lrlogo3d from '../img/lr-logo-3d.svg'
import facebook from '../img/facebook.svg'
import google from '../img/google.svg'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src={lrlogo3d} />
        <p>ALWAYS FRESH</p>
      </div>
      <div className={styles.menu}>
        <p>SITEMAP</p>
        <Link to='/'>Home</Link>
        <Link to='/foods'>Foods</Link>
        <Link to='/#sayso'>What people say</Link>
        <Link to='/about'>About</Link>
        <Link to='/beyourboss' className={styles.beboss}>
          Be your own boss
        </Link>
      </div>
      <div className={styles.contact}>
        <p>CONTACT</p>
        <p>
          Factory 1, 5 Connect Road
          <br />
          Truganina 3029
        </p>
        <p>0417 347 437</p>
        <a href='mailto:info@laroll.com.au'>info@laroll.com.au</a>
      </div>
      <div className={styles.social}>
        <p>SOCIAL MEDIA</p>
        <a href='https://www.facebook.com/LaRollAlwaysFresh'>
          <img src={facebook} />
        </a>
        <a href='https://business.google.com/groups/106389886199026729681/reviews'>
          <img src={google} />
        </a>
      </div>
    </footer>
  )
}

export default Footer
