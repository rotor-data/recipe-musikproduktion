import React from "react"
import PropTypes from "prop-types"
import { ContactPageTemplate } from "../../pages/contact"

const ContactPagePreview = ({ entry }) => {
  const entryData = entry.getIn(["data"])
  const data = (entryData && entryData.toJS && entryData.toJS()) || entryData || {}

  return <ContactPageTemplate content={data.contact || {}} />
}

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default ContactPagePreview
