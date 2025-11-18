import React from "react"
import PropTypes from "prop-types"

const renderImageUrl = (image, getAsset) => {
  if (!image) {
    return null
  }

  const asset = getAsset(image)
  if (asset && asset.toString) {
    return asset.toString()
  }

  return image
}

const PeopleGalleryPreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS()
  const blocks = data.galleryBlocks || []

  return (
    <div className="people-gallery-preview">
      {blocks.map((block, index) => (
        <div key={index} className="people-gallery-preview__block">
          <div className="people-gallery-preview__highlight">
            <div
              className="people-gallery-preview__image"
              style={{
                backgroundImage: `url(${renderImageUrl(block.highlight?.src, getAsset)})`,
              }}
            />
            <div className="people-gallery-preview__text">
              <strong>{block.highlight?.title}</strong>
              <p>{block.highlight?.body}</p>
            </div>
          </div>
          <div className="people-gallery-preview__cards">
            {block.cards?.map((card, cardIndex) => (
              <div key={cardIndex} className="people-gallery-preview__card">
                <div
                  className="people-gallery-preview__card-image"
                  style={{
                    backgroundImage: `url(${renderImageUrl(card.src, getAsset)})`,
                  }}
                />
                <p>{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

PeopleGalleryPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default PeopleGalleryPreview
