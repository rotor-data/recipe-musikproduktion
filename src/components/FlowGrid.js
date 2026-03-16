import React from "react"
import PropTypes from "prop-types"
import MarkdownRenderer from "./MarkdownRenderer"
import PreviewCompatibleImage from "./PreviewCompatibleImage"

const GalleryRow = ({ items }) => {
  const cleanItems = (items || []).filter(item => item?.image)
  if (!cleanItems.length) {
    return null
  }

  return (
  <div className="flow-grid__gallery-row">
    {cleanItems.map(({ image, title, subtitle, bigText, link }, index) => {
   
      const CardContent = (
        <div className="flow-grid__gallery-card flow-grid__gallery-card--image">
          {image && (
            <div className="flow-grid__gallery-card-image">
              <PreviewCompatibleImage
                imageInfo={{
                  image: image,
                  alt: title || subtitle || bigText || "Gallery image",
                }}
              />
            </div>
          )}
          <div className="flow-grid__gallery-card-body">
            {bigText && (
              <span className="flow-grid__gallery-card-big has-text-weight-bold is-size-2 has-tight-spacing">
                {bigText}
              </span>
            )}
            {title && (
              <p className="flow-grid__gallery-card-title has-text-weight-bold">
                {title}
              </p>
            )}
            {subtitle && (
              <p className="flow-grid__gallery-card-subtitle">{subtitle}</p>
            )}
          </div>
          {link && (
            <span className="flow-grid__gallery-card-arrow">↗</span>
          )}
        </div>
      )
      const isExternal = Boolean(link && /^https?:\/\//i.test(link))

      return link ? (
        <a
          key={`${title || bigText}-${index}`}
          href={link}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="flow-grid__gallery-card-wrapper flow-grid__gallery-card-link"
        >
          {CardContent}
        </a>
      ) : (
        <div key={`${title || bigText}-${index}`}>{CardContent}</div>
      )
    })}
  </div>
  )
}

GalleryRow.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          publicURL: PropTypes.string,
        }),
      ]),
      title: PropTypes.string,
      subtitle: PropTypes.string,
      bigText: PropTypes.string,
      link: PropTypes.string,
    })
  ),
}

GalleryRow.defaultProps = {
  items: [],
}

const GridBlock = ({ highlight, cards, highlightPosition = "right" }) => {
  const cleanCards = (cards || []).filter(
    card => card?.image || card?.title || card?.description || card?.tagline
  )

  if (!cleanCards.length || !highlight) {
    return null
  }

  const { pretitle, title, body, ctaText, ctaLink } = highlight

  const cardsColumn = (
    <div className="column is-half-desktop is-full-mobile is-full-touch">
      <div className="flow-grid__cards">
        {cleanCards.map((card, index) => {
          const hasText = Boolean(card.tagline || card.title || card.description)
          const isFullWidth = Boolean(card.fullWidth)
          const cardClassNames = [
            "box",
            "mb-0",
            "flow-grid__card",
            isFullWidth ? "flow-grid__card--full" : "",
            card.image && !hasText ? "flow-grid__card--image-only" : "",
          ]
            .filter(Boolean)
            .join(" ")

          return (
            <div key={index} className={cardClassNames}>
          {card.image && (
            <div className="flow-grid__card-image">
              <PreviewCompatibleImage
                imageInfo={{
                  image: card.image,
                  alt: card.alt || card.title || "Card image",
                  imageStyle: hasText
                    ? undefined
                    : {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      },
                }}
              />
            </div>
          )}

              {hasText && (
                <div className="flow-grid__card-content">
                  {card.tagline && (
                    <p className="flow-grid__card-tagline">{card.tagline}</p>
                  )}
                  {card.title && (
                    <p className="flow-grid__card-title">{card.title}</p>
                  )}
                  {card.description && (
                    <MarkdownRenderer
                      markdown={card.description}
                      textClassName="flow-grid__card-body"
                    />
                  )}
                </div>
              )}

              {card.link && (
                <a href={card.link} className="flow-grid__card-link">
                  {card.linkLabel || "Read more"} <span className="ml-2">→</span>
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  const highlightColumn = (
    <div className="column is-half-desktop is-full-mobile is-full-touch flow-grid__highlight-column">
      <div className="box highlight-panel has-text-centered-desktop has-text-left-mobile">
        {pretitle && <p className="highlight-panel__pretitle has-text-black">{pretitle}</p>}
        {title && (
          <h2 className="megatitle highlight-title">
            <MarkdownRenderer markdown={title} inline />
          </h2>
        )}
        {body && (
          <MarkdownRenderer markdown={body} textClassName="highlight-body" />
        )}
        {ctaText && (
          <div className="highlight-panel__cta">
            <a href={ctaLink || "/contact"} className="has-text-link">
              {ctaText} <span>→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )

  const columns =
    highlightPosition === "left"
      ? [highlightColumn, cardsColumn]
      : [cardsColumn, highlightColumn]

  const columnOrder = 
     highlightPosition === "left"
       ? "highlight-is-left"
       : "highlight-is-right"

  return <div className={`columns is-mobile is-variable is-1 ${columnOrder}`}>{columns}</div>
}

GridBlock.propTypes = {
  highlight: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string,
    megaHeadline: PropTypes.string,
  }).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      tagline: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      fullWidth: PropTypes.bool,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      alt: PropTypes.string,
      link: PropTypes.string,
      linkLabel: PropTypes.string,
    })
  ),
  highlightPosition: PropTypes.oneOf(["left", "right"]),
}

GridBlock.defaultProps = {
  cards: [],
  highlightPosition: "right",
}

const FlowGrid = ({ flowBlocks }) => {
  if (!flowBlocks?.length) {
    return null
  }

  const anchorIds = ["om-oss", "cases", "people"]

  return (
    <section className="section py-5 flow-grid-wrapper">
      <div className="container is-fluid">
        <div className="flow-grid">
          {flowBlocks.map((block, index) => {
            const anchorId = anchorIds[index]

            return (
              <div
                key={`${block.highlight?.title || "block"}-${index}`}
                className={`flow-grid__block`}
                id={anchorId}
              >
                {block.showGallery && block.galleryItems?.length > 0 && (
                  <GalleryRow items={block.galleryItems} />
                )}

                <GridBlock
                  highlight={block.highlight}
                  cards={block.cards}
                  highlightPosition={block.highlightPosition}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

FlowGrid.propTypes = {
  flowBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      highlight: PropTypes.object,
      cards: PropTypes.array,
      highlightPosition: PropTypes.oneOf(["left", "right"]),
      showGallery: PropTypes.bool,
      galleryItems: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
              publicURL: PropTypes.string,
              childImageSharp: PropTypes.shape({
                gatsbyImageData: PropTypes.object,
              }),
            }),
          ]),
          title: PropTypes.string,
          subtitle: PropTypes.string,
          bigText: PropTypes.string,
        })
      ),
    })
  ),
}

FlowGrid.defaultProps = {
  flowBlocks: [],
}

export default FlowGrid
