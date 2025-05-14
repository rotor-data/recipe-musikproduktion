import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import FeatureList from "../components/FeatureList"
import CallToAction from "../components/CallToAction"
import TextImage from "../components/TextImage"
import TwoColumnText from "../components/TwoColumnText"
import Solutions from "../components/Solutions"
import CaseStudy from "../components/CaseStudy"
import SeoHead from "../components/SeoHead"
import Testimonial from "../components/Testimonial"
import SwooshBlock from "../components/SwooshBlock"


// eslint-disable-next-line
export const IndexPageTemplate = ({ content }) => {
  const hero = content.hero
  const textImage = content.textImage

  return (
    <>
    <div className="has-background-white">
      
      <HeroSection
        title={hero.title}
        h1title={hero.h1title}
        description={hero.description}
        ctaText={hero.cta}
        image={hero.image}
      />

<Solutions solutions={content.solutions} /> 
 <Testimonial testimonial={content.testimonial}/>
 <SwooshBlock title={textImage.title} text={textImage.text} buttonText={textImage.buttonText} buttonLink={textImage.buttonLink}/>

    {/*        <FeatureList features={content.features} />
      <CallToAction title="Redo att ta nästa steg?" ctaText="Boka en strategi-session" />
      <TextImage
        title={content.textImage.title}
        text={content.textImage.text}
        image={content.textImage.image}
        reverse={false}
      />
      <TwoColumnText
        title={content.twoColumn.title}
        columns={content.twoColumn.columns}
      />
      <CallToAction
        title={content.callToAction.title}
        ctaText={content.callToAction.text}
        url={content.callToAction.url}
      />
      <CaseStudy caseData={content.caseStudy} /> */}
      </div>
    </>
  )
}

IndexPageTemplate.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    features: PropTypes.object,
    textImage: PropTypes.object,
    twoColumn: PropTypes.object,
    solutions: PropTypes.object,
    caseStudy: PropTypes.object,
    callToAction: PropTypes.object,
  }),
}

// 🔹 Containerkomponent
const IndexPage = ({ data }) => {
  const content = data.markdownRemark.frontmatter.indexPage

  return (
    <Layout>
      <IndexPageTemplate content={content} />
    </Layout>
  )
}

export default IndexPage

export const Head = ({ data }) => {
  const meta = data.markdownRemark.frontmatter.indexPage.meta

  return (
    <SeoHead
      title={meta.title}
      description={meta.description}
      slug="/"
    />
  )
}

export const query = graphql`
  query {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        indexPage {
          meta {
            title
            description
          }
          hero {
            title
            h1title
            description
            cta
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 90
                  layout: CONSTRAINED
                  transformOptions: { cropFocus: CENTER, duotone: { shadow: "#707070", highlight: "#C29C38", opacity: 80 } }
                )
              }
            }
          }
          testimonial {
            name
            company
            quote
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 90
                  layout: CONSTRAINED
                  height: 300
                  transformOptions: { cropFocus: CENTER, fit: CONTAIN }
                )
              }            
            }
          }  
          features {
            title
            description
          }
          textImage {
            title
            text
            buttonText
            buttonLink
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 90
                  layout: CONSTRAINED
                  height: 300
                  transformOptions: { cropFocus: CENTER, fit: CONTAIN }
                )
              }
            }
          }
          twoColumn {
            title
            columns {
              heading
              text
            }
          }
          solutions {
            blocks {
              category
              items {
                title
                description
                url
              }
            }
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 90
                  layout: CONSTRAINED
                  width: 450
                  height: 500
                  transformOptions: {
                    cropFocus: CENTER
                    fit: COVER
                  }
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
          caseStudy {
            title
            results
            ctaText
          }
          callToAction {
            title
            text
            url
          }
        }
      }
    }
  }
`
