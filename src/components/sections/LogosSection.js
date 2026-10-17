import React from "react"
import PropTypes from "prop-types"

const LogosSection = ({ section = {}, fallbackLogos = [] }) => {
  const cmsLogos = (section.logos || [])
    .map((item, index) => ({
      id: item?.alt || `cms-logo-${index}`,
      // the CMS preview hands us a blob URL string, the build a File node
      image:
        typeof item?.image === "string" ? item.image : item?.image?.publicURL || "",
      alt: item?.alt || "Partner logo",
      href: item?.href || "",
    }))
    .filter(item => item.image)

  const logoItems = cmsLogos.length ? cmsLogos : fallbackLogos
  if (!logoItems.length) return null

  return (
    <section className="rec-logo-banner">
      <div className="rec-shell rec-logo-banner__inner">
        <p className="rec-logo-banner__label">{section.label || "Industry partners"}</p>
        <div className="rec-logo-banner__row">
          {logoItems.map((item, index) => {
            const imageEl = (
              <img
                src={item.image}
                alt={item.alt || "Partner logo"}
                className="rec-logo-banner__image"
                loading="lazy"
              />
            )

            if (item.href) {
              return (
                <a
                  href={item.href}
                  className="rec-logo-banner__item"
                  key={`${item.id || item.alt}-${index}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {imageEl}
                </a>
              )
            }

            return (
              <div className="rec-logo-banner__item" key={`${item.id || item.alt}-${index}`}>
                {imageEl}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

LogosSection.propTypes = { section: PropTypes.object, fallbackLogos: PropTypes.array }

export default LogosSection
