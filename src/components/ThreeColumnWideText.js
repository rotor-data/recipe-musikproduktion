// src/components/ThreeColumnWideText.js
import React from 'react'
import PropTypes from 'prop-types'
import MarkdownRenderer from './MarkdownRenderer'

const ThreeColumnWideText = ({ title, text }) => {
  return (
    <section className="section has-background-danger">
      <div className="container">
        <div className="columns is-variable is-8 is-multiline">
          <div className="column is-full-mobile is-one-third-desktop">
            <h2 className="title is-5 has-text-success has-text-weight-semibold">{title}</h2>
          </div>
          <div className="column is-full-mobile is-two-thirds-desktop">
            <MarkdownRenderer markdown={text} textClass="content" />
          </div>
        </div>
      </div>
    </section>
  )
}

ThreeColumnWideText.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default ThreeColumnWideText
