// src/components/Hero.js

import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import MenuItems from "./MenuItems"
import SocialLinks from "./SocialLinks"
import Logo from "../img/recipe-logo.svg"
import SVGFilters from "./SvgFilter"
import MarkdownRenderer from "./MarkdownRenderer"
import PreviewCompatibleImage from "./PreviewCompatibleImage"


const Hero = ({ image, title }) => {
  return (
    <>
      {/* Absolute floating header */}
      <div className="header-wrapper is-absolute">
        <div className="has-top-vignette"></div>

        <div className="logo-wrapper is-relative">
          <Logo
            className="has-text-link-20 worn-logo"
            style={{ zIndex: "2", position: "absolute", filter: "url(#wear-and-holes)" }}
          />
          <Logo
            className="light-behind worn-logo"
            style={{ color: "white", zIndex: "1", position: "absolute" }}
          />
        </div>

        <MenuItems />
      </div>

      {/* SVG Filters */}
      <SVGFilters />

      {/* Hero section */}
      <div style={{ display: "grid" }}>
        {/* Background Image */}
        <GatsbyImage
          image={image}
          alt=""
          style={{ gridArea: "1/1", height: "80vh" }}
          imgStyle={{ objectFit: "cover" }}
        />

        {/* Hero Content Overlay */}
        <div
          style={{
            gridArea: "1/1",
            position: "relative",
            display: "grid",
            alignItems: "start",
            padding: "8rem 2rem 2rem 2rem",
            color: "#ffc600",
          }}
        >
          <div
            className="hero-content is-flex is-flex-direction-column is-align-items-center is-justify-content-space-between"
            style={{ height: "100%" }}
          >
            {/* Title */}
            <div className="hero-title">
              {/* <MarkdownRenderer markdown={title} headingClassName="has-text-primary" /> */}
            </div>

            {/* Social Links pushed to bottom */}
            <div className="hero-social mt-auto mb-5">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
