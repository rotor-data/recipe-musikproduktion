import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const MarketingSection = ({ headline, description, services, imageData, buttonText, onButtonClick }) => {
  const image = getImage(imageData);

  return (
    <section className="section">
      <div className="container">

        {/* Top Section: Headline, Text, and Image */}
        <div className="columns is-vcentered mb-6">
          <div className="column is-two-thirds">
            <h1 className="title is-size-2">{headline}</h1>
            <p className="subtitle">{description}</p>
          </div>
          <div className="column is-one-third">
            <GatsbyImage image={image} alt="Illustration" />
          </div>
        </div>

        {/* Services Section */}
        <div className="columns is-multiline">
          {services.map((service, index) => (
            <div className="column is-half" key={index}>
              <div className="box">
                <h2 className="title is-size-4 has-text-primary">{service.title}</h2>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button Section */}
        <div className="has-text-centered mt-6">
          <button className="button is-large is-link" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>

      </div>
    </section>
  );
};

export default MarketingSection;
