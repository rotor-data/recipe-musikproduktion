import * as React from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"

const PreviewCompatibleImage = ({ imageInfo }) => {
  const {
    alt = "",
    childImageSharp,
    image,
    imageStyle = {},
    imgStyle = {},
    className,
  } = imageInfo

  if (image && image.childImageSharp) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={imageStyle}
        imgStyle={imgStyle}
        alt={alt}
        className={className}
      />
    )
  } else if (childImageSharp) {
    return (
      <GatsbyImage
        image={childImageSharp.gatsbyImageData}
        style={imageStyle}
        imgStyle={imgStyle}
        alt={alt}
        className={className}
      />
    )
    // for Netlify CMS
  } else if (image) {
    return (
      <img
        style={{ ...imageStyle, ...imgStyle }}
        src={image}
        alt={alt}
        className={className}
      />
    )
  } else {
    return null
  }
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    imageStyle: PropTypes.object,
    imgStyle: PropTypes.object,
    className: PropTypes.string,
  }).isRequired,
}

export default PreviewCompatibleImage
