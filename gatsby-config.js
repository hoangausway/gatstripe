/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'La Roll - ALWAYS FRESH',
    description: 'Street food, freshly made!',
    author: 'Hoang Nguyen'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    // {
    //   resolve: 'gatsby-source-stripe',
    //   options: {
    //     objects: ['Price'],
    //     secretKey: process.env.STRIPE_SECRET_KEY,
    //     downloadFiles: false
    //   }
    // },
    'gatsby-plugin-sass',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-laroll',
      options: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        indexFilePath: 'static/lr-stripe-index.json'
      }
    }
  ]
}
