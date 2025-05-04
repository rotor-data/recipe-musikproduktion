import * as React from "react";

import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";
import youtube from "../img/social/youtube.svg";
import linkedin from "../img/social/linkedin.svg"
import footerBack from "../img/footer-back.svg"
import FooterMenu from "./FooterMenu";
import { useStaticQuery, graphql } from "gatsby";



const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          company
          socialLinks {
            facebook
            twitter
            linkedin
            instagram
            vimeo
            youtube
            tiktok
          }
        }
      }
      favicon: file(name: { eq: "favicon" }) {
        publicURL
      }
    }
  `);
    const socialMedia = data.site.siteMetadata.socialLinks;
    const selectImage = (name) => {
      if (name === "facebook") {
        return facebook
      } 
      if (name === "linkedin") {
        return linkedin
      } 
      if (name === "twitter") {
        return twitter
      } 
      if (name === "instagram") {
        return instagram
      } 
      if (name === "vimeo") {
        return vimeo
      } 
      if (name === "youtube") {
        return youtube
      } 
    }
   
    return (
      <footer className="footer has-text-white-ter" style={{ 
        backgroundImage: `url(${footerBack})`, 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'contain',
        backgroundColor: '#f793cb'}}>
        <div className="content has-text-centered">
       

        <div className="column social">


        {Object.entries(socialMedia).map(entry => 
        entry[1]!==""?<a 
        title= {entry[0]} href={entry[1]}
        target="_blank"
        rel="noreferrer">
       
        <img
          src={selectImage(entry[0])}
          alt={entry[0]}
          style={{ width: "1.2em", height: "1.2em" }}
        />
        
      </a>:null
       )


        }
                {/* <a title="facebook" href="https://facebook.com">
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a>
                <a title="twitter" href="https://twitter.com">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a>
                <a title="instagram" href="https://instagram.com">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a>
                <a title="vimeo" href="https://vimeo.com">
                  <img
                    src={vimeo}
                    alt="Vimeo"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a> */}
              </div>
     {/*      <img
            src={logo}
            alt="Kaldi"
            style={{ width: "14em", height: "10em" }}
          /> */}
        </div>
        <div className="has-text-centered has-text-white-ter">
          <div className="container has-text-white-ter">
            <div style={{ maxWidth: "100vw" }} className="columns mx-1netl">
              <div className="column is-6 is-offset-1 has-background-warning">
                <section className="menu content">
                  <FooterMenu/>
                 {/*  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/products">
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact/examples">
                        Form Examples
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Admin
                      </a>
                    </li>
                  </ul> */}
                </section>
              </div>
              <div className="column is-4">
 
              </div>
           
            </div>
          </div>
        </div>
        <p className="mb-0 has-text-centered mt-6 is-supersmall has-text-primary is-uppercase is-family-secondary">
        ©{data.site.siteMetadata.company} {new Date().getFullYear()}
        </p>
      </footer>
    );
  
};

export default Footer;
