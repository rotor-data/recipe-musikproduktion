import React, { useRef } from "react"
import PropTypes from "prop-types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { motion, useScroll, useTransform } from "framer-motion"
import MarkdownRenderer from "./MarkdownRenderer"
import LogoBanner from "./LogoBanner"
import CtaModal from "./CtaModal"

const HeroSection = ({ h1title, title, description, ctaText, image }) => {
  const heroImage = getImage(image)
  const sectionRef = useRef(null)

  // Scroll animation hook
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section className="section p-0" ref={sectionRef}>
      <div style={{ position: "relative", minHeight: "90vh", overflow: "hidden" }}>
        {/* Background Image with parallax */}
        {heroImage && (
          <motion.div
            style={{
              y: backgroundY,
              position: "absolute",
              top: 0,
              left: 0,
              height: "120%",
              width: "100%",
              zIndex: 0
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

        {/* Foreground Content with slight parallax and fade */}
        <motion.div
          className="has-text-white"
          style={{
            y: contentY,
            opacity: contentOpacity,
            position: "relative",
            zIndex: 1,
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90vh",
            padding: "4rem 1.5rem"
          }}
        >
          <div className="container" style={{ maxWidth: "1200px", width: "100%" }}>
            <div className="columns is-centered">
              <div className="column is-10 has-text-centered">
                <h1 className="is-size-6-desktop is-size-7-touch has-text-white mb-3 is-family-accent">
                  {h1title}
                </h1>
                <p className="megatitle has-text-white mb-4">
                  <MarkdownRenderer markdown={title}/>
                </p>
                {description && (
                  <p className="mt-4 is-size-6 has-text-white">
                    <MarkdownRenderer markdown={description} />
                  </p>
                )}
                <div className="mt-5 mb-5">
                  <CtaModal buttonText={ctaText} headline="Vill du prata med oss?" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LogoBanner */}
        <LogoBanner />
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
