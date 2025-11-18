import React from "react"
import PropTypes from "prop-types"
import IndexPageTemplate from "../../templates/index-page"

const transformImage = (image, getAsset) => {
  if (!image) {
    return null
  }
  if (typeof image === "string") {
    return image
  }
  if (image.childImageSharp && getAsset) {
    const asset = getAsset(image.childImageSharp?.gatsbyImageData?.images?.fallback?.src)
    if (asset) {
      return asset
    }
  }
  return image
}

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS()

  const heroImage = transformImage(data.hero?.image, getAsset)

  const flowBlocks = (data.pageCopy?.flowBlocks || []).map(block => ({
    ...block,
    galleryItems: (block.galleryItems || []).map(item => ({
      ...item,
      image: transformImage(item.image, getAsset),
    })),
    cards: (block.cards || []).map(card => ({
      ...card,
      image: transformImage(card.image, getAsset),
    })),
  }))

  return (
    <IndexPageTemplate
      content={{
        hero: {
          title: data.hero?.title,
          h1title: data.hero?.h1title,
          description: data.hero?.description,
          cta: {
            buttonText: data.hero?.cta?.buttonText,
          },
          image: heroImage,
        },
        pageCopy: {
          flowBlocks,
        },
      }}
    />
  )
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
