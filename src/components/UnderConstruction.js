import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'


const UnderConstruction = () => {
  const data = useStaticQuery(graphql`
    query {
      badge: file(relativePath: { eq: "under-construction-badge.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FIXED, width: 200)
        }
      }
    }
  `)

  const image = getImage(data.badge)

  return (
    <div className="under-construction-container" style={{right:20, top: 20, position: 'fixed', zIndex:1000}}>
      <GatsbyImage image={image} alt="Under Construction Badge" className="under-construction-badge" />
    </div>
  )
}

export default UnderConstruction