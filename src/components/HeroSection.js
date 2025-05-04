import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import MarkdownRenderer from "./MarkdownRenderer"
import RotorCTA from "./RotorCTA"
import LogoBanner from "./LogoBanner"
import CtaModal from "./CtaModal"

const HeroSection = ({ h1title, title, description, ctaText, image }) => {
  const heroImage = getImage(image)

  return (
    <section className="hero is-medium has-background-gradient-success">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered is-multiline is-variable is-8">
            <div className="column is-6">
              <h1 className="pre-headline is-family-accent has-text-weight-regular has-tight-height has-text-white mb-3">{h1title}</h1>
              <p className="title is-extralarge has-text-white">
                <MarkdownRenderer markdown={title} inline={true}/>
              </p>
                <p className="is-family-primary has-text-weight-bold has-text-white">
                  <MarkdownRenderer customClass="subtitle has-text-white mt-3" markdown={description}/>
                </p>
             <div className="mt-6 mb-3">
              <CtaModal buttonText={ctaText} headline="Vill du prata med oss?" />
             </div>
            </div>
            <div className="column is-6 hero-image">
              {heroImage && (
                <GatsbyImage
                image={heroImage}
                alt={title}
                style={{ width: "100%", height: "100%" }}
                imgStyle={{ objectFit: "contain" }}
              
              />
              )}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <LogoBanner/>
        </div>
      </div>

    </section>
  )
}

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  image: PropTypes.object
}

export default HeroSection
