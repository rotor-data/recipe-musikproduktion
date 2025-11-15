import React from "react";
import PropTypes from "prop-types";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import MarkdownRenderer from "./MarkdownRenderer"

const GridSection = ({
  image1,
  image2,
  imageAlt,
  title,
  description,
  cta,
  imagePosition,
}) => {
  const isImageLeft = imagePosition === "left";

  const imageInfo1 = { image: image1, alt: imageAlt || title };
  const imageInfo2 = image2 ? { image: image2, alt: imageAlt || title } : imageInfo1;

  const ImageStack = () => (
    <div className="cell is-col-span-12 is-col-span-6-desktop">
      <div className="image-stack">
        <div className="image-card">
          <PreviewCompatibleImage imageInfo={imageInfo1} />
        </div>
        <div className="image-card">
          <PreviewCompatibleImage imageInfo={imageInfo2} />
        </div>
      </div>
    </div>
  );

  const TextBlock = () => (
    <div className="cell is-col-span-12 is-col-span-6-desktop">
      <div className="text-block">
        <p className="is-uppercase has-text-weight-medium has-text-grey-dark is-size-7 mb-2 tracking">
          The Introduction
        </p>
        <h2 className="title is-1 mb-5">{title}</h2>
        <MarkdownRenderer markdown={description}/>
    
        {cta && (
          <a href={cta.url} className="contact-link">
            {cta.label} <span className="arrow">→</span>
          </a>
        )}
      </div>
    </div>
  );

  return (
    <section className="section grid-section">
      <div className="container">
        <div className="grid is-align-center is-col-gap-6 is-row-gap-5">
          {isImageLeft && <ImageStack />}
          <TextBlock />
          {!isImageLeft && <ImageStack />}
        </div>
      </div>
    </section>
  );
};

GridSection.propTypes = {
  image1: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  image2: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  imageAlt: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    label: PropTypes.string,
    url: PropTypes.string,
  }),
  imagePosition: PropTypes.oneOf(["left", "right"]),
};

GridSection.defaultProps = {
  image2: null,
  imageAlt: "",
  imagePosition: "left",
};

export default GridSection;
