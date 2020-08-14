import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useSelector } from 'react-redux'
import { useLunr } from 'react-lunr'
const _ = require('lodash')

import styles from './listing.module.scss'
import Img from 'gatsby-image'

const query = graphql`
  {
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

const Listing = () => {
  const data = useStaticQuery(query)

  const { categories, index, store, needle } = useSelector(state => state)
  const products = useLunr(needle, index, store)

  const [cats, setCats] = React.useState([])

  React.useEffect(() => {
    setCats(products.length > 0 ? toCategories(products) : categories)
  }, [products])

  return (
    <div className={styles.categories}>
      {cats.map(([category, products]) => {
        const imgName = category.toLowerCase().replace(/ /g, '')
        const img = data.images.edges[0].node.frontmatter[imgName]
        return (
          <Category
            key={category}
            category={category}
            products={products}
            img={img}
          />
        )
      })}
    </div>
  )
}

export default Listing

const Category = ({ category, products, img }) => {
  return (
    <div className={styles.category}>
      <div className={styles.title}>
        <h3>{category}</h3>
        {img ? (
          <Img
            fluid={img.childImageSharp.fluid}
            alt='image'
            className={styles.catimage}
          />
        ) : (
          ''
        )}
      </div>
      <div className={styles.flexCenter}>
        <div className={styles.products}>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Product = ({ priceId, unitAmt, product }) => {
  return (
    <div className={styles.flexCell}>
      <div className={styles.product}>
        <p className={styles.name}>{product.name}</p>
        <div className={styles.bottom}>
          <div className={styles.priceandadd}>
            <span className={styles.price}>
              ${product.price} <span>{product.unit_label}</span>
            </span>
            <span className={styles.add}>Pick</span>
          </div>
          <p style={{ display: 'none' }}>{JSON.stringify(product.metadata)}</p>
        </div>
      </div>
    </div>
  )
}

const sortProductName = (a, b) =>
  a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1

const toCategories = products => {
  const cs = _.groupBy(products, product => product.metadata.CATEGORY)
  return Object.keys(cs)
    .sort()
    .map(key => {
      const ps = cs[key].sort(sortProductName)
      return[key, ps]
    })
}
