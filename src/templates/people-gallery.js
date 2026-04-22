import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import SeoHead from "../components/SeoHead"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage"
import { cropPositionToObjectPosition } from "../lib/imageCrop"

const imageSourceKey = source => {
  if (!source) return ""
  if (typeof source === "string") return source
  return (
    source?.childImageSharp?.gatsbyImageData?.images?.fallback?.src ||
    source?.publicURL ||
    source?.src ||
    ""
  )
}

const normalizeItems = items =>
  (items || [])
    .filter(item => item?.src)
    .map(item => ({
      image: item.src,
      alt: item.alt || item.title || "Gallery image",
      title: item.title || "",
      subtitle: item.subtitle || "",
      cropPosition: item.cropPosition || "center",
      order: Number(item.order) || 0,
    }))

export const PeopleGalleryTemplate = ({ content = {} }) => {
  const [activeImage, setActiveImage] = useState(null)
  const hero = content.hero || {}
  const cta = content.cta || {}
  const featured = useMemo(
    () =>
      normalizeItems(content.featuredImages || [])
        .sort((a, b) => {
          const left = a.order || Number.MAX_SAFE_INTEGER
          const right = b.order || Number.MAX_SAFE_INTEGER
          return left - right
        })
        .slice(0, 5),
    [content.featuredImages]
  )
  const gallery = useMemo(() => normalizeItems(content.galleryImages || []), [content.galleryImages])

  const featuredKeys = new Set(featured.map(item => imageSourceKey(item.image)).filter(Boolean))
  const remainingGallery = gallery.filter(item => !featuredKeys.has(imageSourceKey(item.image)))
  const allGalleryItems = featured.length ? remainingGallery : gallery

  const renderGalleryItem = (item, index, keyPrefix) => (
    <button
      key={`${keyPrefix}-${item.title || "gallery"}-${index}`}
      type="button"
      className="rec-people__item"
      onClick={() => setActiveImage(item)}
      aria-label={`Open ${item.alt}`}
    >
      <div className="rec-people__media">
        <PreviewCompatibleImage
          imageInfo={{
            image: item.image,
            alt: item.alt,
            imageStyle: { width: "100%", height: "100%" },
            imgStyle: {
              objectFit: "cover",
              objectPosition: cropPositionToObjectPosition(item.cropPosition),
            },
          }}
        />
      </div>
      <span className="rec-people__caption">
        <strong className="rec-people__caption-title">{item.title || "Studio"}</strong>
        {item.subtitle && <em>{item.subtitle}</em>}
      </span>
    </button>
  )

  return (
    <main className="rec-page rec-people-page">
      <section className="rec-shell rec-people">
        <header className="rec-people__header">
          {hero.kicker && <p className="rec-people__kicker">{hero.kicker}</p>}
          <h1 className="rec-people__title">{hero.pageTitle || "People"}</h1>
          {hero.lead && <p className="rec-people__lead">{hero.lead}</p>}
        </header>

        {featured.length > 0 && (
          <section className="rec-people__featured">
            <p className="rec-people__featured-label">Featured</p>
            <div className="rec-people__grid rec-people__grid--featured">
              {featured.map((item, index) => renderGalleryItem(item, index, "featured"))}
            </div>
          </section>
        )}

        <div className="rec-people__grid">
          {allGalleryItems.map((item, index) => renderGalleryItem(item, index, "gallery"))}
        </div>

        {(cta.title || cta.linkText) && (
          <div className="rec-people__cta">
            {cta.title && <h2>{cta.title}</h2>}
            {cta.linkText && <a href={cta.linkHref || "/contact"}>{cta.linkText}</a>}
          </div>
        )}
      </section>

      {activeImage && (
        <div className="image-flow-grid__modal" onClick={() => setActiveImage(null)}>
          <div className="image-flow-grid__modal-content">
            <PreviewCompatibleImage
              imageInfo={{
                image: activeImage.image,
                alt: activeImage.alt,
                imageStyle: { width: "auto", maxWidth: "95vw", maxHeight: "calc(100vh - 4rem)" },
                imgStyle: {
                  objectFit: "contain",
                  objectPosition: cropPositionToObjectPosition(activeImage.cropPosition),
                },
              }}
            />
            {activeImage.title && <p className="image-flow-grid__modal-title">{activeImage.title}</p>}
          </div>
        </div>
      )}
    </main>
  )
}

PeopleGalleryTemplate.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.shape({
      kicker: PropTypes.string,
      pageTitle: PropTypes.string,
      lead: PropTypes.string,
    }),
    cta: PropTypes.shape({
      title: PropTypes.string,
      linkText: PropTypes.string,
      linkHref: PropTypes.string,
    }),
    featuredImages: PropTypes.arrayOf(
      PropTypes.shape({
        order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        subtitle: PropTypes.string,
        alt: PropTypes.string,
        cropPosition: PropTypes.string,
        src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      })
    ),
    galleryImages: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        alt: PropTypes.string,
        cropPosition: PropTypes.string,
        src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      })
    ),
  }),
}

const PeopleGalleryPage = ({ data }) => {
  const frontmatter = data.markdownRemark.frontmatter
  return <PeopleGalleryTemplate content={frontmatter} />
}

PeopleGalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
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
        featuredImages {
          order
          title
          subtitle
          alt
          cropPosition
          src {
            childImageSharp {
              gatsbyImageData(width: 560 quality: 82 placeholder: BLURRED layout: CONSTRAINED)
            }
          }
        }
        galleryImages {
          title
          subtitle
          alt
          cropPosition
          src {
            childImageSharp {
              gatsbyImageData(width: 560 quality: 82 placeholder: BLURRED layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
