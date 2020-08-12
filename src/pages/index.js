import React from 'react'
import { graphql } from 'gatsby'

import { useDispatch } from 'react-redux'
import { actPricesFeed } from '../state/action-types'

import Metadata from '../components/metadata'
import Layout from '../components/layout'
import Listing from '../components/listing'

const Index = ({ data }) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(actPricesFeed(data.prices.edges))
  }, [])

  return (
    <Layout data={data}>
      <Metadata title='Click & Collect' description='This is my home page' />
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
