
import React from "react";
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { GatsbyImage } from "gatsby-plugin-image";
import ReactPlayer from "react-player";
import UpsalesFormEmbed from "../components/UpsalesFormEmbed";
import SimpleModal from "../components/SimpleModal";
import { Helmet } from "react-helmet";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import MarkdownRenderer from "../components/MarkdownRenderer";
import LandingPageHead from "../components/LandingPageHead";
import ContactForm from "../components/contactForm";
import { submitContactData } from "../components/submitContactData";
import { navigate } from "gatsby";
import SEO from "../components/SEO";



// eslint-disable-next-line
export const NocostPageTemplate = ({frontmatter}) => {
  const {title, meta, upsales, hero, convince, form} = frontmatter.utankostnad
  console.log(form)

  const [formState, setFormState] = useState({
    formData: {
        email: '',
        FNAME: '',
        LNAME: '',
        PHONE: '',
        COMPANY: ''
    },
    utmParams: {}
});

useEffect(() => {
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    let utmData = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = searchParams.get(param);
      if (value) utmData[param] = value;
    });
    setFormState(prevState => ({
      ...prevState,
      TAGS: form.tags.map(tag => tag),
      utmParams: utmData
    }));
  }
}, []);

useEffect(() => {

  console.log("forms state", formState)
}, [formState])

const handleChange = (e) => {
    setFormState(prevState => ({
        ...prevState,
        formData: {
            ...prevState.formData,
            [e.target.name]: e.target.value
        }
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await submitContactData(formState);
        console.log('Submission successful:', response);
        navigate(`${form.navigateTo}`); // Redirect to the thank-you page

    } catch (error) {
        console.error('Submission failed:', error);
    }
};


  
  const heroImage = {image: hero.imagelink};
  const calendarAnchor = useRef(null);
  const convinceImages = convince.blurbs.map((item) => getImage(item.image.image)|| item.image.image )
  console.log("frontmatter",frontmatter)
  const handleClickCal = () => {
    calendarAnchor.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [show, setShow] = useState(false);



  const tags = "test1, test2";


  return (
    <div className="has-background-info lp">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {/*hero section*/}
      <SEO title={title} description={meta.description} slug="" og={{image: meta.ogImage.publicURL }}/>
   
      <section className="has-background-info pt-6">
     
        <div>
          <div className="has-text-centered">
            <div style={{background:"transparent"}} className="has-text-white has-text-centered has-tight-height is-size-4-mobile is-size-3-tablet has-text-weight-bold mb-3">
            
            <button className="simplebutton is-size-5" type="button" onClick={() => setShow(true)}>
            <h4 className="has-text-white" style={{ fontSize: 'unset', padding:"0" }}>{hero.pre}</h4>
                  </button>
              
            </div>
            <SimpleModal show={show} setShow={setShow}>
            <ContactForm 
              formData={formState.formData} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit} 
              showFields={{ COMPANY: false, PHONE: false }}
              headline={form.headline}
              id={form.id}
/>
            </SimpleModal>
            <div className="columns">
              <div className="column is-8-desktop is-offset-2-desktop is-10-mobile is-offset-1-mobile">
                <h1 dangerouslySetInnerHTML={{__html:hero.headline}} className="is-family-secondary is-size-1-tablet is-size-3-mobile has-text-weight-bold has-tight-height has-text-white mt-1 mb-3"></h1>
{
hero.sub!==""
?                 <h3 className="has-text-white has-text-weight-bold has-tight-spacing is-size-4 is-size-5-mobile mb-6">{hero.sub}</h3>
: null
}
              </div>
            </div>
            {/*hero text & image*/}
            <div className="columns is-flex-direction-row-reverse">
            <div className="column">
                {/*optional image*/}
                {hero.image === true ? <div className="columns is-mobile is-centered">
                  <div>
                    <div>
                    <PreviewCompatibleImage imageInfo={heroImage} /> 
                    </div>
                  </div>
                </div>
                  : null}
              </div>
              <div className="column is-one-third-desktop is-offset-2-desktop is-half-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
    
                <MarkdownRenderer markdown={hero.salestext} customClass="has-text-white has-text-left hero-text with-preamble"/>
                <div className="mt-6">
                  <button className="rotor-button is-size-5-desktop is-size-6-mobile" type="button" onClick={() => setShow(true)}>
                    {hero.buttontext}
                  </button>
                </div>
              </div>

            </div>
          </div>
          {/*optional video*/}
          {hero.video === true ? <div className="columns is-centered">
            <ReactPlayer url={hero.videolink}
              controls={true}
              width='100%'
              height='400px'
            />
          </div>
            : null}
        </div>
        {hero.text}
      </section>
{/*convince section*/}

{convince.blurbs.map((item, index) => 
  <div className="my-6 is-family-secondary pt-6">
    
  <section className={index%2===0?"section has-background-warning has-text-black":"section has-background-primary"}>
     
    <div>
      <div className="container block my-3">
    <div className="columns">
      <div className="column has-text-centered columns is-vcentered is-justify-content-center mb-0" style={{order:index%2}}>
      {/* <PreviewCompatibleImage imageInfo={item.image.image} alt={item.image.alt} />   
      <GatsbyImage image={convinceImages[index]}/>*/}
      <PreviewCompatibleImage imageInfo={item.image } />

      </div>
      <div className="column ">
      <h2 className="is-size-3 has-text-weight-bold">{item.headline}</h2>
        <MarkdownRenderer markdown={item.text} customClass="powerlist"/>
      </div>
      
    </div>
 
    {index!== convince.blurbs.length-1 ? <div className={index%2===0?"wavy-divider has-background-primary":"wavy-divider has-background-link"}></div> :null}
    
    </div>
    </div>
    </section>

    
    </div>

  )}

  {/*button till upsales form*/}
  <div className="has-text-centered has-text-white">
 <button className="rotor-button is-size-5-desktop is-size-6-mobile" type="button" onClick={() => setShow(true)}>
           {hero.buttontext}
         </button>
         
</div>
        <section className="section">


</section>
    </div>
  );
};

NocostPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  hero: PropTypes.shape({
    headline: PropTypes.string,
    sub: PropTypes.string,
    pre: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  imageOffer: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),

};

const NocostPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <LandingPageHead>
      <NocostPageTemplate
      frontmatter={frontmatter}
   
      />
   </LandingPageHead>
  );
};

NocostPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default NocostPage;

export const NocostPageQuery = graphql`
  query NocostPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        utankostnad {
          title
            upsales {
              active
              url
            }
          meta {
            ogImage {
              childImageSharp {
                gatsbyImageData(quality: 100, width: 1200, layout: CONSTRAINED)
                }
            publicURL
              }

          }
          hero {
            headline
            pre
            sub
            video
            videolink
            image
            salestext
            buttontext
            imagelink {
              childImageSharp {
                gatsbyImageData(quality: 80, height:500)
              }
            }
          }
          form {
            headline
            id
            navigateTo
            tags
          }
          convince {
            blurbs{
              headline
              text
              image {
                alt
                image {
                  childImageSharp {
                    gatsbyImageData(height: 300, quality: 92, layout: CONSTRAINED )
                  }
                }
              }
            }
            cta
          }
        }  
      }
    }
  }
`;
