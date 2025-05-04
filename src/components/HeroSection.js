import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import MarkdownRenderer from "./MarkdownRenderer"
import LogoBanner from "./LogoBanner"
import CtaModal from "./CtaModal"

const HeroSection = ({ h1title, title, description, ctaText, image }) => {
  const heroImage = getImage(image)

  return (
    <section className="hero hero-image-grid">
      <div style={{ display: "grid", position: "relative" }}>
        {/* Bakgrundsbild via GatsbyImage */}
        {heroImage && (
          <GatsbyImage
            image={heroImage}
            alt=""
            style={{ gridArea: "1/1" }}
            layout="fullWidth"
            aspectRatio={3 / 1}
            formats={["auto", "webp", "avif"]}
          />
        )}

        {/* Overlay med innehåll */}
        <div
          style={{
            gridArea: "1/1",
            position: "relative",
            display: "grid",
            placeItems: "center",
            padding: "4rem 1rem",
            background: "rgba(0,0,0,0.5)", // mörk overlay
          }}
        >
          <div className="container has-text-centered has-text-white">
            <h1 className="pre-headline is-family-accent has-text-white mb-3">
              {h1title}
            </h1>
            <p className="title is-extralarge has-text-white">
              <MarkdownRenderer markdown={title} inline={true} />
            </p>
            <p className="subtitle has-text-white mt-3">
              <MarkdownRenderer markdown={description} />
            </p>
            <div className="mt-6 mb-3">
              <CtaModal buttonText={ctaText} headline="Vill du prata med oss?" />
            </div>
       
          </div>
          <div className="container">
            <LogoBanner />
          </div>
        </div>
       
      </div>

      {/* Eventuella element efter bilden */}
      <div className="mt-5">
     
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  h1title: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default HeroSection
