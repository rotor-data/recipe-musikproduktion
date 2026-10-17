import React from "react"
import { graphql } from "gatsby"
import SeoHead from "../components/SeoHead"
import MarkdownRenderer from "../components/MarkdownRenderer"

export const ContactPageTemplate = ({ content = {} }) => {
  const actions = Array.isArray(content.actions) ? content.actions : []
  const mapEmbedUrl =
    content.mapEmbedUrl ||
    "https://maps.google.com/maps?q=Nytorget%204%20116%2040%20Stockholm%20Sweden&z=16&output=embed"

  return (
    <main className="rec-page rec-contact-page">
      <section className="rec-shell rec-contact">
        <div className="rec-contact__grid">
          <div className="rec-contact__left">
            {content.panelTag && <p className="rec-contact__panel-tag">{content.panelTag}</p>}
            <h1 className="rec-contact__title">{content.pageTitle || "Contact"}</h1>

            <div className="rec-contact__modules">
              {(content.operatorLabel || content.operatorBody) && (
                <div className="rec-contact__module">
                  {content.operatorLabel && (
                    <p className="rec-contact__label">{content.operatorLabel}</p>
                  )}
                  {content.operatorBody && (
                    <div className="rec-contact__card rec-contact__rich">
                      <MarkdownRenderer markdown={content.operatorBody} />
                    </div>
                  )}
                </div>
              )}

              <div className="rec-contact__module">
                {content.emailLabel && <p className="rec-contact__label">{content.emailLabel}</p>}
                {content.email && (
                  <a className="rec-contact__card" href={`mailto:${content.email}`}>
                    <p className="rec-contact__name">{content.email}</p>
                    {content.emailMeta && <p className="rec-contact__meta">{content.emailMeta}</p>}
                  </a>
                )}
              </div>

              <div className="rec-contact__module">
                {content.addressLabel && (
                  <p className="rec-contact__label">{content.addressLabel}</p>
                )}
                {content.addressBody && (
                  <div className="rec-contact__card rec-contact__rich rec-contact__rich--lines">
                    <MarkdownRenderer markdown={content.addressBody} />
                  </div>
                )}
              </div>
            </div>

            {(content.statusLabel || content.statusValue) && (
              <div className="rec-contact__status">
                <span className="rec-contact__status-dot" />
                <span>
                  {[content.statusLabel, content.statusValue].filter(Boolean).join(": ")}
                </span>
              </div>
            )}
          </div>

          <div className="rec-contact__right">
            <div className="rec-contact__map-wrap">
              <iframe
                title={content.locationTitle || "Recipe Musikproduktion location"}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {content.locationBadge && (
                <span className="rec-contact__map-badge">{content.locationBadge}</span>
              )}
              {content.mapBody && (
                <div className="rec-contact__map-meta rec-contact__rich">
                  <MarkdownRenderer markdown={content.mapBody} />
                </div>
              )}
            </div>
          </div>
        </div>

        {actions.length > 0 && (
          <div className="rec-contact__actions">
            {actions.map((action, index) => (
              <a
                key={`${action.title || action.label}-${index}`}
                href={action.href || "/contact"}
                className="rec-contact__action-card"
              >
                {action.label && <span className="rec-contact__action-label">{action.label}</span>}
                {action.title && <span className="rec-contact__action-title">{action.title}</span>}
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

const ContactPage = ({ data }) => (
  <ContactPageTemplate content={data.contactMarkdown?.frontmatter?.contact || {}} />
)

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
          panelTag
          operatorLabel
          operatorBody
          addressLabel
          addressBody
          emailLabel
          email
          emailMeta
          locationTitle
          mapEmbedUrl
          locationBadge
          mapBody
          statusLabel
          statusValue
          actions {
            label
            title
            href
          }
        }
      }
    }
  }
`
