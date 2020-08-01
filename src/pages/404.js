import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const NotFound = () => {
  return (
    <Layout>
      <h1>404: Page Not Found</h1>
      <p>
        <Link to='/'>Check our foods</Link>
      </p>
    </Layout>
  )
}

export default NotFound
