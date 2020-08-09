import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { of, zip } from 'rxjs'
import {
  tap,
  filter,
  groupBy,
  mergeMap,
  toArray,
  map,
  reduce
} from 'rxjs/operators'

import { appContext } from '../../context-provider'
import styles from './listing.module.scss'
import Img from 'gatsby-image'

const Listing = ({ needle }) => {
  const data = useStaticQuery(query)
  const { app$ } = React.useContext(appContext)
  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    const cat$ = app$.pipe(
      filter(price => price && includesNeedle(price, needle)),
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
      reduce((acc, val) => [...acc, val], [])
    )
    const sub = cat$.subscribe(setCategories)
    return () => sub.unsubscribe()
  }, [app$])

  return (
    <div className={styles.categories}>
      {categories.map(([category, products]) => {
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

export const Category = ({ category, products, img }) => {
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
          {products.map(({ priceId, unitAmt, product }) => (
            <Product
              key={priceId}
              priceId={priceId}
              unitAmt={unitAmt}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const Product = ({ priceId, unitAmt, product }) => {
  const [qty, setQty] = React.useState(1)
  return (
    <div className={styles.flexCell}>
      <div className={styles.product}>
        <p className={styles.name}>{product.name}</p>
        <div className={styles.bottom}>
          <p className={styles.qty}>
            <label>{qty}</label>
            <span onClick={() => (qty > 1 ? setQty(qty - 1) : qty)}> - </span>
            <span onClick={() => setQty(qty + 1)}> + </span>
          </p>
          <div className={styles.priceandadd}>
            <span className={styles.price}>
              ${unitAmt} <span>{product.unit_label}</span>
            </span>
            <span className={styles.add}>Add</span>
          </div>
          <p style={{ display: 'none' }}>{JSON.stringify(product.metadata)}</p>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
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

export const sortProductName = (a, b) =>
  a.product.name.toLowerCase() < b.product.name.toLowerCase() ? -1 : 1

export const includesNeedle = (price, needle) => {
  if (!needle || needle === '') return true
  return (
    price &&
    price.node &&
    price.node.product &&
    (price.node.product.name.toLowerCase().includes(needle) ||
      price.node.product.metadata.TAGS.toLowerCase().includes(needle))
  )
}
