import React from 'react';
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function shuffle (arr) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}

const imageArray = (arry) => {
    let i = 0;
    let imageArray = [];
    let count = -1;
    
    for (i === 0; i < arry.length; i++) {
        if (i === 0 || i === 5 || i === 9 || i === 13) {
            count += 1;
            imageArray[count] = [];
            imageArray[count].push(arry[i]);

        } else {
            imageArray[count].push(arry[i]);
        }}
        return shuffle(imageArray);
        
    }



export default function LogoGallery() {

 
  return (
    <StaticQuery
      query={graphql`
      {
        allFile(
          filter: {extension: {regex: "/(jpg)|(png)|(jpeg)/"}, relativeDirectory: {eq: "logo-gallery"}}
        ) {
          edges {
            node {
              base
              childImageSharp {
                gatsbyImageData(width: 150, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
              name
            }
          }
        }
      }
    `
    }

            render={data => (
                <div className="container">
                    {
                    imageArray(data.allFile.edges).map((arr) => 
                    (
                    <div className="columns is-mobile has-text-centered logo-wrapper">
                        {arr.map((image) =>
                        <div className="column p-3 logo-box" style={{width:'20%'}}>
                            <div style={{transform: `translateY(`+Math.random()*30+`px`}} >
                            <GatsbyImage image={getImage(image.node)} alt={'logo logotyp '+image.node.name} />
                            </div>
                        </div>
                    )}
                    </div>)
                    )
                    }
                </div>
            )

            }
        />
    )
}
    