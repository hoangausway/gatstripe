import React from 'react'
import Layout from '../components/layout'

import Metadata from '../components/metadata'
import { graphql } from 'gatsby'
import { from, of, zip } from 'rxjs'
import { groupBy, mergeMap, toArray, map, reduce } from 'rxjs/operators'
import { appContext } from '../../context-provider'

import Listing from '../components/listing'

const Index = ({ data }) => {
  const { setCategories } = React.useContext(appContext)
  const categories$ = dataToListing(data.prices.edges)

  React.useLayoutEffect(() => {
    const sub = categories$.subscribe(setCategories)
    return () => sub.unsubscribe()
  }, [])

  return (
    <Layout>
      <Metadata title='Home' description='This is my home page' />
      <Listing needle='' />
    </Layout>
  )
}

export default Index

export const query = graphql`
  {
    prices: allStripePrice(
      filter: { active: { eq: true } }
      sort: { fields: product___metadata___CATEGORY }
    ) {
      edges {
        node {
          active
          id
          unit_amount
          product {
            name
            description
            unit_label
            metadata {
              CATEGORY
              SAUCE
              SPREAD
              GST
              MILK
              SUGAR
              TAGS
              VEGGIE
            }
          }
        }
      }
    }
    images: allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            banhmi {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            coffee {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            drink {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            friedrice {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            laboon {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            lapho {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            lasalad {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            meat {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            milk {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            ricepaperroll {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            side {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            steamedrice {
              childImageSharp {
                fluid(maxWidth: 120) {
                  originalName
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`

export const sortProductName = (a, b) =>
  a.product.name.toLowerCase() < b.product.name.toLowerCase() ? -1 : 1

export const dataToListing = prices => {
  return (
    // query data
    from(prices).pipe(
      // group by CATEGORY as key, transform to array of objects {priceId, product}
      groupBy(
        val => val.node.product.metadata.CATEGORY,
        v => ({
          priceId: v.node.id,
          unitAmt: (v.node.unit_amount / 100).toFixed(2),
          product: v.node.product
        })
      ),
      // merge each group to array of CATEGORY name and array of products
      mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
      // sort array of products in each CATEGORY
      map(arr => [arr[0], arr[1].sort(sortProductName)]),
      // reduce to overall array
      reduce((acc, val) => [...acc, val], [])
    )
  )
}
