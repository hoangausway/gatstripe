import React from 'react'
import styles from './colorpalette.module.scss'
import cx from 'classnames'

const ColorPalette = () => {
  return (
    <section>
      <p style={{ color: '#e6e7e8', fontSize: '3rem', marginLeft: '2rem' }}>
        COLOR PALETTE
      </p>
      <div className={styles.palette}>
        <div className={cx(styles.color, styles.primary)}>
          <div className={styles.variants} />
        </div>
        <div className={cx(styles.color, styles.accent)}>
          <div className={styles.variants} />
        </div>
        <div className={cx(styles.color, styles.secondary)}>
          <div className={styles} />
        </div>
        <div className={cx(styles.color, styles.fresh)}>
          <div className={styles.variants} />
        </div>
      </div>
    </section>
  )
}

export default ColorPalette
