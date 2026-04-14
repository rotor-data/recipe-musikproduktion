import React from "react"
import PropTypes from "prop-types"
import { IndexPageTemplate } from "../../templates/index-page"

const transformImage = (image, getAsset) => {
  if (!image) {
    return null
  }
  if (typeof image === "string") {
    if (!getAsset) return image
    const asset = getAsset(image)
    if (!asset) return image
    if (typeof asset === "string") return asset
    if (typeof asset?.toString === "function") return asset.toString()
    return image
  }
  if (image.childImageSharp && getAsset) {
    const asset = getAsset(image.childImageSharp?.gatsbyImageData?.images?.fallback?.src)
    if (asset) {
      if (typeof asset === "string") return asset
      if (typeof asset?.toString === "function") return asset.toString()
      return asset
    }
  }
  return image
}

const IndexPagePreview = ({ entry, getAsset }) => {
  const entryData =
    entry.getIn(["data"]) || entry.getIn(["data", "frontmatter"]) || null
  const data =
    (entryData && entryData.toJS && entryData.toJS()) ||
    entryData ||
    {}

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

  const logoBanner = {
    label: data.logoBanner?.label,
    logos: (data.logoBanner?.logos || []).map(item => ({
      ...item,
      image: transformImage(item.image, getAsset),
    })),
  }

  return (
    <IndexPageTemplate
      disableYoutubeFetch
      content={{
        hero: {
          title: data.hero?.title,
          h1title: data.hero?.h1title,
          description: data.hero?.description,
          cta: {
            buttonText: data.hero?.cta?.buttonText,
            primaryText: data.hero?.cta?.primaryText,
            primaryHref: data.hero?.cta?.primaryHref,
            secondaryText: data.hero?.cta?.secondaryText,
            secondaryHref: data.hero?.cta?.secondaryHref,
          },
          image: heroImage,
        },
        logoBanner,
        pageCopy: {
          bottomCta: data.pageCopy?.bottomCta,
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
