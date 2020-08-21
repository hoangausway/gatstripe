import React from 'react'
import { Link } from '@reach/router'
import { graphql, useStaticQuery } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'
import cx from 'classnames'

import { aCartAddItem } from '../state/action-types'

import Img from 'gatsby-image'

import style from './list.module.scss'

const List = () => {
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
    <div className={style.list}>
      <div className={style.categories}>
        {cats.map(([category, products]) => (
          <Category
            key={category}
            category={category}
            products={products}
            img={catImage(category, data.images.edges[0].node.frontmatter)}
          />
        ))}
      </div>
    </div>
  )
}
export default List

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

const Category = ({ category, products, img }) => {
  return (
    <div className={style.category}>
      <div className={style.title}>
        <h3>{category}</h3>
        {catImg(img, style.catimage)}
      </div>
      <div className={style.flexCenter}>
        <div className={style.products}>{productList(products)}</div>
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
    <div className={style.flexCell}>
      <div className={inCart ? cx(style.product, style.inCart) : style.product}>
        <p className={style.name}>{product.name}</p>
        <div className={style.priceandadd}>
          <span className={style.price}>
            ${product.price} <span>{product.unit_label}</span>
          </span>
          <span className={style.add} onClick={pickHandler}>
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
