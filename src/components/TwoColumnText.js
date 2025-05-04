import React from "react"
import PropTypes from "prop-types"

const TwoColumnText = ({ title, columns }) => {
  return (
    <section className="two-column-text">
      <h2>{title}</h2>
      <div className="columns">
        {columns.map((col, index) => (
          <div key={index} className="column">
            <h3>{col.heading}</h3>
            <p>{col.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

TwoColumnText.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired
}

export default TwoColumnText
