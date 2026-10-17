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
    <IndexPageTemplate content={{ sections }} fallbackLogos={previewFallbackLogos} />
  )
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({ getIn: PropTypes.func }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
