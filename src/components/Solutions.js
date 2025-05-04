import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getImage } from "gatsby-plugin-image";
import WeHelp from "./WeHelp";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const Solutions = ({ solutions }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(0);
  //const image = getImage(solutions.image)

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
        {/* Left Column: Solution Boxes */}
        <div className="column is-half">
        <div className="ml-3">
          <WeHelp/>
        </div>
          {solutions.blocks.map((solution, index) => (
            <div
              key={index}
              className={`box solution-category is-clickable mb-4 ${
                activeIndex === index
                  ? "has-background-gradient-pink"
                  : activeIndex === null && highlightIndex === index
                  ? "has-background-gradient-pink"
                  : ""
              }`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <h2 className="title is-size-3 has-text-link is-family-sencondary has-text-weight-bold">{solution.category}</h2>
              {solution.items.map((item, i) => (
                <div key={i} className="content has-text-black has-text-weight-semibold">
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
  
        {/* Right Column: Image */}
        <div className="column is-half has-text-centered">
          <PreviewCompatibleImage imageInfo={solutions.image} />
        </div>
      </div>
    </div>
  </section>
  
  );
};

Solutions.propTypes = {
  solutions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Solutions;
