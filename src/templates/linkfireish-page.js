import React from "react"
import { graphql } from "gatsby"
import LinkFireish from "../components/LinkFireish"
import SeoHead from "../components/SeoHead"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage" // ✅ import your wrapper
import Layout from "../components/Layout"

// Page Template: This handles data passing and renders the page
const LinkFireishPageTemplate = ({ landing, platforms }) => {
  return (
    <>
      <div className="page-wrapper">
        {/* Faux Background using PreviewCompatibleImage */}
        {landing.backgroundImage && (
          <PreviewCompatibleImage
            imageInfo={{
              image: landing.backgroundImage,
              alt: "Background Image",
              imageStyle: {
                position: "fixed",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: 0,
                filter: "blur(8px) brightness(0.5)",
              },
              imgStyle: {
                objectFit: "cover",
              },
            }}
          />
        )}

        {/* Main content */}
        <div className="content-wrapper">
          <LinkFireish
            title={landing.heading}
            subtitle={landing.subheading}
            image={landing.image.publicURL || landing.image}
            platforms={platforms}
          />
        </div>
      </div>
    </>
  )
}

// Page Component: Fetches data and passes it to the template
const LinkFireishPage = ({ data }) => {
  const { landing } = data.markdownRemark.frontmatter

  const platforms = landing.platforms.map((item) => ({
    platform: item.platform,
    url: item.url,
  }))

  return (
    <>
      <Layout>
        <LinkFireishPageTemplate landing={landing} platforms={platforms} />
      </Layout>
    </>
  )
}

export default LinkFireishPage

// Head Component: Manages SEO metadata
export const Head = ({ data }) => {
  const meta = data.markdownRemark.frontmatter.landing.meta

  return (
    <>
      <SeoHead
        title={meta.title}
        description={meta.description}
        slug="/"
      />
    </>
  )
}

export const pageQuery = graphql`
  query LinkFireishPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        landing {
          meta {
            title
            description
            ogImage {
              childImageSharp {
                gatsbyImageData(
                  quality: 100
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  transformOptions: { cropFocus: CENTER, fit: CONTAIN }
                )
              }
            }
          }
          heading
          subheading
          image {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                layout: CONSTRAINED
                placeholder: BLURRED
                transformOptions: { cropFocus: CENTER, fit: CONTAIN }
              )
            }
          }
          backgroundImage {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                layout: FULL_WIDTH
                placeholder: BLURRED
                transformOptions: { cropFocus: CENTER, fit: COVER }
              )
            }
          }
          platforms {
            platform
            url
          }
        }
      }
    }
  }
`
