import React from "react"
import PropTypes from "prop-types"
import { StaticImage } from "gatsby-plugin-image"
import MarkdownRenderer from "./MarkdownRenderer"
import RotorCTA from "./RotorCTA"


const SwooshBlock = ({ title, text, buttonText, buttonLink }) => {
  return (
    <div style={{ display: "grid" }}>
      {/* Faux background using StaticImage */}
      <StaticImage
        src="../img/swoosh-background.svg"
        alt=""
        style={{ gridArea: "1/1", width: "100%", height: "100%" }}
        imgStyle={{ objectFit: "cover" }}
        placeholder="none"
      />

      {/* Foreground content, placed over background */}
      <div
        style={{
          gridArea: "1/1",
          position: "relative",
          padding: "4rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <div className="columns">
          <div className="column is-half-desktop is-offset-3-desktop has-text-left is-max-desktop">
            <h2 className="title is-3 has-text-weight-bold has-text-link mb-4">
              {title}
            </h2>
        
            <div className="markdown-body">
              <MarkdownRenderer markdown={text} />
              {buttonLink?.length>0 && 
              <div className="has-text-centered">
              <RotorCTA buttonText={buttonText} buttonLink={buttonLink}/> 
              </div>
              
              }
              
            </div>
          </div>
      </div>
      </div>
    </div>
  )
}

SwooshBlock.propTypes = {
  headline: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default SwooshBlock
