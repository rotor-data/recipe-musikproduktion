import React from "react"
import PropTypes from "prop-types"
import { PeopleGalleryPageTemplate } from "../../templates/people-gallery"

const transformImage = (image, getAsset) => {
  if (!image) {
    return null
  }

  if (typeof image === "string") {
    return image
  }

  if (getAsset) {
    const asset = getAsset(image)
    if (asset) {
      return asset
    }
  }

  return image
}

const PeopleGalleryPreview = ({ entry, getAsset }) => {
  const entryData =
    entry.getIn(["data"]) || entry.getIn(["data", "frontmatter"]) || null
  const data =
    (entryData && entryData.toJS && entryData.toJS()) ||
    entryData ||
    {}
  const blocks = data.galleryBlocks || []

  const flowBlocks = blocks.map((block, index) => {
    const highlightImageUrl = transformImage(block.highlight?.src, getAsset)
    return {
      highlight: {
        title: block.highlight?.title,
        body: block.highlight?.body,
      },
      highlightImage: highlightImageUrl
        ? {
            thumb: highlightImageUrl,
            full: highlightImageUrl,
            title: block.highlight?.title,
            alt: block.highlight?.alt,
          }
        : null,
      cards:
        (block.cards || []).map(card => {
          const cardImageUrl = transformImage(card.src, getAsset)
          return {
            thumb: cardImageUrl,
            full: cardImageUrl,
            title: card.title,
            alt: card.alt,
          }
        }) || [],
      highlightPosition: block.highlightPosition || (index % 2 === 0 ? "right" : "left"),
    }
  })

  return <PeopleGalleryPageTemplate flowBlocks={flowBlocks} />
}

PeopleGalleryPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default PeopleGalleryPreview
