import React from "react"
import PropTypes from "prop-types"
import { IndexPageTemplate } from "../../templates/index-page"

// In the editor an image is a path the CMS can resolve to a local blob; the
// built site hands the template a processed File node instead.
const toPreviewImage = (image, getAsset) => {
  if (!image || typeof image !== "string" || !getAsset) return image
  const asset = getAsset(image)
  if (!asset) return image
  return typeof asset === "string" ? asset : asset.toString()
}

const IndexPagePreview = ({ entry, getAsset }) => {
  const entryData = entry.getIn(["data"])
  const data = (entryData && entryData.toJS && entryData.toJS()) || entryData || {}

  const sections = (data.sections || []).map(section => ({
    ...section,
    image: toPreviewImage(section.image, getAsset),
    logos: (section.logos || []).map(logo => ({
      ...logo,
      image: toPreviewImage(logo.image, getAsset),
    })),
    cards: (section.cards || []).map(card => ({
      ...card,
      image: toPreviewImage(card.image, getAsset),
    })),
  }))

  return (
    <IndexPageTemplate content={{ sections }} />
  )
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({ getIn: PropTypes.func }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
