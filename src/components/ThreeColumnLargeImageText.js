import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import MarkdownRenderer from './MarkdownRenderer'

const ThreeColumnLargeImageText = ({ title, text, image }) => {
  const img = getImage(image)

  return (
    <section id={title} className="section has-background-white">
      <div className="container">
        <div className="columns is-variable is-8 is-multiline">
          {/* Image spans two columns on desktop */}
          <div className="column is-two-thirds-desktop is-full-mobile">
            {img && (
              <GatsbyImage
                image={img}
                alt={image.alt || ''}
                className="is-rounded"
              />
            )}
          </div>

          {/* Text in the third column */}
          <div className="column is-one-third-desktop is-full-mobile">
            <h2 className="title is-5 has-text-success has-text-weight-semibold">
              {title}
            </h2>
            <MarkdownRenderer markdown={text} textClass="content mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}

ThreeColumnLargeImageText.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired, // expects GatsbyImageData with optional alt
}

export default ThreeColumnLargeImageText
