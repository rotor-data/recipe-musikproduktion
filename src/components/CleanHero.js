import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import LogoBanner from './LogoBanner';
import CtaModal from './CtaModal';

const CleanHero = ({ heroImage, title, buttonText }) => {
    const image = getImage(heroImage);
  
    return (
      <section className="hero is-fullheight is-primary has-text-centered">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-half">
                <h1 className="title is-size-1">
                  {title}
                </h1>
                <CtaModal buttonText={buttonText} headline="Vill du prata med oss?" />
                <div className="mt-6">
                
                  <button className="button is-pink is-large">{buttonText}</button>
                </div>
              </div>
              <div className="column is-half">
                <GatsbyImage image={image} alt="3D Character" />
              </div>
            </div>
          </div>
        </div>
        <LogoBanner/>
      </section>
    );
  };
  

export default CleanHero;
