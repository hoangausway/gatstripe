import React from 'react'
import LayoutSmall from '../components/layout-small'
import { Link } from 'gatsby'

const NotFound = () => {
  return (
    <LayoutSmall>
      <h1>404: Page Not Found</h1>
      <p>
        <Link to='/'>Check our foods</Link>
      </p>
    </LayoutSmall>
  )
}

export default NotFound
