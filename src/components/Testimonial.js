import React from "react";
import PropTypes from "prop-types";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const Testimonial = ({ testimonial }) => {
  const { quote, name, company, image } = testimonial;

  console.log("Testimonial props:", testimonial);

  return (
    <section className="section has-background-white">
      <div className="container">
        <div
          className="box has-background-success"
          style={{ borderRadius: "1.5rem" }}
        >
          <div className="columns is-vcentered is-variable is-5 is-multiline is-mobile is-justify-content-center">

            {/* Column 1: Star */}
            <div className="column is-narrow has-text-left">
              <img
                src="/img/rotor-pink-star.svg"
                alt="Star Icon"
                style={{ width: "80px" }}
              />
            </div>

            {/* Column 2: Quote + Name */}
            <div className="column is-two-thirds-tablet is-12-mobile">
              <p className="is-italic has-text-white is-size-5 mb-4">
                “{quote}”
              </p>
              <p className="has-text-weight-bold has-text-link">
                {name}, <span className="has-text-pink">{company}</span>
              </p>
            </div>

            {/* Column 3: Circular Image */}
            <div className="column is-narrow has-text-right">
              <figure className="image is-128x128 is-inline-block">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: image,
                    alt: name,
                    imageStyle: {
                      borderRadius: "50%",
                      objectFit: "cover",
                      width: "128px",
                      height: "128px"
                    }
                  }}
                />
              </figure>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

Testimonial.propTypes = {
  testimonial: PropTypes.shape({
    quote: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  }).isRequired,
};

export default Testimonial;
