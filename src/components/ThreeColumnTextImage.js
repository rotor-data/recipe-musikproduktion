// src/components/ThreeColumnTextImage.js
import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import MarkdownRenderer from './MarkdownRenderer'

const ThreeColumnTextImage = ({ title, text, image }) => {
  const img = getImage(image)

  return (
    <section className="section has-background-white">
      <div className="container">
        <div className="columns is-variable is-8 is-multiline">
          <div className="column is-full-mobile is-one-third-desktop">
            <h2 className="title is-5 has-text-success has-text-weight-semibold">{title}</h2>
          </div>
          {/* Desktop version: text and image columns */}
          <div className="column is-hidden-mobile is-one-third">
            <MarkdownRenderer markdown={text} textClass="content" />
          </div>
          <div className="column is-hidden-mobile is-one-third">
            {img && <GatsbyImage image={img} alt={image.alt || ''} className="is-rounded" />}
          </div>
          {/* Mobile version: full-width text and image stacked */}
          <div className="column is-full is-hidden-tablet">
            {img && <GatsbyImage image={img} alt={image.alt || ''} className="is-rounded" />}
          </div>
          <div className="column is-full is-hidden-tablet">
            <MarkdownRenderer markdown={text} textClass="content" />
          </div>
          
        </div>
      </div>
    </section>
  )
}

ThreeColumnTextImage.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired, // GatsbyImageData with optional alt
}

export default ThreeColumnTextImage
