import React from "react"
import PropTypes from "prop-types"
import { WorkPageTemplate } from "../../pages/work"

const readImageUrl = (value, getAsset) => {
  if (!value) return ""
  if (typeof value === "string") {
    const asset = getAsset ? getAsset(value) : null
    if (!asset) return value
    if (typeof asset === "string") return asset
    if (typeof asset?.toString === "function") return asset.toString()
    return value
  }
  if (typeof value?.toString === "function") {
    return value.toString()
  }
  return ""
}

const WorkPagePreview = ({ entry, getAsset }) => {
  const entryData =
    entry.getIn(["data"]) || entry.getIn(["data", "frontmatter"]) || null
  const data = (entryData && entryData.toJS && entryData.toJS()) || entryData || {}

  const featuredVideos = (data.featuredVideos || []).map(item => ({
    ...item,
    thumbnail: readImageUrl(item.thumbnail, getAsset),
  }))

  // Hand over everything the entry holds, then correct the pieces that need
  // it. Listing the fields instead is how the Spotify players came to be
  // missing from the preview: a field added to the page but not to the list
  // is invisible here however correctly it is filled in, and nothing says so.
  return (
    <WorkPageTemplate
      content={{
        ...data,
        hero: data.hero || {},
        featuredVideos,
      }}
    />
  )
}

WorkPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default WorkPagePreview
