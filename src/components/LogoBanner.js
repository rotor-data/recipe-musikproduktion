import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';


const LogoBanner = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {extension: {regex: "/(jpg)|(png)|(jpeg)/"}, relativeDirectory: {eq: "logo-gallery"}}
      ) {
        edges {
          node {
            base
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                layout: CONSTRAINED
                transformOptions: { fit: CONTAIN }
                height: 80
              )
            }
            name
          }
        }
      }
    }
  `);

  const logos = data.allFile.edges;

  if (logos.length <= 5) return null;
  return (


      <div className="logo-banner__wrapper has-background-primary">
      <div className="logo-banner__scroll">
        {[...logos, ...logos, ...logos].map(({ node }, index) => {
          const image = getImage(node.childImageSharp);
          return (
            <div className="logo-banner__item" key={index}>
              <GatsbyImage
                image={image}
                alt={node.name}
                className="logo-banner__image"
                imgStyle={{ objectFit: 'contain' }}
              />
            </div>
          );
        })}
      </div>
    </div>
      
  );
};

export default LogoBanner;
