// src/components/ThreeColumnText.js
import React from 'react'
import PropTypes from 'prop-types'
import MarkdownRenderer from './MarkdownRenderer'

const splitMarkdown = (text) => {
  const processed = text.replace(/\[p\]/g, '\n\n');
  const blocks = processed
    .split(/\n\s*\n/)
    .map(b => b.trim())
    .filter(Boolean);

  if (blocks.length <= 1) {
    // fallback to character-based split
    const middle = Math.floor(processed.length / 2);
    const before = processed.lastIndexOf(' ', middle);
    const after = processed.indexOf(' ', middle + 1);
    const splitIndex = before > -1 ? before : after > -1 ? after : middle;

    const left = processed.slice(0, splitIndex).trim();
    const right = processed.slice(splitIndex).trim();
    return [left, right];
  }

  // intelligent paragraph block split
  const half = Math.ceil(blocks.length / 2);
  const left = blocks.slice(0, half).join('\n\n');
  const right = blocks.slice(half).join('\n\n');
  return [left, right];
}



const ThreeColumnText = ({ title, text }) => {
  const [leftText, rightText] = splitMarkdown(text)
  const fullText = `${leftText}\n\n${rightText}`

  return (
    <section className="section has-background-white">
      <div className="container">
        <div className="columns is-variable is-8 is-multiline">
          <div className="column is-full-mobile is-one-third-desktop">
            <h2 className="title is-5 has-text-success has-text-weight-semibold">{title}</h2>
          </div>
          {/* Desktop version: two columns */}
          <div className="column is-hidden-mobile is-one-third">
            <MarkdownRenderer markdown={leftText} textClass="content" />
          </div>
          <div className="column is-hidden-mobile is-one-third">
            <MarkdownRenderer markdown={rightText} textClass="content" />
          </div>
          {/* Mobile version: single column */}
          <div className="column is-full is-hidden-tablet">
            <MarkdownRenderer markdown={text} textClass="content" />
          </div>
        </div>
      </div>
    </section>
  )
}

ThreeColumnText.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default ThreeColumnText
