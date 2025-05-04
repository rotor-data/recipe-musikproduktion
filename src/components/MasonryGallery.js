import React from 'react'
import PropTypes from 'prop-types'
import { Masonry } from 'masonic'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const MasonryGallery = ({ photos }) => {
  const renderCard = ({ data, index }) => (
    <div className="card" key={index}>
      <div className="card-image has-background-light is-relative">
        <PreviewCompatibleImage imageInfo={{ image: data.src, alt: data.title || '' }} />
        {data.title && (
          <div className="has-text-white has-background-black-ter p-2 is-size-7 has-text-centered is-overlay is-clipped is-hidden-touch">
            {data.title}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <section className="section">
      <div className="container is-fluid">
        <Masonry
          items={photos}
          columnGutter={16}
          columnWidth={300}
          overscanBy={2}
          render={renderCard}
        />
      </div>
    </section>
  )
}

MasonryGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      title: PropTypes.string
    })
  ).isRequired
}

export default MasonryGallery
