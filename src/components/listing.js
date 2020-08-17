import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'
import cx from 'classnames'

import { aCartAddItem } from '../state/action-types'

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

  const cart = useSelector(state => state.cart)
  const foundCats = useSelector(state => state.foundCats)
  const [cats, setCats] = React.useState([])

  React.useEffect(() => {
    const cs = foundCats.map(c => {
      return [
        c[0],
        c[1].map(p => {
          const foundInCart = cart.find(i => i.productId === p.id)
          return { ...p, inCart: !!foundInCart }
        })
      ]
    })
    setCats(cs)
  }, [foundCats, cart])

  return (
    <div className={styles.categories}>
      {cats.map(([category, products]) => (
        <Category
          key={category}
          category={category}
          products={products}
          img={catImage(category, data.images.edges[0].node.frontmatter)}
        />
      ))}
    </div>
  )
}

export default Listing

const Category = ({ category, products, img }) => {
  return (
    <div className={styles.category}>
      <div className={styles.title}>
        <h3>{category}</h3>
        {catImg(img, styles.catimage)}
      </div>
      <div className={styles.flexCenter}>
        <div className={styles.products}>{productList(products)}</div>
      </div>
    </div>
  )
}

const Product = ({ priceId, unitAmt, product }) => {
  const dispatch = useDispatch()
  const pickHandler = () =>
    !product.inCart && dispatch(aCartAddItem(product.id))

  const inCart = product.inCart

  return (
    <div className={styles.flexCell}>
      <div
        className={inCart ? cx(styles.product, styles.inCart) : styles.product}
      >
        <p className={styles.name}>{product.name}</p>
        <div className={styles.priceandadd}>
          <span className={styles.price}>
            ${product.price} <span>{product.unit_label}</span>
          </span>
          <span className={styles.add} onClick={pickHandler}>
            {product.inCart ? 'IN CART' : 'PICK'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Helpers
const catImg = (img, style) => {
  return img ? (
    <Img fluid={img.childImageSharp.fluid} alt='image' className={style} />
  ) : (
    ''
  )
}

const productList = products =>
  products.map(product => <Product key={product.id} product={product} />)

const catImage = (category, frontmatter) => {
  const imgName = category.toLowerCase().replace(/ /g, '')
  return frontmatter[imgName]
}
