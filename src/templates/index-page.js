import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import FeatureList from "../components/FeatureList"
import CallToAction from "../components/CallToAction"
import TextImage from "../components/TextImage"
import TwoColumnText from "../components/TwoColumnText"
import Solutions from "../components/Solutions"
import CaseStudy from "../components/CaseStudy"
import SeoHead from "../components/SeoHead"
import Hero from "../components/Hero"
import PreSave from "../components/PreSave" 
import Featured from "../components/Featured"

// eslint-disable-next-line
export const IndexPageTemplate = ({ content }) => {
  const hero = content.hero;
  const heroImage = getImage(hero.image)


  return (
    <>

    <Hero image={heroImage} title={content.hero.title} />
{/*     <TextImage
        title={content.textImage.title}
        text={content.textImage.text}
        image={content.textImage.image}
        reverse={false}
      /> */}
   <div className="has-background-info-10">
     <Featured 
     title={content.preSave.title}
     subtitle={content.preSave.subtitle} 
     text={content.preSave.text} 
     link={content.preSave.link} 
     image={content.preSave.image}
     buttonText={content.preSave.buttonText}
     preTitle={content.preSave.preTitle}
     />
     
   </div>
{/*       <HeroSection
        title={hero.title}
        h1title={hero.h1title}
        description={hero.description}
        ctaText={hero.cta}
        image={hero.image}
      /> */}
 {/*      <Solutions solutions={content.solutions} />
      <FeatureList features={content.features} />
      <CallToAction title="Redo att ta nästa steg?" ctaText="Boka en strategi-session" />

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
                  quality: 100
                  layout: CONSTRAINED
                  transformOptions: { cropFocus: CENTER, fit: CONTAIN }
                )
              }
            }
          }
          preSave {
            title
            subtitle
            preTitle
            buttonText
            text
            link
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 100
                  layout: CONSTRAINED
                  width: 700
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
              }
            }
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
