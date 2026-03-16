import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const LogoBanner = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)|(jpeg)|(webp)|(avif)/" }
          relativeDirectory: { eq: "logo-gallery" }
        }
      ) {
        edges {
          node {
            name
            publicURL
          }
        }
      }
    }
  `)

  const logos = data.allFile.edges || []

  if (!logos.length) {
    return null
  }

  return (
    <div className="logo-banner__wrapper py-3">
      <div className="logo-banner__row">
        {logos.map(({ node }) => {
          if (!node.publicURL) {
            return null
          }

          return (
            <div className="logo-banner__item" key={node.name}>
              <img src={node.publicURL} alt={node.name} className="logo-banner__image" loading="lazy" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LogoBanner
