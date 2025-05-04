// src/components/Featured.js

import React, { useEffect, useRef, useState } from "react"
import MarkdownRenderer from "./MarkdownRenderer"
import PreviewCompatibleImage from "./PreviewCompatibleImage"

const Featured = ({ title, subtitle, text, buttonText, link, image, preTitle }) => {
  const containerRef = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section">
      <div className="container">
        <div
          ref={containerRef}
          className={`grid is-col-min-15 is-overlapping-left-compensated ${isVisible ? "fade-in" : "fade-init"}`}
          style={{
            position: "relative",
            alignItems: "center",
          }}
        >
          {/* Image first */}
          <div className="cell is-col-7-desktop is-col-12-tablet mx-auto">
            <div className="featured-image">
              <PreviewCompatibleImage imageInfo={{ image: image, alt: title }} />
            </div>
          </div>

          {/* Text second */}
          <div
            className="cell is-col-5-desktop is-col-12-tablet is-overlapping-left mx-auto"
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth:500,
            }}
          >
            <div
              className="box has-text-centered has-background-white"
              style={{
                padding: "2rem",
                borderRadius: 0,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >  
              <p className="is-family-primary is-uppercase has-wide-spacing mb-2">{preTitle}</p>
              {/* Title */}
              <h2 className="title is-5 has-text-link mb-3">
                {title}
              </h2>

              {/* Subtitle */}
              {subtitle && (
                <p className="subtitle is-family-primary is-6 has-text-weight-bold mb-4">
                  {subtitle}
                </p>
              )}

              {/* Text */}
              <div className="content is-size-7 is-medium mb-5">
                <MarkdownRenderer markdown={text} />
              </div>

              {/* Button */}
              {link && buttonText && (
                <div className="buttons is-centered">
                  <a
                    href={link}
                    className="button is-link is-medium is-outlined"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {buttonText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Featured
