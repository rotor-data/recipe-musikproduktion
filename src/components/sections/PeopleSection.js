import React from "react"
import PropTypes from "prop-types"
import PreviewCompatibleImage from "../PreviewCompatibleImage"
import { cropPositionToObjectPosition } from "../../lib/imageCrop"

const PeopleSection = ({ section = {}, teasers = [] }) => {
  const left = section.highlightPosition === "left"
  const headClass = left
    ? "rec-section__head rec-section__head--left"
    : "rec-section__head rec-section__head--right"
  const actionsClass = left
    ? "rec-section__actions rec-section__actions--left"
    : "rec-section__actions rec-section__actions--right"

  return (
    <section className="rec-section rec-shell rec-section--people">
      <div className={headClass}>
        <h2 className="rec-section__title">
          {section.pretitle || "People"}:
          <br />
          {section.title || "The studio"}
        </h2>
        {section.body && <p className="rec-section__lead">{section.body}</p>}
        <div className={actionsClass}>
          <a href={section.ctaLink || "/people"} className="rec-button rec-button--ghost">
            {section.ctaText || "Open gallery"}
          </a>
          <a
            href={section.secondaryCtaLink || "/contact"}
            className="rec-button rec-button--ghost"
          >
            {section.secondaryCtaText || "Start a project"}
          </a>
        </div>
      </div>
      {teasers.length > 0 && (
        <div className="rec-people-strip">
          {teasers.map((item, index) => {
            if (!item?.image) return null

            return (
              <a
                href="/people"
                className="rec-people-strip__item"
                key={`${item.alt || "people"}-${index}`}
                aria-label={`Open people gallery: ${item.alt || "image"}`}
              >
                <PreviewCompatibleImage
                  imageInfo={{
                    image: item.image,
                    alt: item.alt || "People teaser",
                    imageStyle: { width: "100%", height: "100%" },
                    imgStyle: {
                      objectFit: "cover",
                      objectPosition: cropPositionToObjectPosition(item.cropPosition),
                    },
                  }}
                />
              </a>
            )
          })}
        </div>
      )}
    </section>
  )
}

PeopleSection.propTypes = { section: PropTypes.object, teasers: PropTypes.array }

export default PeopleSection
