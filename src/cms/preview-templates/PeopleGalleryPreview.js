import React from "react"
import PropTypes from "prop-types"

const readImageUrl = (value, getAsset) => {
  if (!value) return ""
  if (typeof value === "string") {
    const asset = getAsset ? getAsset(value) : null
    return asset || value
  }
  return value?.toString?.() || ""
}

const PeopleGalleryPreview = ({ entry, getAsset }) => {
  const blocks = entry.getIn(["data", "galleryBlocks"])?.toJS?.() || []

  const images = blocks.flatMap(block => {
    const highlightImage = block?.highlight?.src
      ? [{
          src: readImageUrl(block.highlight.src, getAsset),
          alt: block.highlight?.alt || block.highlight?.title || "Gallery image",
          title: block.highlight?.title || "",
        }]
      : []

    const cardImages = (block?.cards || [])
      .filter(card => card?.src)
      .map(card => ({
        src: readImageUrl(card.src, getAsset),
        alt: card?.alt || card?.title || "Gallery image",
        title: card?.title || "",
      }))

    return [...highlightImage, ...cardImages]
  })

  return (
    <section
      style={{
        background: "linear-gradient(62deg, black, #c29c38)",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h1
          style={{
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.08rem",
            marginBottom: "1rem",
          }}
        >
          People
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "1rem", fontSize: "0.9rem" }}>
          CMS preview: images are shown in grayscale here to match the live page style.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "0.6rem",
          }}
        >
          {images.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              style={{
                border: "1px solid #fff",
                aspectRatio: "1 / 1",
                overflow: "hidden",
                background: "transparent",
              }}
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(100%)",
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

PeopleGalleryPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default PeopleGalleryPreview

