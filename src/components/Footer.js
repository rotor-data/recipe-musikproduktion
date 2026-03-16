import * as React from "react"

import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";
import youtube from "../img/social/youtube.svg";
import linkedin from "../img/social/linkedin.svg";
import { useStaticQuery, graphql } from "gatsby"

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
  `)
  const socialMedia = data.site.siteMetadata.socialLinks
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
    <footer className="footer custom-footer">
      <div className="content has-text-centered">
        <div className="footer-contact-grid">
          <div className="footer-contact-details">
            <p className="footer-contact-title">Recipe Music Production</p>
            <p className="footer-contact-line">Nytorget 4</p>
            <p className="footer-contact-line">116 40, Stockholm, Sweden</p>
            <p className="footer-contact-line footer-contact-email">
              Email:{" "}
              <a href="mailto:info@recipemusikproduktion.se" rel="noreferrer">
                info@recipemusikproduktion.se
              </a>
            </p>
          </div>
          <div className="footer-contact-map">
            <iframe
              title="Recipe Music Production map"
              src="https://maps.google.com/maps?q=Nytorget%204%20116%2040%20Stockholm%20Sweden&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-hidden="false"
            />
          </div>
        </div>

        <div className="footer-social">
          {Object.entries(socialMedia).map(([name, url]) =>
            url ? (
              <a
                key={name}
                className="footer-social__link"
                title={name}
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                <img src={selectImage(name)} alt={name} className="footer-social__icon" />
              </a>
            ) : null
          )}
        </div>
      </div>
      <p className="footer-copyright">
        ©{data.site.siteMetadata.company} {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer
