// src/components/PreSave.js

import React from "react"
import MarkdownRenderer from "./MarkdownRenderer"

const PreSave = ({ title, text, link }) => {
  return (
    <section className="section">
      <div className="container has-text-centered">
        {/* Title */}
        <h2 className="title is-3 has-text-primary mb-4">
          {title}
        </h2>

        {/* Text (Markdown) */}
        <div className="content is-medium mb-5">
          <MarkdownRenderer markdown={text} />
        </div>

        {/* DistroKid Embed */}
        <div className="iframe-wrapper" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <iframe
            src={link}
            frameBorder="0"
            allow="autoplay; clipboard-write"
            allowFullScreen
            title="Pre-save Caustic Disco"
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "8px",
            }}
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default PreSave
