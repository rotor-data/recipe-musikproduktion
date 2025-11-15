import React from "react"
import PropTypes from "prop-types"
import MarkdownRenderer from "./MarkdownRenderer"
import PreviewCompatibleImage from "./PreviewCompatibleImage"

const GalleryRow = ({ items }) => (
  <div className="flow-grid__gallery-row">
    {items.map(({ image, title, subtitle, bigText, link }, index) => {
      const imageUrl =
        (typeof image === "string" && image) ||
        image?.publicURL ||
        image?.childImageSharp?.gatsbyImageData?.images?.fallback?.src ||
        ""
      ;
      const CardContent = (
        <div
          className="flow-grid__gallery-card"
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
          }}
        >
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
      return link ? (
        <a
          key={`${title || bigText}-${index}`}
          href={link}
          target="_blank"
          rel="noreferrer"
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
  if (!cards?.length || !highlight) {
    return null
  }

  const { pretitle, title, titleHighlight, body, ctaText, ctaLink, megaHeadline } =
    highlight

  const cardsColumn = (
    <div className="column is-half-desktop">
      <div className="flow-grid__cards">
        {cards.map((card, index) => {
          const hasText = Boolean(card.tagline || card.title || card.description)
          const isFullWidth = card.fullWidth || index === cards.length - 1
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
                      alt: card.title || "Card image",
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
                  {card.linkLabel || "Läs mer"} <span className="ml-2">→</span>
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  const highlightColumn = (
  <div className="column is-half-desktop flow-grid__highlight-column">
      <div className="box highlight-panel has-text-centered-desktop has-text-left-mobile">
        {pretitle && <p className="highlight-panel__pretitle">{pretitle}</p>}
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
            <a href={ctaLink || "/kontakt"} className="has-text-link">
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

  return <div className="columns is-variable is-1">{columns}</div>
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

  return (
    <section className="section py-5 flow-grid-wrapper">
      <div className="container is-fluid">
        <div className="flow-grid">
          {flowBlocks.map((block, index) => (
            <div
              key={`${block.highlight?.title || "block"}-${index}`}
              className="flow-grid__block"
            >
                         {block.highlight?.megaHeadline && (
                <div className="flow-grid__mega-divider mb-4" aria-hidden="true">
                  <div className="flow-grid__mega-divider__track">
                    {Array.from({ length: 4 }).map((_, copyIndex) => (
                      <span key={copyIndex}>
                        {`${block.highlight.megaHeadline} • `}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {block.showGallery && block.galleryItems?.length > 0 && (
                <GalleryRow items={block.galleryItems} />
              )}
   
              <GridBlock
                highlight={block.highlight}
                cards={block.cards}
                highlightPosition={block.highlightPosition}
              />
            </div>
          ))}
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
