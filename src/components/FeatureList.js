import React from "react"
import PropTypes from "prop-types"

const FeatureList = ({ features }) => {
  return (
    <section className="feature-list">
      {features.map((feature, index) => (
        <div key={index} className="feature">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  )
}

FeatureList.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired
}

export default FeatureList
