const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

  // /cases/ used to be a second address for the same page as /work/.
  // Declared here rather than in netlify.toml, which this site does not
  // appear to read: gatsby-plugin-netlify writes these into public/_redirects.
  createRedirect({ fromPath: "/cases", toPath: "/work/", isPermanent: true, force: true })
  createRedirect({ fromPath: "/cases/", toPath: "/work/", isPermanent: true, force: true })
  createRedirect({ fromPath: "/cases/*", toPath: "/work/", isPermanent: true, force: true })
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
      footer: SiteFooterText
      cookies: SiteCookieText
      notFound: SiteNotFoundText
      sections: [Section]
      hero: Hero
      pageCopy: PageCopy
      logoBanner: LogoBanner
      featuredImages: [GalleryImage]
      galleryImages: [GalleryImage]
      featuredVideos: [FeaturedVideo]
    }

    type SiteFooterText {
      rightsText: String
    }

    type SiteCookieText {
      bannerText: String
      acceptButton: String
      customizeButton: String
      modalAcceptAll: String
      modalSave: String
    }

    type SiteNotFoundText {
      title: String
      body: String
    }

    type Section @infer {
      type: String
      title: String
      h1title: String
      description: String
      kicker: String
      label: String
      pretitle: String
      body: String
      highlightPosition: String
      ctaText: String
      ctaLink: String
      secondaryCtaText: String
      secondaryCtaLink: String
      primaryText: String
      primaryHref: String
      secondaryText: String
      secondaryHref: String
      buttonText: String
      buttonHref: String
      image: File @fileByRelativePath
      logos: [LogoBannerItem]
      cards: [FlowBlockCard]
      featuredVideos: [FeaturedVideo]
      blocks: [SolutionBlock]
    }

    type SolutionBlock {
      category: String
      items: SolutionBlockItems
    }

    type SolutionBlockItems {
      title: String
      description: String
    }

    type Hero @infer {
      image: File @fileByRelativePath
    }

    type PageCopy @infer {
      flowBlocks: [FlowBlock]!
      bottomCta: BottomCta
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
      fullWidth: Boolean
      link: String
      linkLabel: String
      cropPosition: String
    }

    type FlowBlockGalleryItem {
      image: File @fileByRelativePath
      bigText: String
      cropPosition: String
    }

    type BottomCta {
      title: String
      buttonText: String
      buttonHref: String
    }

    type LogoBanner {
      label: String
      logos: [LogoBannerItem]
    }

    type LogoBannerItem {
      image: File @fileByRelativePath
      alt: String
      href: String
    }

    type GalleryImage {
      featured: Boolean
      order: Int
      title: String
      subtitle: String
      alt: String
      cropPosition: String
      src: File @fileByRelativePath
    }

    type FeaturedVideo {
      order: Int
      title: String
      subtitle: String
      description: String
      category: String
      youtubeUrl: String
      thumbnail: String
      cropPosition: String
    }
  `)
}
