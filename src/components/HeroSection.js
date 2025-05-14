import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import MarkdownRenderer from "./MarkdownRenderer"
import LogoBanner from "./LogoBanner"
import CtaModal from "./CtaModal"

const HeroSection = ({ h1title, title, description, ctaText, image }) => {
  const heroImage = getImage(image)

  return (
    <section className="section p-0">
      <div style={{ display: "grid", minHeight: "80vh" }}>
        {/* Faux background image */}
        {heroImage && (
          <GatsbyImage
            image={heroImage}
            alt=""
            style={{
              gridArea: "1/1",
              height: "100%",
              width: "100%"
            }}
            imgStyle={{ objectFit: "cover" }}
            loading="eager"
            formats={["auto", "webp", "avif"]}
          />
        )}

        {/* Foreground content */}
        <div
          style={{
            gridArea: "1/1",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.4)",
            padding: "4rem 1.5rem",
            color: "white",
            maxWidth:"100vw"
          }}
        >
          <div className="container" style={{ maxWidth:"1200px", width: "100%" }}>
            <div className="columns is-centered">
              <div className="column is-12 has-text-centered-mobile has-text-left-desktop">
                <h1 className="is-size-6-desktop is-size-7-touch has-text-white mb-3 is-uppercase">{h1title}</h1>
                <p className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile has-text-white mb-4">
                  <MarkdownRenderer markdown={title} inline={true} />
                </p>
                {description && (
                  <p className="mt-4 is-size-6 has-text-white">
                    <MarkdownRenderer markdown={description} />
                  </p>
                )}
                <div className="mt-5 mb-5">
                  <CtaModal buttonText={ctaText} headline="Vill du prata med oss?" />
                </div>
                <LogoBanner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  h1title: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  ctaText: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired
}

export default HeroSection
