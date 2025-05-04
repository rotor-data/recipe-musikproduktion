import React, { useState } from 'react'
import SimpleModal from './SimpleModal'
import ContactForm from './contactForm'
import ContactFormThanks from './contactFormThanks'
import PropTypes from 'prop-types'
import RotorCTA from './RotorCTA'

const CtaModal = ({ buttonText = "Skicka förfrågan", headline = "Kontakta oss", showFieldsOverride }) => {
  const [show, setShow] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    FNAME: '',
    LNAME: '',
    COMPANY: '',
    PHONE: '',
    MESSAGE: '',
    CONSENT: false
  })

  const showFields = showFieldsOverride || {
    COMPANY: true,
    PHONE: true,
    MESSAGE: true
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // handle actual form submission here
    console.log('Submitted:', formData)
    setShow(false)
  }

  return (
    <>
     <div className='rotor-button-container'>
         <button className="rotor-button" onClick={() => setShow(true)}>
           {buttonText}
         </button>
     </div>


      <SimpleModal show={show} setShow={setShow}>
        <ContactFormThanks
          formData={formData}
          handleChange={handleChange}
          showFields={showFields}
          headline="Kontakta oss"
        />
      </SimpleModal>
    </>
  )
}

CtaModal.propTypes = {
  buttonText: PropTypes.string,
  headline: PropTypes.string,
  showFieldsOverride: PropTypes.object
}

export default CtaModal
