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
import Cancel from '../components/cancel'
import NotFound from '../components/notfound'

import ListCart from '../components/list-cart'
import OptionsCart from '../components/options-cart'
import CancelCart from '../components/cancel-cart'
import SuccessCart from '../components/success-cart'

import { useDispatch } from 'react-redux'
import { aDataFeed } from '../state/list-reducer'
import { aCartLoad } from '../state/cart-reducer'

import Metadata from '../components/metadata'

const Index = ({ data }) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const jsonItems = data.products.edges[0].node.items
    const jsonExtras = data.products.edges[0].node.extras

    dispatch(aDataFeed({ jsonItems, jsonExtras }))
    // load cart from indexeddb
    dispatch(aCartLoad())
  }, [])

  return (
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
            <Cancel path='cancel' />
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
            <CancelCart path='cancel' />
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
    products: allLrStripeJsonData {
      edges {
        node {
          extras
          items
        }
      }
    }
  }
`
