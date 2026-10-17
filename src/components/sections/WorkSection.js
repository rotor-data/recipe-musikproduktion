import React from "react"
import PropTypes from "prop-types"
import PreviewCompatibleImage from "../PreviewCompatibleImage"
import { cropPositionToObjectPosition } from "../../lib/imageCrop"

const WorkSection = ({ section = {}, items = [], onPlay }) => {
  const headClass =
    section.highlightPosition === "right"
      ? "rec-section__head rec-section__head--split rec-section__head--right"
      : "rec-section__head rec-section__head--split rec-section__head--left"

  return (
    <section className="rec-section rec-shell">
      <div className={headClass}>
        <h2 className="rec-section__title">
          {section.pretitle || "Work"}:
          <br />
          {section.title || "Selected projects"}
        </h2>
        <a href={section.ctaLink || "/work"} className="rec-link-inline">
          {section.ctaText || "View all work"}
        </a>
      </div>
      <div className="rec-work-preview-grid">
        {items.map((item, index) => {
          const Card = item.videoId ? "button" : "a"
          const cardProps = item.videoId
            ? {
                type: "button",
                onClick: () => onPlay && onPlay(item),
                "aria-label": `Play ${item.title || "video"}`,
              }
            : {
                href: item.link || "/work",
                target: item.external ? "_blank" : undefined,
                rel: item.external ? "noreferrer" : undefined,
              }

          return (
            <Card key={`${item.id}-${index}`} className="rec-work-preview-card" {...cardProps}>
              <div className="rec-work-preview-card__media">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title || "Project"}
                    style={{
                      objectPosition: cropPositionToObjectPosition(item.cropPosition),
                    }}
                  />
                ) : (
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: item.image,
                      alt: item.title || "Project",
                      imageStyle: { width: "100%", height: "100%" },
                      imgStyle: {
                        objectFit: "cover",
                        objectPosition: cropPositionToObjectPosition(item.cropPosition),
                      },
                    }}
                  />
                )}
              </div>
              <div className="rec-work-preview-card__meta">
                <p>{item.title}</p>
                {item.subtitle && <span>{item.subtitle}</span>}
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

WorkSection.propTypes = {
  section: PropTypes.object,
  items: PropTypes.array,
  onPlay: PropTypes.func,
}

export default WorkSection
