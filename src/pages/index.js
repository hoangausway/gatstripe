import React from 'react'
import { graphql } from 'gatsby'

import { Router } from '@reach/router'
import { useMediaQuery } from 'react-responsive'

import LayoutSmall from '../components/layout-small'
import LayoutBig from '../components/layout-big'

import List from '../components/list'
import Cart from '../components/cart'
import Options from '../components/options'
import Success from '../components/success'
import Fail from '../components/fail'
import NotFound from '../components/notfound'

import ListCart from '../components/list-cart'
import OptionsCart from '../components/options-cart'
import FailCart from '../components/fail-cart'
import SuccessCart from '../components/success-cart'

import { useDispatch } from 'react-redux'
import { aDataFeed } from '../state/action-types'

import Metadata from '../components/metadata'

const Index = ({ data }) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const items = data.items.edges.map(edge => edge.node)
    const extras = data.extras.edges.map(edge => edge.node)
    const index = data.index.edges[0].node.index

    dispatch(aDataFeed({ items, extras, index }))
  }, [])

  return (
    // <>
    //   <Metadata title='Click & Collect' description='This is my home page' />
    //   <Listing needle='' />
    // </>
    <>
      <Metadata title='Click & Collect' description='This is my home page' />
      <SmallScreen>
        <LayoutSmall>
          <Router basepath='/'>
            <List path='/' />
            <List path='list' />
            <Cart path='cart' />
            <Options path='options' />
            <Success path='success' />
            <Fail path='fail' />
            <NotFound default />
          </Router>
        </LayoutSmall>
      </SmallScreen>
      <BigScreen>
        <LayoutBig>
          <Router basepath='/'>
            <ListCart path='/' />
            <ListCart path='list' />
            <ListCart path='cart' />
            <OptionsCart path='options' />
            <SuccessCart path='success' />
            <FailCart path='fail' />
            <NotFound default />
          </Router>
        </LayoutBig>
      </BigScreen>
    </>
  )
}

export default Index

const iPhonePlusLandscapeWidth = 736
const BigScreen = ({ children }) => {
  return useMediaQuery({ minWidth: iPhonePlusLandscapeWidth + 1 })
    ? children
    : null
}
const SmallScreen = ({ children }) => {
  return useMediaQuery({ maxWidth: iPhonePlusLandscapeWidth }) ? children : null
}

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
          options {
            MILK
            SAUCE
            SERVE
            SPREAD
            SUGAR
            VEGGIE
          }
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
