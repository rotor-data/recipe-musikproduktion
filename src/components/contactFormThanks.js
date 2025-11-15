import React, { useState } from 'react';

const ContactForm = ({ formData, handleChange, showFields, headline, id }) => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    const isLocalhost = window.location.hostname === "localhost";
  
    try {
      if (isLocalhost) {
        console.log("Simulating form submission in development mode");
        setSubmitted(true);
        return;
      }
  
      await fetch("/.netlify/functions/mainMailchimpHandler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          utmParams: {
            utm_source: new URLSearchParams(window.location.search).get("utm_source") || "",
            utm_medium: new URLSearchParams(window.location.search).get("utm_medium") || "",
            utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
            utm_term: new URLSearchParams(window.location.search).get("utm_term") || "",
            utm_content: new URLSearchParams(window.location.search).get("utm_content") || ""
          },
          TAGS: ["from-site-form"]
        }),
      });
  
      setSubmitted(true); // ✅ Show the thank-you message
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  
  

  return (
    <div className="container form-container has-background-success has-text-left has-text-white">
      {submitted ? (
        <div className="has-text-centered p-6">
          <h3 className="title is-size-3">Tack för ditt meddelande!</h3>
          <p className="is-size-5 mt-4">Vi återkommer till dig så snart vi kan.</p>
        </div>
      ) : (
        <>
          <h3 className='title mb-3 is-size-3 has-text-centered has-tight-height'>{headline}</h3>
          <form onSubmit={handleSubmit} name="contact" data-netlify="true" method="POST" netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

            <div className="field">
              <label className="label is-small ml-2">E-post (företag)*</label>
              <div className="control">
                <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label className="label is-small ml-2">Förnamn*</label>
              <div className="control">
                <input className="input" type="text" name="FNAME" value={formData.FNAME} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label className="label is-small ml-2">Efternamn*</label>
              <div className="control">
                <input className="input" type="text" name="LNAME" value={formData.LNAME} onChange={handleChange} required />
              </div>
            </div>

            {showFields.COMPANY && (
              <div className="field">
                <label className="label is-small ml-2">Företag*</label>
                <div className="control">
                  <input className="input" type="text" name="COMPANY" value={formData.COMPANY} onChange={handleChange} required />
                </div>
              </div>
            )}

            {showFields.PHONE && (
              <div className="field">
                <label className="label is-small ml-2">Telefonnummer</label>
                <div className="control">
                  <input className="input" type="tel" name="PHONE" value={formData.PHONE} onChange={handleChange} />
                </div>
              </div>
            )}

            {showFields.MESSAGE && (
              <div className="field">
                <label className="label is-small ml-2">Beskriv vad du vill ha hjälp med</label>
                <div className="control">
                  <textarea
                    className="is-family-primary input has-text-black"
                    style={{ width: '100%', height: '200px' }}
                    name="MESSAGE"
                    placeholder="Skriv ditt meddelande här"
                    value={formData.MESSAGE}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            )}

            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="CONSENT"
                    checked={formData.CONSENT}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "CONSENT",
                          value: e.target.checked,
                        },
                      })
                    }
                    required
                  />
                  <span className="is-size-7 ml-3">
                    Jag godkänner att ni använder mina uppgifter i enlighet med{" "}
                    <a target="_blank" rel="noopener noreferrer" href="/personuppgiftsbehandling/">
                     Recipes personuppgiftspolicy.
                    </a>
                  </span>
                </label>
              </div>
            </div>

            <div className="field has-text-centered mt-5">
              <div className="control">
                <button type="submit" className="button is-link">Skicka</button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactForm;
