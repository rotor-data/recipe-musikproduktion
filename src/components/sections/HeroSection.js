import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import MarkdownRenderer from "../MarkdownRenderer"

const HeroSection = ({ section = {} }) => {
  const heroImage = getImage(section.image)

  return (
    <section className="rec-start-hero">
      {heroImage && (
        <div className="rec-start-hero__media">
          <GatsbyImage
            image={heroImage}
            alt=""
            style={{ width: "100%", height: "100%" }}
            imgStyle={{ objectFit: "cover" }}
          />
        </div>
      )}

      <div className="rec-start-hero__overlay rec-shell">
        <div className="rec-start-hero__content">
          {section.title && (
            <div className="rec-start-hero__title">
              <MarkdownRenderer markdown={section.title} />
            </div>
          )}
          {(section.description || section.h1title) && (
            <div className="rec-start-hero__details">
              {section.description && (
                <div className="rec-start-hero__body">
                  <MarkdownRenderer markdown={section.description} />
                </div>
              )}
              {section.h1title && (
                <div className="rec-start-hero__h1-wrap">
                  <span className="rec-start-hero__h1-line" aria-hidden="true" />
                  <h1 className="rec-start-hero__h1-small">{section.h1title}</h1>
                </div>
              )}
            </div>
          )}
          <div className="rec-start-hero__actions">
            <a href={section.primaryHref || "/contact"} className="rec-button rec-button--primary">
              {section.primaryText || "Contact"}
            </a>
            <a href={section.secondaryHref || "/work"} className="rec-button rec-button--ghost">
              {section.secondaryText || "View work"}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

HeroSection.propTypes = { section: PropTypes.object }

export default HeroSection
