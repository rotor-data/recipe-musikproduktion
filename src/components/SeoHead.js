import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { withPrefix } from "gatsby"

const SeoHead = ({ title, description, slug, og = {} }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const ogimage = og.image || "img/og-image.jpg"
  const ogtype = og.type || "website"
  const oglocale = og.locale || "sv_SE"
  const faviconGoogle = "img/favicon-96x96.ico"

  const fullUrl = `${data.site.siteMetadata.siteUrl}${slug.startsWith("/") ? slug : "/" + slug}`

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Recipe Music Production",
    url: data.site.siteMetadata.siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nytorget 4",
      addressLocality: "Stockholm",
      postalCode: "11640",
      addressCountry: "SE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 59.3129,
      longitude: 18.0838,
    },
  }
    const siteUrl = data.site.siteMetadata.siteUrl
    const fullSlug = slug.startsWith("/") ? slug : `/${slug}`
    const ogImage = og.image || "img/og-image.jpg"
    const ogType = og.type || "business.business"
    const ogLocale = og.locale || "sv_SE"
    const pageUrl = `${siteUrl}${fullSlug}`
  return (
    
    <>
      <html lang="sv" data-theme="light" /> {/*forcing light mode globally*/} 
      <title>{title}</title>
      <meta name="description" content={description || data.site.siteMetadata.description} />
      <link rel="canonical" href={pageUrl} />

      {/* Icons */}
      <link rel="icon" href={withPrefix("/favicon.ico")} sizes="any" />
      <link rel="apple-touch-icon" sizes="180x180" href={withPrefix("/img/favicons/favicon-rec-apple-touch-icon.png")} />
      <link rel="icon" type="image/png" href={withPrefix("/img/favicons/favicon-rec-32x32.png")} sizes="32x32" />
      <link rel="icon" type="image/png" href={withPrefix("/img/favicons/favicon-rec-16x16.png")} sizes="16x16" />
      <link rel="shortcut icon" href={withPrefix("/img/favicons/favicon-rec.ico")} />
      <meta name="theme-color" content="#000" />

      {/* OpenGraph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={`${siteUrl}/${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/${ogImage}`} />
      <meta name="twitter:url" content={pageUrl} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonld)}</script>
    </>
  )

}

SeoHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  og: PropTypes.object,
}

export default SeoHead
