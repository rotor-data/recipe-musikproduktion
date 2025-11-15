import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import HeroSection from "../components/HeroSection"
import SeoHead from "../components/SeoHead"
import FlowGrid from "../components/FlowGrid"

const IndexPageTemplate = ({ content }) => {
  const { hero, pageCopy = {} } = content
  const heroCtaText =
    hero?.cta?.buttonText || hero?.cta?.text || hero?.cta || ""
  return (
    <>
      <div className="has-background-black">
        <HeroSection
          title={hero.title}
          h1title={hero.h1title}
          description={hero.description}
          ctaText={heroCtaText}
          image={hero.image}
        />
      </div>

      <FlowGrid flowBlocks={pageCopy.flowBlocks} />
    </>
  )
}

IndexPageTemplate.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    solutions: PropTypes.object,
    pageCopy: PropTypes.object,
  }),
}

// 🔹 Containerkomponent
const IndexPage = ({ data }) => {
  const content = data.markdownRemark.frontmatter

  return <IndexPageTemplate content={content} />
}

export default IndexPage

export const Head = ({ data }) => {
  const meta = data.markdownRemark.frontmatter.meta

  return (
    <SeoHead title={meta.title} description={meta.description} slug="/" />
  )
}

export const query = graphql`
  query {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        meta {
          title
          description
        }
        hero {
          title
          h1title
          description
          cta {
            buttonText
          }
          image {
            childImageSharp {
              gatsbyImageData(
                quality: 90
                layout: CONSTRAINED
                transformOptions: {
                  cropFocus: CENTER
                  duotone: { shadow: "#707070", highlight: "#C29C38", opacity: 80 }
                }
              )
            }
          }
        }
          pageCopy {
            flowBlocks {
              highlightPosition
              highlight {
                pretitle
                title
                body
                ctaText
                megaHeadline
                ctaLink
              }
              showGallery
              galleryItems {
                image {
                  publicURL
                }
                title
                subtitle
                bigText
                link
              }
              cards {
              tagline
              title
              description
              fullWidth
              link
              linkLabel
              image {
                childImageSharp {
                  gatsbyImageData(
                    quality: 90
                    layout: CONSTRAINED
                    transformOptions: {
                      cropFocus: CENTER
                      fit: COVER
                    }
                    width: 900
                    height: 360
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`
