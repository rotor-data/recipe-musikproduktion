import React from "react"
import PropTypes from "prop-types"

const CallToAction = ({ title, ctaText, url }) => {
  return (
    <section className="cta">
      <h2>{title}</h2>
      <a href={url} className="button is-primary is-medium mt-4">
        {ctaText}
      </a>
    </section>
  )
}

CallToAction.propTypes = {
  title: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default CallToAction
