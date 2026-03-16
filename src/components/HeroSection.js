import React, { useRef } from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { motion, useScroll, useTransform } from "framer-motion"
import MarkdownRenderer from "./MarkdownRenderer"
import LogoBanner from "./LogoBanner"

const HeroSection = ({ h1title, title, image, showLogoBanner = true }) => {
  const heroImage = getImage(image)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section className="section p-0" ref={sectionRef}>
      <div className="hero-shell">
        {heroImage && (
          <motion.div
            style={{
              y: backgroundY,
              position: "absolute",
              top: 0,
              left: 0,
              height: "120%",
              width: "100%",
              zIndex: 0,
            }}
          >
            <GatsbyImage
              image={heroImage}
              alt=""
              style={{ height: "100%", width: "100%" }}
              imgStyle={{ objectFit: "cover" }}
              loading="eager"
              formats={["auto", "webp", "avif"]}
            />
          </motion.div>
        )}

        <motion.div
          className="has-text-white hero-shell__overlay"
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
        >
          <div className="container hero-shell__content">
            <div className="columns is-centered">
              <div className="column is-10 has-text-centered">
                <h1 className="hero-shell__eyebrow has-text-white">
                  {h1title}
                </h1>
                <p className="hero-shell__title has-text-white mb-0">
                  <MarkdownRenderer markdown={title} />
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {showLogoBanner && <LogoBanner />}
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  h1title: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  showLogoBanner: PropTypes.bool,
}

HeroSection.defaultProps = {
  showLogoBanner: true,
}

export default HeroSection
