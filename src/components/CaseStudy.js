import React from "react"
import PropTypes from "prop-types"

const CaseStudy = ({ caseData }) => {
  return (
    <section className="case-study">
      <h2>{caseData.title}</h2>
      <ul>
        {caseData.results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      <a href="#contact" className="cta-button">{caseData.ctaText}</a>
    </section>
  )
}

CaseStudy.propTypes = {
  caseData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(PropTypes.string).isRequired,
    ctaText: PropTypes.string.isRequired
  }).isRequired
}

export default CaseStudy
