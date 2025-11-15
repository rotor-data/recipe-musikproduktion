import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import MarkdownRenderer from './MarkdownRenderer'

const ThreeColumnLargeImageText = ({ title, text, image }) => {
  const img = getImage(image)

  return (
    <section className="section has-background-white">
      <div className="container">
        <div className="columns is-variable is-8 is-multiline">
          {/* Image comes first, takes one-third width on desktop */}
          <div className="column is-one-third-desktop is-full-mobile">
            {img && (
              <GatsbyImage
                image={img}
                alt={image.alt || ''}
                className="is-rounded"
              />
            )}
          </div>

          {/* Text comes second, takes two-thirds width on desktop */}
          <div className="column is-two-thirds-desktop is-full-mobile">
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
  image: PropTypes.object.isRequired,
}

export default ThreeColumnLargeImageText
