import React from "react"
import PropTypes from "prop-types"
import MarkdownRenderer from "../MarkdownRenderer"
import PreviewCompatibleImage from "../PreviewCompatibleImage"
import { cropPositionToObjectPosition } from "../../lib/imageCrop"

const ServicesSection = ({ section = {} }) => {
  const headClass =
    section.highlightPosition === "left"
      ? "rec-section__head rec-section__head--left"
      : "rec-section__head rec-section__head--right"

  const cards = (section.cards || []).filter(
    card => card?.title || card?.description || card?.image
  )

  return (
    <section className="rec-section rec-shell rec-section--studio">
      <div className={headClass}>
        <h2 className="rec-section__title">
          {section.pretitle || "Studio"}:
          <br />
          {section.title || "Sound with direction"}
        </h2>
        {section.body && <p className="rec-section__lead">{section.body}</p>}
      </div>
      <div className="rec-service-grid">
        {cards.map((card, index) => (
          <article className="rec-service-card" key={`${card.title}-${index}`}>
            {card.image && (
              <div className="rec-service-card__image">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: card.image,
                    alt: card.title || "Service",
                    imageStyle: { width: "100%", height: "100%" },
                    imgStyle: {
                      objectFit: "cover",
                      objectPosition: cropPositionToObjectPosition(card.cropPosition),
                    },
                  }}
                />
              </div>
            )}
            {card.tagline && <p className="rec-service-card__tag">{card.tagline}</p>}
            {card.title && <h3 className="rec-service-card__title">{card.title}</h3>}
            {card.description && (
              <MarkdownRenderer
                markdown={card.description}
                textClassName="rec-service-card__body"
              />
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

ServicesSection.propTypes = { section: PropTypes.object }

export default ServicesSection
