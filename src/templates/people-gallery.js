import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MasonryGallery from '../components/MasonryGallery'
import { GatsbyImage } from "gatsby-plugin-image";
import DuctTape from "../img/duct-tape.svg";
import { motion, AnimatePresence } from 'framer-motion'

// Template component (presentational only)
const PeopleGalleryPageTemplate = ({ title, gallery, onCardClick }) => {
  return (
    <div className="has-background-black">

        <h1 className="title is-3 has-text-centered mb-6">{title}</h1>
        <MasonryGallery photos={gallery} onCardClick={onCardClick} />

    </div>
  )
}

PeopleGalleryPageTemplate.propTypes = {
  title: PropTypes.string,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      thumb: PropTypes.object.isRequired,
      full: PropTypes.object.isRequired,
      title: PropTypes.string,
    })
  ),
  onCardClick: PropTypes.func,
}

// Page container (fetches and processes GraphQL data)
const PeopleGalleryPage = ({ data }) => {
  const frontmatter = data.markdownRemark.frontmatter
  const { title, gallery } = frontmatter

  const [activePhoto, setActivePhoto] = useState(null)
  const handleCardClick = useCallback(
    photo => setActivePhoto(photo),
    []
  )

  const processedGallery = gallery
    .filter(
      item =>
        item.thumb?.childImageSharp?.gatsbyImageData &&
        item.full?.childImageSharp?.gatsbyImageData
    )
    .map(item => ({
      thumb: item.thumb,
      full: item.full.childImageSharp.gatsbyImageData,
      title: item.title,
    }))

  return (
    <>
      <PeopleGalleryPageTemplate
        title={title}
        gallery={processedGallery}
        onCardClick={handleCardClick}
      />
      <AnimatePresence>
        {activePhoto && (
            <motion.div
              className="gallery-overlay"
              onClick={() => setActivePhoto(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="gallery-overlay__inner"
                onClick={() => setActivePhoto(null)}
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { duration: 0.4 } }}
                exit={{ scale: 0.97, opacity: 0, transition: { duration: 0.25 } }}
            >
              <GatsbyImage
                image={activePhoto.full}
                alt={activePhoto.title || ""}
              />
              <div className="text-wrapper">
                <div className="duct-tape-container">
                  <DuctTape className="duct-tape-background" />
                  {activePhoto.title && (
                    <div className="text-overlay overlay-title">
                      {activePhoto.title}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

PeopleGalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        gallery: PropTypes.arrayOf(
          PropTypes.shape({
            thumb: PropTypes.object,
            full: PropTypes.object,
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
          title
          thumb: src {
            childImageSharp {
              gatsbyImageData(
                width: 300
                quality: 70
                placeholder: BLURRED
                layout: CONSTRAINED
              )
            }
          }
          full: src {
            childImageSharp {
              gatsbyImageData(
                width: 1200
                quality: 90
                placeholder: NONE
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  }
`
