
import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import LandingPageHead from "../components/LandingPageHead";


// eslint-disable-next-line
export const TackPageTemplate = ({

hero,
}) => {

  


  return (
    <div>
      <div className="top-spacing"></div>
      
      {/*hero section*/}
      <section className="has-background-primary pt-6">
        <div>
          <div className="has-text-centered">
            
            
            <div className="columns">
              <div className="column is-8-desktop is-offset-2-desktop is-10-mobile is-offset-1-mobile">
              <div className="has-text-center has-text-white has-tight-height pre-headline is-size-4-mobile is-size-3-tablet has-text-weight-bold mb-3">
              <h4 className="has-text-white" >{hero.pre}</h4>
              
            </div>
                <h1 dangerouslySetInnerHTML={{__html:hero.headline}} className="is-size-1-tablet is-size-3-mobile has-text-weight-bold has-tight-height has-text-link mt-1 my-3"></h1>
{
hero.sub!==""
?                 <h3 className="has-text-white has-text-weight-bold is-size-4 is-size-5-mobile mb-6" dangerouslySetInnerHTML={{__html:hero.sub}}></h3>
: null
}
              </div>
            </div>
            {/*hero text*/}
            <div className="columns is-mobile is-flex-direction-row-reverse">
            <div className="column">
              </div>
        

            </div>
          </div>

       
        </div>
        {hero.text}
      <div className="has-text-centered">

      <div className="is-flex is-justify-content-center">
          <a href={hero.buttonlink} className="is-size-5 simplebutton" type="button">
                        {hero.buttontext}
                       </a>
      </div>
                     </div>
      </section>
 {/*spacing block because of no footer*/}
    <div className="block" style={{height:"100px"}}></div>
    </div>

  )}




TackPageTemplate.propTypes = {

  hero: PropTypes.shape({
    headline: PropTypes.string,
    sub: PropTypes.string,
    pre: PropTypes.string,

  }),
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),

};

const TackPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const { thanks } = frontmatter

  return (
    <LandingPageHead>
      <TackPageTemplate
        title={thanks.title}
        hero={thanks.hero}

      />
    </LandingPageHead>
  );
};

TackPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default TackPage;

export const TackPageQuery = graphql`
  query TackPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        thanks {
          title

          hero {
            headline
            pre
            sub
            salestext
            buttontext
            buttonlink

          }
        }
      }
    }
  }
`;
