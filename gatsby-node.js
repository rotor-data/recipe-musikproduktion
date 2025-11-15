const _ = require('lodash')
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
              tags
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
      if (edge.node.frontmatter.templateKey !== 'tools') {
        const id = edge.node.id
        createPage({
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`),
          context: {
            id,
          },
        })
      }
    })

    posts.forEach((edge) => {
      if (edge.node.frontmatter.templateKey === 'tools') {
        const id = edge.node.id
        createPage({
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(`src/templates/tools.js`),
          context: {
            id,
          },
        })
      }
    })

    let tags = []
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    tags = _.uniq(tags)
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
    type MarkdownRemarkFrontmatterFlowBlocksHighlight {
      pretitle: String
      title: String
      body: String
      ctaText: String
      ctaLink: String
      megaHeadline: String
    }

    type MarkdownRemarkFrontmatterFlowBlocksCard {
      tagline: String
      title: String
      description: String
      fullWidth: Boolean
      link: String
      linkLabel: String
      image: File @fileByRelativePath
    }

    type MarkdownRemarkFrontmatterFlowBlocksGalleryItem {
      image: File @fileByRelativePath
      title: String
      subtitle: String
      bigText: String
      link: String
    }

    type MarkdownRemarkFrontmatterFlowBlocks {
      highlight: MarkdownRemarkFrontmatterFlowBlocksHighlight
      cards: [MarkdownRemarkFrontmatterFlowBlocksCard]
      highlightPosition: String
      showGallery: Boolean
      galleryItems: [MarkdownRemarkFrontmatterFlowBlocksGalleryItem]
    }
  `)
}
