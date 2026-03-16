import React from "react"
import PropTypes from "prop-types"

const ContactPagePreview = ({ entry }) => {
  const data = entry.getIn(["data"])?.toJS?.() || {}
  const contact = data.contact || {}
  const lines = Array.isArray(contact.lines)
    ? contact.lines.map(line => (typeof line === "string" ? line : line?.line)).filter(Boolean)
    : []

  return (
    <section
      style={{
        background: "linear-gradient(62deg, black, #c29c38)",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ color: "#fff", marginBottom: "1rem" }}>
          {contact.pageTitle || "Contact"}
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0.9rem",
          }}
        >
          <div style={{ border: "1px solid #fff", padding: "1rem", color: "#fff" }}>
            <h2 style={{ marginTop: 0 }}>{contact.detailsTitle || "Recipe Musikproduktion"}</h2>
            {lines.map((line, index) => (
              <p key={`${line}-${index}`} style={{ margin: "0 0 0.45rem" }}>
                {line}
              </p>
            ))}
            <p style={{ margin: "0 0 0.45rem" }}>{contact.emailLabel || "Email:"}</p>
            {contact.email ? (
              <p style={{ margin: 0, textDecoration: "underline" }}>{contact.email}</p>
            ) : null}
          </div>
          <div style={{ border: "1px solid #fff", padding: "1rem", color: "#fff" }}>
            <h2 style={{ marginTop: 0 }}>{contact.locationTitle || "Location"}</h2>
            <p style={{ margin: 0, opacity: 0.8 }}>Map embed is configured via URL field.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default ContactPagePreview

