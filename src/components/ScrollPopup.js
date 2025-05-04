import React, { useState, useEffect } from 'react';
import { Link } from "gatsby";
import PreviewCompatibleImage from './PreviewCompatibleImage';
import { StaticImage } from 'gatsby-plugin-image';


const ScrollPopup = (image) => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle the popup closing
  const handleClose = () => {
    sessionStorage.setItem('popupClosed', 'true');
    setIsVisible(false);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      const popupClosed = sessionStorage.getItem('popupClosed') === 'true';
      if (window.scrollY > 300 && !popupClosed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`has-background-link popup ${isVisible ? 'show' : ''}`}>
      <button onClick={handleClose} className="close-button modal-close">X</button>
      
    
      <div className='is-relative is-flex is-flex-direction-column is-align-items-center has-text-centered'>
      <StaticImage src="../img/rotor-guide-front.png" alt="Guide Front" />
  
        
        <p className='mb-3'>Trött på marknadsföring som inte fungerar? Ladda ner vår kostnadsfria guide.</p>
        <Link to="/lp/kostnadsfri-guide" className="button mb-3">Klicka här</Link>
        
      </div>
    </div>
  );
};

export default ScrollPopup;
