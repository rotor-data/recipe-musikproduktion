import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SeoHead from "../components/SeoHead"

const PeopleGalleryPage = ({ data }) => {
  const [activeImage, setActiveImage] = useState(null)
  const galleryBlocks = data.markdownRemark.frontmatter.galleryBlocks || []

  const images = useMemo(() => {
    return galleryBlocks.flatMap(block => {
      const highlightImage = block.highlight?.src
        ? [{
            image: block.highlight.src,
            alt: block.highlight.alt || block.highlight.title || "Gallery image",
            title: block.highlight.title,
          }]
        : []

      const cardImages = (block.cards || [])
        .filter(card => card?.src)
        .map(card => ({
          image: card.src,
          alt: card.alt || card.title || "Gallery image",
          title: card.title,
        }))

      return [...highlightImage, ...cardImages]
    })
  }, [galleryBlocks])

  return (
    <section className="section content-page-shell content-page-shell--gradient">
      <div className="container is-fluid">
        <h1 className="title is-size-1 has-text-white content-page__title">People</h1>

        <div className="people-grid">
          {images.map((item, index) => {
            const imageData = getImage(item.image)
            if (!imageData) {
              return null
            }

            return (
              <button
                key={`${item.title || "gallery"}-${index}`}
                type="button"
                className="people-grid__item"
                onClick={() => setActiveImage(item)}
                aria-label={`Open ${item.alt}`}
              >
                <GatsbyImage image={imageData} alt={item.alt} />
              </button>
            )
          })}
        </div>
      </div>

      {activeImage && (
        <div className="image-flow-grid__modal" onClick={() => setActiveImage(null)}>
          <div className="image-flow-grid__modal-content">
            <GatsbyImage
              image={getImage(activeImage.image)}
              alt={activeImage.alt}
              style={{ width: "auto", maxWidth: "95vw", maxHeight: "calc(100vh - 4rem)" }}
              imgStyle={{ objectFit: "contain" }}
            />
            {activeImage.title && (
              <p className="image-flow-grid__modal-title">{activeImage.title}</p>
            )}
          </div>
        </div>
      )}
    </section>
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

export default PeopleGalleryPage

export const Head = () => (
  <SeoHead
    title="People | Recipe Music Production"
    description="Black and white gallery from Recipe Music Production in Stockholm."
    slug="/people"
  />
)

export const pageQuery = graphql`
  query PeopleGalleryPage {
    markdownRemark(frontmatter: { templateKey: { eq: "people-gallery" } }) {
      frontmatter {
        galleryBlocks {
          highlight {
            title
            alt
            src {
              childImageSharp {
                gatsbyImageData(
                  width: 560
                  height: 560
                  quality: 82
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  transformOptions: { fit: COVER, cropFocus: CENTER, grayscale: true }
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
                  width: 560
                  height: 560
                  quality: 82
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  transformOptions: { fit: COVER, cropFocus: CENTER, grayscale: true }
                )
              }
            }
          }
        }
      }
    }
  }
`
