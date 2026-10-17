import React from "react"
import PropTypes from "prop-types"

const CtaSection = ({ section = {} }) => (
  <section className="rec-section rec-shell rec-section--cta">
    <h2>{section.title || "Ready to define your sound?"}</h2>
    <a
      href={section.buttonHref || "/contact"}
      className="rec-button rec-button--primary"
    >
      {section.buttonText || "Contact"}
    </a>
  </section>
)

CtaSection.propTypes = { section: PropTypes.object }

export default CtaSection
