import React from "react"
import PropTypes from "prop-types"

const SolutionsSection = ({ section = {} }) => (
  <section className="rec-section rec-shell rec-section--solutions">
    <div className="rec-section__head rec-section__head--solutions">
      <h2 className="rec-section__title">{section.title || "Solutions"}</h2>
      <p className="rec-section__kicker">{section.kicker || "Specialized workflows"}</p>
    </div>
    <div className="rec-solutions-grid">
      {(section.blocks || []).slice(0, 3).map((block, index) => (
        <article className="rec-solution-card" key={`${block.category}-${index}`}>
          <span className="rec-solution-card__index">{`0${index + 1}`}</span>
          {block.category && <h3>{block.category}</h3>}
          {block.items?.description && <p>{block.items.description}</p>}
        </article>
      ))}
    </div>
  </section>
)

SolutionsSection.propTypes = { section: PropTypes.object }

export default SolutionsSection
