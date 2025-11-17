const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { visible: { eq: true }, templateKey: { regex: "/^(?!blog-post$)^(?!faq$)/" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        context: {
          id,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter @infer {
      hero: Hero
      pageCopy: PageCopy
    }

    type Hero @infer {
      image: File @fileByRelativePath
    }

    type PageCopy @infer {
      flowBlocks: [FlowBlock]!
    }

    type FlowBlock @infer {
      highlight: FlowBlockHighlight
      cards: [FlowBlockCard]
      galleryItems: [FlowBlockGalleryItem]
    }

    type FlowBlockHighlight @infer {
      image: File @fileByRelativePath
    }

    type FlowBlockCard {
      image: File @fileByRelativePath
    }

    type FlowBlockGalleryItem {
      image: File @fileByRelativePath
      bigText: String
    }
  `)
}
