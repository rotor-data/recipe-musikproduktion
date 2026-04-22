import React from "react"
import PropTypes from "prop-types"
import { IndexPageTemplate } from "../../templates/index-page"
import bbcLogo from "../../img/logo-gallery/BBC_Logo_2021.png"
import eurobankLogo from "../../img/logo-gallery/Eurobank_logo_2021.svg.png"
import foxLogo from "../../img/logo-gallery/FOX_wordmark.svg.png"
import microsoftLogo from "../../img/logo-gallery/Microsoft_logo_(2012).svg.png"
import svtLogo from "../../img/logo-gallery/SVT_Logotyp_RGB_neg.png"
import tlcLogo from "../../img/logo-gallery/TLC_Logo.svg.png"
import tv4Logo from "../../img/logo-gallery/TV4sweden_logo.svg.png"
import viaplayLogo from "../../img/logo-gallery/VPLAY-B.ST.png"
import espnLogo from "../../img/logo-gallery/espn-png-logo-4142.png"

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

const previewFallbackLogos = [
  { id: "bbc", image: bbcLogo, alt: "BBC logo", href: "" },
  { id: "eurobank", image: eurobankLogo, alt: "Eurobank logo", href: "" },
  { id: "fox", image: foxLogo, alt: "FOX logo", href: "" },
  { id: "microsoft", image: microsoftLogo, alt: "Microsoft logo", href: "" },
  { id: "svt", image: svtLogo, alt: "SVT logo", href: "" },
  { id: "tlc", image: tlcLogo, alt: "TLC logo", href: "" },
  { id: "tv4", image: tv4Logo, alt: "TV4 logo", href: "" },
  { id: "viaplay", image: viaplayLogo, alt: "Viaplay logo", href: "" },
  { id: "espn", image: espnLogo, alt: "ESPN logo", href: "" },
]

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
      fallbackLogos={previewFallbackLogos}
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
