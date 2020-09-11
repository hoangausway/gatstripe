const createNodeHelpers = require('gatsby-node-helpers').default
const { locations } = require('./locations')

exports.onPreInit = () => {
  console.log('Testing plugin gatsby-source-laroll-locations...')
}

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions
  const { createNodeFactory } = createNodeHelpers({
    typePrefix: 'LRLocations'
  })

  const prepareNode = createNodeFactory('JSONData')
  createNode(
    prepareNode({
      locations: JSON.stringify(locations),
      id: 'Locations'
    })
  )
}
