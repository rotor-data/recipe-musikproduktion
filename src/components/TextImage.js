import React from "react"
import PropTypes from "prop-types"

const TextImage = ({ title, text, image, reverse }) => {
  return (
    <section className={`text-image ${reverse ? "reverse" : ""}`}>
      <div className="text">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="image">
        <img src={image} alt={title} />
      </div>
    </section>
  )
}

TextImage.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  reverse: PropTypes.bool
}

export default TextImage
