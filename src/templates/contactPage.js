import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import TeamBox from "../components/TeamBox";
import { navigate } from "gatsby-link";
import { useState, useEffect } from "react";
import { submitContactData } from "../components/submitContactData";
import ContactForm from "../components/contactForm";


function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const ContactPage = ({ data }) => {
  const [state, setState] = useState({ isValidated: false });
  const { markdownRemark } = data;
  const { frontmatter } = markdownRemark;
  const { contact } = frontmatter;
  const form = {contact}


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
    <Layout>
      <SEO title="Kontakta oss" description="Här kan du nå oss på Rotor" slug="/kontakta oss" />
      <section className="section mt-3 has-background-info">

          <div className="hero-body">
            
            <div className="columns">
                <div className="column is-5 has-text-left landing-specific">
                    <h1 className="is-family-secondary is-size-3 has-text-bold has-text-warning">{frontmatter.title}</h1>
                    <hr style={{backgroundColor:'transparent'}}></hr>
                    <p>{contact.description}</p>
                </div>
                <div className="column is-half is-offset-1">
                <ContactForm 
                    formData={formState.formData} 
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} 
                    showFields={{ COMPANY: false, PHONE: false, MESSAGE: true, }}
                    headline={form.headline}
                    id={form.id}
                    />
              </div>
            </div>
            </div>

            </section>
            <section className="section mt-3">

            <div className="columns is-multiline is-centered">
            
              {contact.team.map(({ name, title, mail, tel, image }, i) => (
                <div className="column mx-3" key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ transform: `rotate(${(i % 2) ? 2 : -2}deg)` }}>
                    <TeamBox name={name} title={title} image={image} mail={mail} tel={tel} />
                  </div>
                </div>
              ))}
            </div>
      
          <div className="has-text-centered mt-6">
            <h2 className="is-size-3 is-family-secondary mb-3">Hitta till oss</h2>
          
          <PreviewCompatibleImage imageInfo={contact.mapImage}/>
       
          <p>Rotor</p>
          <a href={`tel:${contact.phone}`}>Telefon: {frontmatter.phone}</a>
          <p>{contact.address}</p>
          <p>{contact.zip} {contact.city}</p>
          <p>Tunnelbana: {contact.subway}</p>
          <div className="my-3">
            <a target="_blank" rel="noreferrer" href={contact.googleMaps}>Här hittar du oss på Google maps</a>
          </div>
          <div>
            <a target="_blank" rel="noreferrer" href={contact.appleMaps}>Här hittar du oss i Apple kartor</a>
          </div>
          </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query {
    markdownRemark(frontmatter: { templateKey: { eq: "contactPage" } }) {
      frontmatter {
        title
        contact {
            description
            form {
            id
            headline
            navigateTo
            }
            team {
            name
            title
            mail
            tel
            image {
                childImageSharp {
                    gatsbyImageData(quality: 80, height:200)
                }
                }
            }
            mapImage {
                childImageSharp {
                    gatsbyImageData(quality: 80, height:400)
                }
                }
            phone
            address
            zip
            city
            subway
            googleMaps
            appleMaps
        }
      }    
    }
  }
`;

export default ContactPage;
