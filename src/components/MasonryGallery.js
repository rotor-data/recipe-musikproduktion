import React from 'react';
import PropTypes from 'prop-types';
import { Masonry } from 'masonic';
import DuctTape from '../assets/svg/duct-tape.svg';
import PreviewCompatibleImage from './PreviewCompatibleImage';

import './MasonryGallery.scss';

const getRotationClass = (index) => {
  const classes = ['rotate-minus-5', 'rotate-minus-3', 'rotate-0', 'rotate-3', 'rotate-5'];
  return classes[index % classes.length];
};

const MasonryGallery = ({ photos }) => {
  const renderCard = ({ data, index }) => {
    const rotationClass = getRotationClass(index);

    return (
      <div className="card" key={index}>
        <div className="card-image has-background-light is-relative">
          <PreviewCompatibleImage imageInfo={{ image: data.src, alt: data.title || '' }} />
          {data.title && (
            <div className="text-wrapper">
              <DuctTape className={`duct-tape-background ${rotationClass}`} />
              <div className="text-overlay">
                {data.title}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="section">
      <div className="container is-fluid">
        <Masonry
          items={photos}
          columnGutter={16}
          columnWidth={300}
          overscanBy={2}
          render={renderCard}
        />
      </div>
    </section>
  );
};

MasonryGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      title: PropTypes.string,
      uploadDate: PropTypes.string
    })
  ).isRequired
};

export default MasonryGallery;
