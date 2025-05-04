import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import StarDivider from "../components/Star-divider";
import TeamBox from "../components/TeamBox";
import SEO from "../components/SEO";


// eslint-disable-next-line
export const AboutPageTemplate = ({ title, path, meta, og, content, contentComponent, hero, why, us, team }) => {

  const heroImage = getImage(hero.image);
  const whyImage = getImage(why.image);
  
  

  return (
    <div>
      <SEO title={title} description={meta.description} slug={path} og={og}/>
      
        <GatsbyImage image={heroImage} loading="eager" alt={hero.imagealt} style={{ minHeight: '350px', maxHeight:'700px', marginTop:"105px" }}/>

    {/* <div style={{ display: "grid", position: "relative" }}>
    <GatsbyImage image={heroImage} alt={hero.imagealt} style={{
          gridArea: "1/1",
         
          // You can set a maximum height for the image, if you wish.
          // maxHeight: 600,
        }}/>
        <div
        style={{
          // By using the same grid area for both, they are stacked on top of each other
          gridArea: "1/1",
          position: "absolute",
          width: "100%",
          left:"0%",
          bottom:"5%",
          // This centers the other elements inside the hero component
          placeItems: "center",
          display: "grid",
        }}
      >
      
        <h2 className="has-text-white mx-auto has-text-centered has-text-weight-bold has-tight-spacing is-size-3 is-size-5-mobile p-3"> 
        {hero.text}
        </h2>
      </div>
      </div> */}
    
{/*why section*/}
<div className="hero-body has-background-white">
        <div className="columns">

          <div className="column has-background-primary is-8-desktop is-offset-2-desktop is-8-tablet is-offset-2-tablet">
            <div className="columns is-flex-direction-column p-3">
              <StarDivider customClass="column is-full mb-3" />
              <div className="column is-8 is-offset-2 is-10-mobile is-offset-1-mobile">
                <div className="has-text-centered m-3"><GatsbyImage image={whyImage}/></div>
              
                <h2 className="is-size-2 mb-4" dangerouslySetInnerHTML={{ __html: why.headline }}></h2>
                <p className="content" dangerouslySetInnerHTML={{ __html: why.text }}></p>
                

              </div>

              <StarDivider customClass="column is-full mt-3" />
            </div>
          </div>

        </div>
      </div>

{/*us section*/}

<div className="columns hero-body has-background-primary mr-1">
  <div className="column is-6-fullhd is-offset-3-fullhd is-8-desktop is-offset-2-desktop is-10-tablet is-offset-1-tablet is-full-mobile no-padding-mobile">
      <div className="is-relative">
          <div className="rotor-box-large is-family-primary">
            <h1 className="is-size-5">Om oss på Rotor:</h1>
            <h2 className="is-size-2 mb-3">{us.headline}</h2>
            <p className="has-dropcap is-hyphenated" dangerouslySetInnerHTML={{ __html: us.text }}></p>

          </div>

      </div>

  </div>
</div>

{/* <div className="hero-body has-background-white">
        <div className="columns">

          <div className="column has-background-primary is-8-desktop is-offset-2-desktop is-8-tablet is-offset-2-tablet">
            <div className="columns is-flex-direction-column p-3">
              <StarDivider customClass="column is-full mb-3" />
              <div className="column is-8 is-offset-2 is-10-mobile is-offset-1-mobile">
                <h2 className="is-size-2 mb-4">{us.headline}</h2>
                <p className="content" dangerouslySetInnerHTML={{ __html: us.text }}></p>
                

              </div>

              <StarDivider customClass="column is-full mt-3" />
            </div>
          </div>

        </div>
      </div> */}

  {/*team section*/}    
    <div className="hero-body">
    <div className="columns is-multiline is-centered">
    {team.map(({name, title, image}, i) => (
        <div className="column mx-3" style={{display:'flex',justifyContent:'center'}}>
          <div style={{transform: `rotate(${((i%2)?2:-2)}deg)`}}>
         <TeamBox name={name} title={title} image={image}></TeamBox>
         </div>
 
        </div>
        ))}

    </div>
    </div>


    </div>


  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={frontmatter.title}
        path={frontmatter.path}
        meta={frontmatter.meta}
        og={frontmatter.og}
        content={post.html}
        hero={frontmatter.hero}
        why={frontmatter.why}
        us={frontmatter.us}
        team={frontmatter.team}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        path
        meta {
          description
          
        }
        og {
          image
          type
        }
        hero {
          text
          image {
            childImageSharp {
              gatsbyImageData(
                quality: 100, 
                layout: FULL_WIDTH,
                transformOptions: { fit: OUTSIDE, cropFocus: ENTROPY }
                
                )
            }
          }
        }
        why {
          headline
          text
          image {
            childImageSharp {
              gatsbyImageData(
                quality: 80, 

                height:200,
                
                )
            }
          }
        }
        us {
          headline
          text
        }
        team {
          name
          title
          image {
            childImageSharp {
              gatsbyImageData(
                quality: 80, 
                
                height:200,
                
                )
            }
          }
        }
          
      }
    }
  }
`;
