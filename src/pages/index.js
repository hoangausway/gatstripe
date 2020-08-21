import React from 'react'
import { graphql } from 'gatsby'

import { useDispatch } from 'react-redux'
import { aDataFeed } from '../state/action-types'

import Metadata from '../components/metadata'
import Layout from '../components/layout'
import Listing from '../components/listing'

const Index = ({ data }) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const items = data.items.edges.map(edge => edge.node)
    const extras = data.extras.edges.map(edge => edge.node)
    const index = data.index.edges[0].node.index

    dispatch(aDataFeed({ items, extras, index }))
  }, [])

  return (
    <Layout>
      <Metadata title='Click & Collect' description='This is my home page' />
      <Listing needle='' />
    </Layout>
  )
}

export default Index

export const query = graphql`
  {
    index: allLrStripeIndex {
      edges {
        node {
          id
          index
        }
      }
    }
    items: allLrStripeItems(filter: { active: { eq: true } }) {
      edges {
        node {
          nid
          id
          name
          category
          gst
          extras
          price
          priceCents
          priceId
          unit_label
        }
      }
    }
    extras: allLrStripeExtras(filter: { active: { eq: true } }) {
      edges {
        node {
          id
          name
          category
          price
          priceCents
          priceId
          unit_label
        }
      }
    }
  }
`
