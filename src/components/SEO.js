//this is the old SEO component, based on <Helmet>

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { withPrefix } from "gatsby";

const SEO = ({ title, description, slug = "/", og = {} }) => {

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
      favicon: file(name: { eq: "favicon" }) {
        publicURL
      }
    }
  `);

  //add slash to beginning of slug if it's not there
  if (slug[0]!=='/') 
  {slug="/"+slug}

  const ogimage = og.image || "img/rotor-og-image.jpg"
  const ogtype = og.type || "website"
  const oglocale= og.locale || "sv_SE"

  const jsonld = 
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Rotor",
    "image": "",
    "@id": "",
    "url": "https://rrrotor.com",
    "telephone": "+46768472147",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "St Eriksgatan 72",
      "addressLocality": "Stockholm",
      "postalCode": "11320",
      "addressCountry": "SE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 59.33863820000001,
      "longitude": 18.0362399
    } ,
    "sameAs": "https://www.linkedin.com/company/rotor-media-group" 
  }


  return (
    <Helmet
      htmlAttributes={{ lang: `sv` }}
      // titleTemplate={`%s | ${data.site.siteMetadata.title}`}
    >
      {jsonld && <script type="application/ld+json">{JSON.stringify(jsonld)}</script>}
      <title>{title}</title>
      <meta
        name='description'
        content={description || data.site.siteMetadata.description}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={withPrefix("/img/favicons/favicon-rec-apple-touch-icon.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={withPrefix("/img/favicons/favicon-rec-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={withPrefix("/img/favicons/favicon-rec-16x16.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={withPrefix("/img/favicons/favicon-rec-android-chrome-192x192.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href={withPrefix("/img/favicons/favicon-rec-android-chrome-512x512.png")}
      />
      <link rel='canonical' href={`${data.site.siteMetadata.siteUrl}${slug}`} />
      <meta property="title" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${data.site.siteMetadata.siteUrl}${withPrefix("/")}${ogimage}`}/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
      <meta property="og:type" content={ogtype}/>
      <meta property="og:locale" content={oglocale} />
      <meta property="og:url" content={`${data.site.siteMetadata.siteUrl}${slug}`} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={`${data.site.siteMetadata.siteUrl}${slug}`} />
      <meta name="twitter:image" content={`${data.site.siteMetadata.siteUrl}${withPrefix("/")}${ogimage}`} />


    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
};

export default SEO;
