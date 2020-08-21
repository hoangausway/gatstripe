// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path === '/') {
    page.matchPath = '/*'
    createPage(page)
  }
}
