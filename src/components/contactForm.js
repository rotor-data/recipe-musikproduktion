import React from 'react';
import { Link } from 'gatsby';

const ContactForm = ({ formData, handleChange, handleSubmit, showFields, headline, id }) => {
  return (
    <div className="container has-background-warning p-6 has-text-left">
      <h3 className='has-text-white mb-3 is-size-4 has-text-centered has-tight-height'>{headline}</h3>
      <form onSubmit={handleSubmit} name="contact" data-netlify="true" method="POST" netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />
        {/* Always show email, first name, and last name fields */}
        <div className="field">
          <label className="label is-small ml-2 has-text-link">Business email*</label>
          <div className="control">
            <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="field">
          <label className="label is-small ml-2 has-text-link">First name*</label>
          <div className="control">
            <input className="input" type="text" name="FNAME" value={formData.FNAME} onChange={handleChange} required />
          </div>
        </div>

        <div className="field">
          <label className="label is-small ml-2 has-text-link">Last name*</label>
          <div className="control">
            <input className="input" type="text" name="LNAME" value={formData.LNAME} onChange={handleChange} required />
          </div>
        </div>

     

        {showFields.COMPANY && (
          <div className="field">
            <label className="label is-small ml-2 has-text-link">Company*</label>
            <div className="control">
              <input className="input" type="text" name="COMPANY" value={formData.COMPANY} onChange={handleChange} required/>
            </div>
          </div>
        )}

           {/* Conditional rendering based on showFields */}
           {showFields.PHONE && (
          <div className="field">
            <label className="label is-small ml-2 has-text-link">Phone number</label>
            <div className="control">
              <input className="input" type="tel" name="PHONE" value={formData.PHONE} onChange={handleChange}/>
            </div>
          </div>
        )}

      {showFields.MESSAGE && (
          <div className="field">
            <label className="label is-small ml-2 has-text-link">Message</label>
            <div className="control">
              <textarea className='is-family-primary input' style={{width:'100%', height: '200px'}} name="MESSAGE" placeholder="Write your message here" value={formData.MESSAGE} onChange={handleChange}></textarea>
            </div>
          </div>
        )}

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" value={formData.CONSENT} onChange={handleChange}/>
                <span className='is-size-7 ml-3'>
                I agree that you can use my data according to <a target="_blank" rel="noopener noreferrer" href="/personuppgiftsbehandling/">Recipe's privacy policy.</a>
                </span>
              </label>
            </div>
          </div>


        <div className="field has-text-centered mt-5">
          <div className="control">
            <button type="submit" className="button is-link">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
