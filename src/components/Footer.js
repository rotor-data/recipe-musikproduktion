import * as React from "react";

import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";
import youtube from "../img/social/youtube.svg";
import linkedin from "../img/social/linkedin.svg";
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
      return facebook;
    }
    if (name === "linkedin") {
      return linkedin;
    }
    if (name === "twitter") {
      return twitter;
    }
    if (name === "instagram") {
      return instagram;
    }
    if (name === "vimeo") {
      return vimeo;
    }
    if (name === "youtube") {
      return youtube;
    }
  };

  return (
    <footer className="footer has-text-white-ter custom-footer">
      <div className="content has-text-centered">
        <div className="footer-contact-grid">
          <div className="footer-contact-details">
            <p className="footer-contact-title">Recipe Musikproduktion</p>
            <p className="footer-contact-line">Nytorget 4</p>
            <p className="footer-contact-line">116 40, Stockholm, Sweden</p>
            <p className="footer-contact-line footer-contact-email">
              email:{" "}
              <a href="mailto:info@recipemusikproduktion.se" rel="noreferrer">
                info@recipemusikproduktion.se
              </a>
            </p>
          </div>
          <div className="footer-contact-map">
            <iframe
              title="Recipe Musikproduktion map"
              src="https://maps.google.com/maps?q=Nytorget%204%20116%2040%20Stockholm%20Sweden&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-hidden="false"
            />
          </div>
        </div>

        <div className="column social">
          {Object.entries(socialMedia).map(([name, url]) =>
            url ? (
              <a
                key={name}
                title={name}
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={selectImage(name)}
                  alt={name}
                  style={{ width: "1.2em", height: "1.2em" }}
                />
              </a>
            ) : null
          )}
        </div>
      </div>
      <p className="mb-0 has-text-centered mt-6 is-supersmall has-text-primary is-uppercase is-family-secondary">
        ©{data.site.siteMetadata.company} {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
