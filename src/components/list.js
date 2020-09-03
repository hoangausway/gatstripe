import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'
import cx from 'classnames'

import { aCartAddItem } from '../state/cart-reducer'

import Img from 'gatsby-image'

import style from './list.module.scss'

const List = () => {
  const data = useStaticQuery(query)

  const cart = useSelector(state => state.cart)

  const foundCats = useSelector(state => state.list.foundCats)
  const [cats, setCats] = React.useState([])

  React.useEffect(() => {
    console.log('cart.items', cart.items)
    const cs = foundCats.map(c => {
      return [
        c[0],
        c[1].map(p => {
          const foundInCart = cart.items.find(i => i.id === p.id)
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
        <div className={style.products}>{itemList(products)}</div>
      </div>
    </div>
  )
}

const Item = ({ priceId, unitAmt, item }) => {
  const dispatch = useDispatch()
  const pickHandler = () => !item.inCart && dispatch(aCartAddItem(item))

  const inCart = item.inCart

  return (
    <div className={style.flexCell}>
      <div className={inCart ? cx(style.item, style.inCart) : style.item}>
        <p className={style.name}>{item.name}</p>
        <div className={style.priceandadd}>
          <span className={style.price}>
            ${item.price} <span>{item.unit_label}</span>
          </span>
          <span className={style.add} onClick={pickHandler}>
            {item.inCart ? 'IN CART' : 'PICK'}
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

const itemList = items => items.map(item => <Item key={item.id} item={item} />)

const catImage = (category, frontmatter) => {
  const imgName = category.toLowerCase().replace(/ /g, '')
  return frontmatter[imgName]
}
