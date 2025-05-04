import React from 'react'
import PropTypes from 'prop-types'
import { LandingPageSpecificTemplate } from '../../templates/landing-page-specific'

const LandingPageSpecificPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  return (
    <LandingPageSpecificTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={tags && tags.toJS()}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

LandingPageSpecificPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default LandingPageSpecificPreview
