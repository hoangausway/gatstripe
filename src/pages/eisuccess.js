import React from 'react'
import Layout from '../components/layout'
import Metadata from '../components/metadata'

import styles from './eisuccess.module.scss'
import beboss from '../data/images/lrbeyourboss.png'

const EISuccess = () => {
  return (
    <Layout>
      <Metadata
        title='Success'
        description='Express Of Interest Success page'
      />
      <section className={styles.success}>
        <p className={styles.thanks}>Thank you for your interest!</p>
        <p className={styles.willcontact}>
          We will contact you for details
        </p>
        <img src={beboss} alt='be your boss' width='100%' />
      </section>
    </Layout>
  )
}

export default EISuccess
