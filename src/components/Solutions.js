import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import WeHelp from "./WeHelp";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const Solutions = ({ solutions }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    if (activeIndex === null) {
      const interval = setInterval(() => {
        setHighlightIndex((prevIndex) => (prevIndex + 1) % solutions.blocks.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [activeIndex, solutions.blocks.length]);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-vcentered">
          {/* Left Column */}
          <div className="column is-half">
            <div className="ml-3">
              <WeHelp />
            </div>
            {solutions.blocks.map((solution, index) => (
              <div
                key={index}
                className={`box solution-category is-clickable mb-4 ${
                  activeIndex === index || (activeIndex === null && highlightIndex === index)
                    ? "has-background-gradient-pink"
                    : ""
                }`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <h2 className="title is-size-3 has-text-link is-family-sencondary has-text-weight-bold">
                  {solution.category}
                </h2>
                <div className="content has-text-black has-text-weight-semibold">
                  <p>{solution.items.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="column is-half has-text-centered">
            <PreviewCompatibleImage imageInfo={solutions.image} />
          </div>
        </div>
      </div>
    </section>
  );
};

Solutions.propTypes = {
  solutions: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    blocks: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        items: PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string.isRequired,
        }),
      })
    ).isRequired,
  }).isRequired,
};

export default Solutions;
