import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MasonryGallery from '../components/MasonryGallery'

// Template component (presentational only)
const PeopleGalleryPageTemplate = ({ title, gallery }) => {
  console.log("gallery", gallery)
  return (
    <section className="section has-background-black">
      <div className="container is-fluid">
        <h1 className="title is-3 has-text-centered mb-6">{title}</h1>
        <MasonryGallery photos={gallery} />
      </div>
    </section>
  )
}

PeopleGalleryPageTemplate.propTypes = {
  title: PropTypes.string,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.object.isRequired, // Expecting gatsbyImageData object
      title: PropTypes.string,
    })
  ),
}

// Page container (fetches and processes GraphQL data)
const PeopleGalleryPage = ({ data }) => {
  const frontmatter = data.markdownRemark.frontmatter
  const title = frontmatter.title
  const gallery = frontmatter.gallery

  const processedGallery = gallery.map((item) => {
    return {
      src: item.src,
      title: item.title,
    }
  })

  return (
    <PeopleGalleryPageTemplate title={title} gallery={processedGallery} />
  )
}

PeopleGalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        gallery: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.object,
            title: PropTypes.string,
          })
        ),
      }),
    }),
  }).isRequired,
}

export default PeopleGalleryPage

export const pageQuery = graphql`
  query PeopleGalleryPage {
    markdownRemark(frontmatter: { templateKey: { eq: "people-gallery" } }) {
      frontmatter {
        title
        gallery {
          src {
            childImageSharp {
              gatsbyImageData(
                quality: 80
                layout: CONSTRAINED
                transformOptions: { cropFocus: NORTH, fit: COVER }
              )
            }
          }
          title
        }
      }
    }
  }
`
