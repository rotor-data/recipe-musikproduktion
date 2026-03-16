import React from "react"
import SeoHead from "../components/SeoHead"

const ContactPage = () => {
  return (
    <section className="section content-page-shell content-page-shell--gradient">
      <div className="container is-fluid">
        <h1 className="title is-size-1 has-text-white content-page__title">Contact</h1>

        <div className="contact-page-grid">
          <div className="contact-page-panel">
            <h2 className="contact-page-panel__title">Recipe Musikproduktion</h2>
            <p className="contact-page-panel__line">4 Nytorget</p>
            <p className="contact-page-panel__line">116 40, Stockholm, Sweden</p>
            <p className="contact-page-panel__line">Contact:</p>
            <p className="contact-page-panel__line">Joakim Lundgren</p>
            <p className="contact-page-panel__line">Email:</p>
            <p className="contact-page-panel__line">
              <a href="mailto:info@recipemusikproduktion.se">info@recipemusikproduktion.se</a>
            </p>
          </div>

          <div className="contact-page-panel">
            <h2 className="contact-page-panel__title">Location</h2>
            <div className="contact-page-map">
              <iframe
                title="Recipe Musikproduktion location"
                src="https://maps.google.com/maps?q=Nytorget%204%20116%2040%20Stockholm%20Sweden&z=16&output=embed"
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

export const Head = () => (
  <SeoHead
    title="Contact | Recipe Music Production"
    description="Contact Recipe Music Production in Stockholm."
    slug="/contact"
  />
)
