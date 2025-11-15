// src/components/ThreeColumnStackedText.js
import React from 'react'
import PropTypes from 'prop-types'
import MarkdownRenderer from './MarkdownRenderer'

const ThreeColumnStackedText = ({ title, text, sectionClass }) => {
  return (
    <section className={`section ${sectionClass}`}>
      <div className="container">
        <div className="columns">
          <div className="column is-full-mobile is-two-thirds-desktop">
            <h2 className="title is-5 has-text-left has-text-weight-semibold">{title}</h2>
            <MarkdownRenderer markdown={text} textClass="content has-text-left" />
          </div>
        </div>
      </div>
    </section>
  )
}

ThreeColumnStackedText.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default ThreeColumnStackedText
