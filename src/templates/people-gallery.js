import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ImageFlowGrid from '../components/ImageFlowGrid'

// Template component (presentational only)
const PeopleGalleryPageTemplate = ({ flowBlocks }) => (
  <div className="has-background-black">
    <ImageFlowGrid flowBlocks={flowBlocks} />
  </div>
)

PeopleGalleryPageTemplate.propTypes = {
  flowBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      highlight: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
      }),
      highlightPosition: PropTypes.oneOf(['left', 'right']),
      highlightImage: PropTypes.shape({
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        title: PropTypes.string,
        alt: PropTypes.string,
      }),
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
            .isRequired,
          title: PropTypes.string,
          alt: PropTypes.string,
        })
      ),
    })
  ),
}

// Page container (fetches and processes GraphQL data)
const PeopleGalleryPage = ({ data }) => {
  const frontmatter = data.markdownRemark.frontmatter
  const { galleryBlocks } = frontmatter

  const flowBlocks = useMemo(() => {
    if (!galleryBlocks?.length) {
      return []
    }

    return galleryBlocks.map((block, blockIndex) => ({
      highlight: {
        title: block.highlight?.title,
        body: block.highlight?.body,
      },
      highlightImage: block.highlight
        ? {
            image: block.highlight.src,
            title: block.highlight.title,
            alt: block.highlight.alt,
          }
        : null,
      cards:
        block.cards?.map(card => ({
          image: card.src,
          title: card.title,
          alt: card.alt,
        })) || [],
      highlightPosition: blockIndex % 2 === 0 ? 'right' : 'left',
    }))
  }, [galleryBlocks])

  return (
    <Layout>
      <PeopleGalleryPageTemplate flowBlocks={flowBlocks} />
    </Layout>
  )
}

PeopleGalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        galleryBlocks: PropTypes.arrayOf(
          PropTypes.shape({
            highlight: PropTypes.shape({
              title: PropTypes.string,
              body: PropTypes.string,
              alt: PropTypes.string,
              src: PropTypes.object,
            }),
            cards: PropTypes.arrayOf(
              PropTypes.shape({
                title: PropTypes.string,
                alt: PropTypes.string,
                src: PropTypes.object,
              })
            ),
          })
        ),
      }),
    }),
  }).isRequired,
}

export { PeopleGalleryPageTemplate }
export default PeopleGalleryPage

export const pageQuery = graphql`
  query PeopleGalleryPage {
    markdownRemark(frontmatter: { templateKey: { eq: "people-gallery" } }) {
      frontmatter {
        galleryBlocks {
          highlight {
            title
            body
            alt
            src {
              childImageSharp {
                gatsbyImageData(
                  width: 600
                  quality: 80
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
          }
          cards {
            title
            alt
            src {
              childImageSharp {
                gatsbyImageData(
                  width: 400
                  quality: 70
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
  }
`
