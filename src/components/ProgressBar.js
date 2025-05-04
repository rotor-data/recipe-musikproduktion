import React, { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percentage = (scrollTop / totalHeight) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="progress-container">
      <div
        className="progress is-link"
        role="progressbar"
        style={{ width: `${scrollPercentage}%`, left: '0' }}
        aria-valuenow={scrollPercentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
      
      </div>
    </div>
  );
};

export default ProgressBar;
