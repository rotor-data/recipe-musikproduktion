import React from "react";
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { GatsbyImage } from "gatsby-plugin-image";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Calendly from "../components/Calendly";
import ReactPlayer from "react-player";
//import StarQuote from "../components/StarQuote";
import LogoGallery from "../components/LogoGallery";
import SimpleModal from "../components/SimpleModal";
import UpsalesFormEmbed from "../components/UpsalesFormEmbed";
import { Helmet } from "react-helmet";
import MarkdownRenderer from "../components/MarkdownRenderer";
import LandingPageHead from "../components/LandingPageHead";
import ContactForm from "../components/contactForm";
import { submitContactData } from "../components/submitContactData";
import { navigate } from "gatsby";
import Services from "../components/Services";
import StarQuote from "../components/StarQuote";



// eslint-disable-next-line
export const NyttaPageTemplate = ({
  title,
  calendly,
  form,
  image,
  hero,
  sticker,
  button,
  starquotes,
  servicesHeadline,
  services,
  why,
  convince,
  logoGallery
}) => {
  const heroImage = {image: hero.imagelink}
  console.log("hero====>",heroImage)  
  const calendarAnchor = useRef(null);
  const handleClickCal = () => {
  calendarAnchor.current?.scrollIntoView({behavior: 'smooth'});
  };
  const [show, setShow] = useState(false);



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
      TAGS: form.tags.map(tag=>tag),
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

  return (
    <div className="has-background-warning lp">
          <Helmet
          htmlAttributes={{ lang: 'sv-SE' }}
          >
        <title>{title}</title>
        
      </Helmet>

      {/*hero section*/}

      <section className="has-background-info">

        <div>
          <div className="column has-text-centered is-10-desktop is-offset-1-desktop is-8-fullhd is-offset-2-fullhd is-10-tablet is-offset-1-tablet is-10-mobile is-two-thirds-tablet is-offset-1-mobile">


            <div className="has-text-center has-text-white has-tight-height pre-headline is-size-4-mobile is-size-3-tablet has-text-weight-bold mb-3">
  
              <div style={{background:"transparent"}} className="has-text-white has-text-centered has-tight-height is-size-4-mobile is-size-3-tablet has-text-weight-bold mb-3">
            
            <button className="simplebutton is-size-5 is-size-6-mobile" type="button" onClick={() => setShow(true)}>
            <h4 className="has-text-white" style={{ fontSize: 'unset', padding:"0" }}>{hero.pre}</h4>
                  </button>
              
            </div>

              <SimpleModal show={show} setShow={setShow}>
              {/* <UpsalesFormEmbed url={upsales.url} /> */}
              <ContactForm 
              formData={formState.formData} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit} 
              showFields={{ COMPANY: true, PHONE: true }}
              headline={form.headline}
              id={form.id}
            />
            </SimpleModal>
            </div>
           
                <h1 className="is-family-secondary is-size-1-tablet is-size-3-mobile has-text-weight-bold has-tight-height has-text-white mt-1 mb-3" dangerouslySetInnerHTML={{__html:hero.headline}}></h1>
            
            <div className="columns is-vcentered mt-3 is-flex-direction-row-reverse">
            <div className="column is-6">
                
                {/*optional image*/}
                {hero.image === true? <div className="columns is-mobile is-centered">
        <div>
         
          <div>
       
          <PreviewCompatibleImage imageInfo={heroImage} /> 
          </div>
        </div>
        </div>
        :null}
                    {hero.video === true? <div className="columns is-centered">
       <ReactPlayer url={hero.videolink}
         controls={true}
         width='100%'
         height='400px'
       />
     </div>
     :null}

     
      </div>
            <div className="column is-6">

                <h3 className="has-text-white has-text-left has-tight-height has-text-weight-bold is-size-5 is-size-6-mobile mb-3" dangerouslySetInnerHTML={{__html:hero.sub}}></h3>
               
                <MarkdownRenderer customClass="has-text-left has-text-white" markdown={hero.bodytext}/>

  


            </div>
            

  

          </div>
          
          <div className="has-text-centered">
                     {/*/ CTA button */}
                
                <button className="simplebutton is-size-5 mt-3" type="button" onClick={() => setShow(true)}>
                       {button.cta}
                     </button>
  
      
          
          <div className="mt-3 is-size-6 is-size-6-mobile has-text-centered">
              <a style={{textDecoration:'underline'}} className="has-text-black" onClick={handleClickCal}>...eller boka möte direkt i kalendern</a>
            </div>
            </div>
            </div>

          <div>



               
          </div>
          
            
          {/*button till upsales mötesbokning
       <div className="column is-mobile">
           <div className="column is-10 is-offset-1 has-text-centered mt-6">
             <button className="simplebutton is-size-5" type="button" onClick={() => setShow(true)}>
                       {button.cta}
                     </button>
                     
           </div>
          <div className="columns">
            <div className="column is-half-desktop mt-3 is-offset-one-quarter-desktop has-text-centered has-text-white is-italic is-size-4 is-size-6-mobile">
              <p>{button.subtext}</p>
            </div>
          </div>
       </div>
*/}

        </div>
        {hero.text}

      </section>

      {/*starquotes section*/}
{/*      <section className="section has-background-black has-text-white is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-space-evenly">
     {starquotes.map(item => (
         
            <StarQuote quote={item.quote} name={item.name}/> 
        

        ))}
     </section> */}

    {/*why section*/}
<section className="has-background-success pb-3">

<Services services={services} headline={servicesHeadline}/>
</section>
    <section>

     

    <div className="columns pb-6 has-background-info">
      <div className="column is-half-desktop is-offset-one-quarter-desktop is-two-thirds-tablet is-offset-2-tablet is-10-mobile is-offset-1-mobile">
        <h2 className="is-size-3 has-text-weight-bold pt-6">{why.headline}</h2>
        <MarkdownRenderer markdown={why.text} customClass="powerlist is-family-secondary"/>
             {/*/ CTA button */}
       <div className="has-text-centered">
              <button className="simplebutton is-size-5 mt-3" type="button" onClick={() => setShow(true)}>
                        {button.cta}
                      </button>
                      <div className="mt-3 is-size-6 is-size-6-mobile has-text-centered">
               <a style={{textDecoration:'underline'}} className="has-text-black" onClick={handleClickCal}>...eller boka möte direkt i kalendern</a>
             </div>
       </div>
      </div>

       
    </div>
    


    </section>
    



      
          {/*starquotes section*/}
          <section className="section has-background-success has-text-black is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-space-evenly">
     {starquotes.map(item => (
         
            <StarQuote quote={item.quote} name={item.name} image={item.image}/> 
        

        ))}
     </section>
<div className="section has-background-white">
<LogoGallery imageData={logoGallery} />
</div>

{/*convince section*/}

{convince.blurbs.map((item, index) => 
  <div>
  <section className={index%2===0?"section has-background-link":"section has-background-primary has-text-white"}>
     
    <div>
      <div className="container block my-3">
    <div className="columns">
      <div className="column has-text-centered columns is-vcentered is-justify-content-center mb-0" style={{order:index%2}}>
      <PreviewCompatibleImage imageInfo={item.image} alt={item.image.alt} />  
      </div>
      <div className="column is-family-secondary has-text-white">
      <h2 className={index%2===0?"is-size-3 has-text-weight-bold":"is-size-3 has-text-weight-bold has-text-white"}>{item.headline}</h2>
        <MarkdownRenderer markdown={item.text} />
    
      </div>
      
    </div>
 
    {index!== convince.blurbs.length-1 ? <div className={index%2===0?"wavy-divider has-background-primary":"wavy-divider has-background-link"}></div> :null}
    
    </div>
    </div>
    </section>


    
    </div>

  )}

{calendly.active === true ?
       
       <section ref={calendarAnchor} className="">
         <div className="has-text-centered px-3">
           <h2 className="is-size-3 has-text-weight-bold pt-6">{calendly.headline}</h2>
           <p>{calendly.text}</p>
         </div>
         <Calendly url={calendly.url} /></section> :
       null
     }

  
    {/*scroll button till mötesbokning*/}
   
 
  <section className="section has-background-success">


            {/*button till upsales mötesbokning*/}
       <div className="column is-mobile">
       <div className="has-text-centered has-text-primary">
          <h2 className="is-size-3 has-text-weight-bold mb-3">{convince.cta}</h2>
             <button className="simplebutton is-size-5" type="button" onClick={() => setShow(true)}>
                       {button.cta}
                     </button>
                     
           </div>

       </div>

  </section>
  

    </div>
  );
};

NyttaPageTemplate.propTypes = {
  title: PropTypes.string,
  calendly: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    url: PropTypes.string,
    headline: PropTypes.string,
    text: PropTypes.string
  }),
  upsales: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  hero: PropTypes.shape({
    pre: PropTypes.string,
    headline: PropTypes.string,
    sub: PropTypes.string,
    video: PropTypes.bool,
    videolink: PropTypes.string,
    image: PropTypes.bool,
    imagelink: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  sticker: PropTypes.arrayOf(PropTypes.string),
  button: PropTypes.shape({
    cta: PropTypes.string,
    subtext: PropTypes.string,
  }),
  starquotes: PropTypes.arrayOf(PropTypes.shape({
    quote: PropTypes.string,
    name: PropTypes.string,
  })),
  why: PropTypes.shape({
    headline: PropTypes.string,
    text: PropTypes.string,
  }),
  convince: PropTypes.shape({
    blurbs: PropTypes.arrayOf(PropTypes.shape({
      headline: PropTypes.string,
      text: PropTypes.string,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })),
    cta: PropTypes.string,
  }),
};


const NyttaPage = ({ data }) => {
  console.log(data)
  const { nyttapage } = data.markdownRemark.frontmatter;

  return (
    <LandingPageHead backgroundClass='has-background-info'>
      <NyttaPageTemplate
        title = {data.markdownRemark.frontmatter.title}
        calendly={nyttapage.calendly}
        form={nyttapage.form}
        image={nyttapage.image}
        hero={nyttapage.hero}
        sticker={nyttapage.sticker}
        button={nyttapage.button}
        starquotes={nyttapage.starquotes}
        why={nyttapage.why}
        convince={nyttapage.convince}
        services = {nyttapage.services}
        servicesHeadline = {nyttapage.servicesHeadline}
        logoGallery={data.allFile.edges}
        
      />
</LandingPageHead>
  );
};

NyttaPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};
export default NyttaPage;

export const NyttaPageQuery = graphql`
  query NyttaPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        nyttapage {
          calendly {
            active
            url
            headline
            text          
          }
          form {
            id
            headline
            navigateTo
            tags
          }
    
          hero {
            headline
            pre
            sub
            bodytext
            video
            videolink
            image
            imagelink {
              childImageSharp {
                gatsbyImageData(quality: 80, height:300)
              }
            }
          }
          sticker {
            text
          }
          button {
            cta
            subtext
          }
          servicesHeadline
          services {
            service {
              name
              tooltip
            }
          }
          image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          why {
            headline
            text
          }
          convince {
            blurbs {
              headline
              text
              image {
                alt
                image {
                  childImageSharp {
                    gatsbyImageData(height: 400, quality: 92, layout: CONSTRAINED)
                  }
                }
              }
            }
            cta
          }
          starquotes {
            quote
            name
            image {
              childImageSharp {
                gatsbyImageData(height: 100, quality: 92, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
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
`;

