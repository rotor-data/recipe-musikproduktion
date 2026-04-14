import React from "react"
import PropTypes from "prop-types"

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

const PeopleGalleryPreview = ({ entry, getAsset }) => {
  const entryData =
    entry.getIn(["data"]) || entry.getIn(["data", "frontmatter"]) || null
  const data =
    (entryData && entryData.toJS && entryData.toJS()) ||
    entryData ||
    {}

  const hero = data.hero || {}
  const cta = data.cta || {}
  const seen = new Set()
  const images = (data.galleryImages || [])
    .filter(item => item?.src)
    .filter(item => {
      const key = typeof item.src === "string" ? item.src : item?.src?.toString?.()
      if (!key || seen.has(key)) return false
      seen.add(key)
      return true
    })
    .map(item => ({
      src: readImageUrl(item.src, getAsset),
      alt: item.alt || item.title || "Gallery image",
      title: item.title || "",
      subtitle: item.subtitle || "",
    }))

  return (
    <section
      style={{
        background: "#0e0e0e",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {hero.kicker && (
          <p style={{ color: "#c29c38", textTransform: "uppercase", letterSpacing: "0.2em" }}>
            {hero.kicker}
          </p>
        )}
        <h1
          style={{
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.08rem",
            marginBottom: "1rem",
          }}
        >
          {hero.pageTitle || "People"}
        </h1>
        {hero.lead && (
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "1rem", fontSize: "0.9rem" }}>
            {hero.lead}
          </p>
        )}
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
        {(cta.title || cta.linkText) && (
          <div style={{ marginTop: "1rem", border: "1px solid rgba(194,156,56,.3)", padding: "1rem", textAlign: "center" }}>
            {cta.title && <p style={{ color: "#fff", marginBottom: ".4rem" }}>{cta.title}</p>}
            {cta.linkText && <p style={{ color: "#c29c38", margin: 0 }}>{cta.linkText}</p>}
          </div>
        )}
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
