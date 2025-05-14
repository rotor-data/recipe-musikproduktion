import React from "react"
import PropTypes from "prop-types"
import PreviewCompatibleImage from "./PreviewCompatibleImage"
import FiveStars from "../img/FiveStars.svg"

const Testimonial = ({ testimonial }) => {
  const { quote, name, company, image } = testimonial

  return (
    <section className="section has-background-white testimonial">
      <div className="container">
        <div
          className="box has-background-link-dark"
          style={{ borderRadius: "0.5rem" }}
        >
          <div className="columns is-vcentered is-variable is-5 is-multiline is-mobile is-justify-content-center">

            {/* Column 1: Quote + Stars + Name */}
            <div className="column is-9-tablet is-12-mobile has-text-centered">
              <FiveStars className="has-text-link" style={{ width: "110px", marginBottom: "1rem" }} />
              <p className="is-italic has-text-white is-size-5 mb-4">
                “{quote}”
              </p>
              <p className="has-text-weight-bold has-text-link">
                {name}, <span className="has-text-pink">{company}</span>
              </p>
            </div>

            {/* Column 2: Circular Image */}
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
  )
}

Testimonial.propTypes = {
  testimonial: PropTypes.shape({
    quote: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  }).isRequired,
}

export default Testimonial
