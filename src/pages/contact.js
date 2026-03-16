import React from "react"
import { graphql } from "gatsby"
import SeoHead from "../components/SeoHead"

const ContactPage = ({ data }) => {
  const content = data.contactMarkdown?.frontmatter?.contact || {}
  const lines = Array.isArray(content.lines)
    ? content.lines
      .map(line => (typeof line === "string" ? line : line?.line))
      .filter(Boolean)
    : []
  const mapEmbedUrl =
    content.mapEmbedUrl ||
    "https://maps.google.com/maps?q=Nytorget%204%20116%2040%20Stockholm%20Sweden&z=16&output=embed"

  return (
    <section className="section content-page-shell content-page-shell--gradient">
      <div className="container is-fluid">
        <h1 className="title is-size-1 has-text-white content-page__title">
          {content.pageTitle || "Contact"}
        </h1>

        <div className="contact-page-grid">
          <div className="contact-page-panel">
            <h2 className="contact-page-panel__title">{content.detailsTitle || "Recipe Musikproduktion"}</h2>
            {lines.map((line, index) => (
              <p className="contact-page-panel__line" key={`${line}-${index}`}>
                {line}
              </p>
            ))}
            <p className="contact-page-panel__line">{content.emailLabel || "Email:"}</p>
            {content.email && (
              <p className="contact-page-panel__line">
                <a href={`mailto:${content.email}`}>{content.email}</a>
              </p>
            )}
          </div>

          <div className="contact-page-panel">
            <h2 className="contact-page-panel__title">{content.locationTitle || "Location"}</h2>
            <div className="contact-page-map">
              <iframe
                title="Recipe Musikproduktion location"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage

export const Head = ({ data }) => {
  const meta = data.contactMarkdown?.frontmatter?.meta || {}

  return (
    <SeoHead
      title={meta.title || "Contact | Recipe Music Production"}
      description={meta.description || "Contact Recipe Music Production in Stockholm."}
      slug="/contact"
    />
  )
}

export const pageQuery = graphql`
  query ContactPageContent {
    contactMarkdown: markdownRemark(fileAbsolutePath: { regex: "/src/pages/contact.md/" }) {
      frontmatter {
        meta {
          title
          description
        }
        contact {
          pageTitle
          detailsTitle
          lines
          emailLabel
          email
          locationTitle
          mapEmbedUrl
        }
      }
    }
  }
`
