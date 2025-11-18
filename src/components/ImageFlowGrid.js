import React, { useState } from "react"
import PropTypes from "prop-types"
import PreviewCompatibleImage from "./PreviewCompatibleImage"

const ImageFlowGrid = ({ flowBlocks }) => {
  const [activeImageInfo, setActiveImageInfo] = useState(null)

  const handleImageActivation = imageInfo => event => {
    if (!imageInfo?.childImageSharp) {
      return
    }

    if (event.type === "keydown") {
      if (event.key !== "Enter" && event.key !== " ") {
        return
      }
    }

    event.preventDefault()
    setActiveImageInfo(imageInfo)
  }

  const closeActiveImage = () => setActiveImageInfo(null)

  if (!flowBlocks?.length) {
    return null
  }

  return (
    <>
      <section className="section py-5 image-flow-grid">
        <div className="container is-fluid">
          {flowBlocks.map((block, blockIndex) => {
            const highlightPosition =
              block.highlightPosition === "left" ? "left" : "right"
            const highlightImageThumb = block.highlightImage?.thumb
            const highlightImageModalChild =
              block.highlightImage?.full || highlightImageThumb
            const highlightImageAlt =
              block.highlightImage?.alt ||
              block.highlightImage?.title ||
              block.highlight?.title ||
              "Highlight image"
            const highlightActivationInfo = highlightImageModalChild
              ? {
                  childImageSharp: highlightImageModalChild,
                  alt: highlightImageAlt,
                  title: block.highlight?.title,
                }
              : null

            const highlightColumnElement = (
              <div className="column is-half-desktop">
                {highlightImageThumb && (
                  <div
                    className="image-flow-grid__highlight-image"
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${highlightImageAlt}`}
                    onClick={handleImageActivation(highlightActivationInfo)}
                    onKeyDown={handleImageActivation(highlightActivationInfo)}
                  >
                    <PreviewCompatibleImage
                      imageInfo={{
                        childImageSharp: highlightImageThumb,
                        alt: highlightImageAlt,
                        imageStyle: {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        },
                      }}
                    />
                    {(block.highlight?.title || block.highlight?.body) && (
                      <div className="image-flow-grid__highlight-overlay">
                        {block.highlight?.title && (
                          <span className="image-flow-grid__highlight-title">
                            {block.highlight.title}
                          </span>
                        )}
                        {block.highlight?.body && (
                          <span className="image-flow-grid__highlight-body">
                            {block.highlight.body}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )

            const cardsColumn = (
              <div className="column is-half-desktop">
                <div className="image-flow-grid__cards image-flow-grid__cards--three">
                  {(block.cards || []).map((card, index) => {
                    const cardThumb = card.thumb
                    if (!cardThumb) {
                      return null
                    }
                    const cardAlt = card.alt || card.title || "People image"
                    const cardModalChild = card.full || cardThumb
                    const cardActivationInfo = {
                      childImageSharp: cardModalChild,
                      alt: cardAlt,
                      title: card.title,
                    }

                    return (
                      <div
                        key={index}
                        className="image-flow-grid__card"
                        role="button"
                        tabIndex={0}
                        aria-label={`View ${cardAlt}`}
                        onClick={handleImageActivation(cardActivationInfo)}
                        onKeyDown={handleImageActivation(cardActivationInfo)}
                      >
                        <PreviewCompatibleImage
                          imageInfo={{
                            childImageSharp: cardThumb,
                            alt: cardAlt,
                            imageStyle: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            },
                          }}
                        />
                        {card.title && (
                          <div className="image-flow-grid__card-overlay">
                            {card.title}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )

            const columns =
              highlightPosition === "left"
                ? [highlightColumnElement, cardsColumn]
                : [cardsColumn, highlightColumnElement]

            return (
              <div
                key={`${block.highlight?.title || `block-${blockIndex}`}-${blockIndex}`}
                className="image-flow-grid__block mb-2"
              >
                <div className="columns is-variable is-1 is-vcentered">
                  {columns}
                </div>
              </div>
            )
          })}
        </div>
      </section>
      {activeImageInfo && (
        <div className="image-flow-grid__modal" onClick={closeActiveImage}>
          <div className="image-flow-grid__modal-content">
            <PreviewCompatibleImage
              imageInfo={{
                childImageSharp:
                  activeImageInfo.childImageSharp ||
                  activeImageInfo.full ||
                  activeImageInfo.thumb,
                alt: activeImageInfo.alt,
                imageStyle: {
                  width: "auto",
                  maxWidth: "95vw",
                  maxHeight: "calc(100vh - 4rem)",
                  objectFit: "contain",
                  borderRadius: "1rem",
                },
              }}
            />
            {activeImageInfo.title && (
              <p className="image-flow-grid__modal-title">
                {activeImageInfo.title}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

ImageFlowGrid.propTypes = {
  flowBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      highlight: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
      }),
      highlightImage: PropTypes.shape({
        thumb: PropTypes.object,
        full: PropTypes.object,
        title: PropTypes.string,
        alt: PropTypes.string,
      }),
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          thumb: PropTypes.object,
          full: PropTypes.object,
          title: PropTypes.string,
          alt: PropTypes.string,
        })
      ),
      highlightPosition: PropTypes.oneOf(["left", "right"]),
    })
  ),
}

ImageFlowGrid.defaultProps = {
  flowBlocks: [],
}

export default ImageFlowGrid
