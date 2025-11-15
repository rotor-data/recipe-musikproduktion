import React from "react"
import PropTypes from "prop-types"
import PreviewCompatibleImage from "./PreviewCompatibleImage"

const ImageFlowGrid = ({ flowBlocks }) => {
  if (!flowBlocks?.length) {
    return null
  }

  return (
    <section className="section py-5 image-flow-grid">
      <div className="container is-fluid">
        {flowBlocks.map((block, blockIndex) => {
          const highlightPosition =
            block.highlightPosition === "left" ? "left" : "right"

          const highlightColumnElement = (
            <div className="column is-half-desktop">
              {block.highlightImage && (
                <div className="image-flow-grid__highlight-image">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: block.highlightImage.image,
                      alt:
                        block.highlightImage.alt ||
                        block.highlightImage.title ||
                        block.highlight.title ||
                        "Highlight image",
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
                {block.cards.map((card, index) => (
                  <div key={index} className="image-flow-grid__card">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: card.image,
                        alt: card.alt || card.title || "People image",
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
                ))}
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
              className="image-flow-grid__block mb-6"
            >
              <div className="columns is-variable is-1 is-vcentered">
                {columns}
              </div>
            </div>
          )
        })}
      </div>
    </section>
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
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
          .isRequired,
        title: PropTypes.string,
        alt: PropTypes.string,
      }),
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
            .isRequired,
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
