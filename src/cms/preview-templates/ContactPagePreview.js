import React from "react"
import PropTypes from "prop-types"

const ContactPagePreview = ({ entry }) => {
  const entryData =
    entry.getIn(["data"]) || entry.getIn(["data", "frontmatter"]) || null
  const data =
    (entryData && entryData.toJS && entryData.toJS()) ||
    entryData ||
    {}
  const contact = data.contact || {}
  const lines = Array.isArray(contact.lines)
    ? contact.lines.map(line => (typeof line === "string" ? line : line?.line)).filter(Boolean)
    : []
  const actions = Array.isArray(contact.actions) ? contact.actions : []

  return (
    <section
      style={{
        background: "#0e0e0e",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ color: "#c29c38", textTransform: "uppercase", letterSpacing: "0.18em" }}>
          {contact.panelTag || "Input signal: Inbound"}
        </p>
        <h1 style={{ color: "#fff", marginBottom: "1rem" }}>{contact.pageTitle || "Contact"}</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0.9rem",
          }}
        >
          <div style={{ border: "1px solid rgba(194,156,56,.3)", padding: "1rem", color: "#fff" }}>
            <p style={{ color: "#c29c38", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: ".75rem" }}>
              {contact.operatorLabel || "Operator"}
            </p>
            <h2 style={{ marginTop: 0 }}>
              {contact.operatorName || contact.detailsTitle || "Recipe Musikproduktion"}
            </h2>
            {contact.operatorRole && <p style={{ opacity: 0.8 }}>{contact.operatorRole}</p>}
            {lines.map((line, index) => (
              <p key={`${line}-${index}`} style={{ margin: "0 0 0.45rem" }}>
                {line}
              </p>
            ))}
            <p style={{ margin: "0 0 0.45rem" }}>{contact.emailLabel || "Email"}</p>
            {contact.email ? (
              <p style={{ margin: 0, textDecoration: "underline" }}>{contact.email}</p>
            ) : null}
          </div>
          <div style={{ border: "1px solid rgba(194,156,56,.3)", padding: "1rem", color: "#fff" }}>
            <h2 style={{ marginTop: 0 }}>{contact.locationTitle || "Location"}</h2>
            <p style={{ margin: 0, opacity: 0.8 }}>Map embed is configured via URL field.</p>
            {contact.locationBadge && <p style={{ color: "#c29c38" }}>{contact.locationBadge}</p>}
            {contact.mapCoordinates && <p style={{ opacity: 0.8 }}>{contact.mapCoordinates}</p>}
          </div>
        </div>
        {actions.length > 0 && (
          <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "0.75rem" }}>
            {actions.map((action, index) => (
              <div key={`${action.title}-${index}`} style={{ border: "1px solid rgba(194,156,56,.3)", padding: "0.9rem" }}>
                <p style={{ color: "#c29c38", margin: 0, fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".2em" }}>
                  {action.label}
                </p>
                <p style={{ color: "#fff", margin: "0.35rem 0 0" }}>{action.title}</p>
              </div>
            ))}
          </div>
        )}
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
