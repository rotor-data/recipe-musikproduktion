import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SeoHead from "../components/SeoHead"

const PeopleGalleryPage = ({ data }) => {
  const [activeImage, setActiveImage] = useState(null)
  const frontmatter = data.markdownRemark.frontmatter
  const galleryImages = frontmatter.galleryImages || []
  const hero = frontmatter.hero || {}
  const cta = frontmatter.cta || {}

  const images = useMemo(() => {
    const seen = new Set()
    return galleryImages
      .filter(item => item?.src)
      .filter(item => {
        const key = item?.src?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || item?.src
        if (!key || seen.has(key)) return false
        seen.add(key)
        return true
      })
      .map(item => ({
        image: item.src,
        alt: item.alt || item.title || "Gallery image",
        title: item.title,
        subtitle: item.subtitle || "",
      }))
  }, [galleryImages])

  return (
    <main className="rec-page rec-people-page">
      <section className="rec-shell rec-people">
        <header className="rec-people__header">
          {hero.kicker && <p className="rec-people__kicker">{hero.kicker}</p>}
          <h1 className="rec-people__title">{hero.pageTitle || "People"}</h1>
          {hero.lead && <p className="rec-people__lead">{hero.lead}</p>}
        </header>

        <div className="rec-people__grid">
          {images.map((item, index) => {
            const imageData = getImage(item.image)
            if (!imageData) {
              return null
            }

            return (
              <button
                key={`${item.title || "gallery"}-${index}`}
                type="button"
                className="rec-people__item"
                onClick={() => setActiveImage(item)}
                aria-label={`Open ${item.alt}`}
              >
                <GatsbyImage image={imageData} alt={item.alt} />
                <span className="rec-people__caption">
                  <strong>{item.title || "Studio"}</strong>
                  {item.subtitle && <em>{item.subtitle}</em>}
                </span>
              </button>
            )
          })}
        </div>

        {(cta.title || cta.linkText) && (
          <div className="rec-people__cta">
            {cta.title && <h2>{cta.title}</h2>}
            {cta.linkText && (
              <a href={cta.linkHref || "/contact"}>
                {cta.linkText}
              </a>
            )}
          </div>
        )}
      </section>

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
    </main>
  )
}

PeopleGalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        galleryImages: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            subtitle: PropTypes.string,
            alt: PropTypes.string,
            src: PropTypes.object,
          })
        ),
      }),
    }),
  }).isRequired,
}

export default PeopleGalleryPage

export const Head = ({ data }) => {
  const meta = data.markdownRemark.frontmatter.meta || {}

  return (
    <SeoHead
      title={meta.title || "People | Recipe Music Production"}
      description={
        meta.description || "Black and white gallery from Recipe Music Production in Stockholm."
      }
      slug="/people"
    />
  )
}

export const pageQuery = graphql`
  query PeopleGalleryPage {
    markdownRemark(frontmatter: { templateKey: { eq: "people-gallery" } }) {
      frontmatter {
        meta {
          title
          description
        }
        hero {
          kicker
          pageTitle
          lead
        }
        cta {
          title
          linkText
          linkHref
        }
        galleryImages {
          title
          subtitle
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
`
