import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styles from './header.module.scss'
import { useDispatchKeyUp } from './utils'

import { aNeedleChange } from '../state/list-reducer'

const Header = () => {
  // for animation of height change
  const [h, setH] = React.useState('3rem')
  const downloadPdf = useStaticQuery(graphql`
    {
      pdf: file(name: { eq: "menu-may2020" }) {
        name
        extension
        publicURL
      }
    }
  `)

  const keyupEmit = useDispatchKeyUp(aNeedleChange)

  return (
    <header className={styles.header} style={{ height: `${h}` }}>
      <div className={styles.nav}>
        <div className={styles.navLeft}>
          <div
            className={styles.switcher}
            onClick={() => (h === '3rem' ? setH('100vh') : setH('3rem'))}
          />
          <Link to='/' />
        </div>
        <div className={styles.navRight}>
          <input id='input' placeholder='filter with keywords' onKeyUp={keyupEmit} />
          <a href={downloadPdf.pdf.publicURL} download />
        </div>
      </div>
      <div className={styles.navList}>
        <Link to='/'>Home</Link>
        <Link to='/foods'>Foods</Link>
        <Link to='/#sayso'>What people say</Link>
        <Link to='/about'>About</Link>
        <Link to='/beyourboss'>Be your own boss</Link>
      </div>
    </header>
  )
}

export default Header
