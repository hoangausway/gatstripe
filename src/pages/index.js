import React from 'react'
import { graphql } from 'gatsby'

import { useDispatch } from 'react-redux'
import { actProductsFeed } from '../state/action-types'

import Metadata from '../components/metadata'
import Layout from '../components/layout'
import Listing from '../components/listing'

const Index = () => {
  return (
    <Layout>
      <Metadata title='Click & Collect' description='This is my home page' />
      <Listing needle='' />
    </Layout>
  )
}

export default Index
