import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';


const LogoBanner = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {extension: {regex: "/(jpg)|(png)|(jpeg)|(webp)|(avif)/"}, relativeDirectory: {eq: "logo-gallery"}}
      ) {
        edges {
          node {
            base
            childImageSharp {
              gatsbyImageData(
                placeholder: NONE
                formats: [AUTO, WEBP, AVIF]
                layout: CONSTRAINED
                transformOptions: { fit: CONTAIN }
                height: 40
              
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


      <div className="logo-banner__wrapper py-3" style={{backgroundColor:'rgba(255,255,255,0.2)'}}>
      <div className="logo-banner__scroll">
        {[...logos, ...logos, ...logos].map(({ node }, index) => {
          const image = getImage(node.childImageSharp);
          return (
            <div className="logo-banner__item" key={index}>
              <GatsbyImage
                image={image}
                alt={node.name}
                className="logo-banner__image"
                style={{width:'100%', height:'80px', maxWidth:'100px', maxHeight:'80px'}}
                imgStyle={{ objectFit:'contain', maxHeight:'80px' }}
        
              />
            </div>
          );
        })}
      </div>
    </div>
      
  );
};

export default LogoBanner;
