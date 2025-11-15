import React from 'react';
import PropTypes from 'prop-types';
import { Masonry } from 'masonic';
import { motion } from 'framer-motion';
import DuctTape from '../img/duct-tape.svg';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const rotationClasses = ['rotate-minus-5', 'rotate-minus-3', 'rotate-0', 'rotate-3', 'rotate-5'];
const alternateRotations = [-5, 5];

const MasonryGallery = ({ photos, onCardClick }) => {
  const renderCard = ({ data, index, columnIndex = index }) => {
    const rotation = alternateRotations[index % alternateRotations.length];
    const rotationClass = rotationClasses[index % rotationClasses.length];
    const animateFromLeft = columnIndex % 2 === 0;

    return (
      <motion.div
        className="card"
        key={index}
        onClick={() => onCardClick && onCardClick(data)}
        role={onCardClick ? "button" : undefined}
        tabIndex={onCardClick ? 0 : undefined}
        onKeyDown={
          onCardClick
            ? event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onCardClick(data);
                }
              }
            : undefined
        }
        initial={{
          opacity: 0,
          y: 12,
          x: animateFromLeft ? -80 : 80,
          rotate: rotation + (animateFromLeft ? -8 : 8),
        }}
        animate={{ opacity: 1, y: 0, x: 0, rotate: rotation }}
        transition={{ duration: 0.45, delay: index * 0.03 }}
        whileHover={{ scale: 1.02, y: -2 }}
        style={{ rotate: rotation }}
      >
        <div
          className="card-image is-relative"
          style={{ background: 'transparent' }}
        >
          <PreviewCompatibleImage
            imageInfo={{
              image: data.thumb,
              alt: data.title || '',
              imageStyle: {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              },
            }}
          />
          <div className="text-wrapper">
            <div className="duct-tape-container">
              <DuctTape className={`duct-tape-background ${rotationClass}`} />
              {data.title && (
                <div className="text-overlay">
                  {data.title}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
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
      thumb: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      title: PropTypes.string,
      uploadDate: PropTypes.string
    })
  ).isRequired,
  onCardClick: PropTypes.func,
};

export default MasonryGallery;
