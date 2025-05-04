import * as React from "react";

const StarDivider = ({customClass}) => {
    
    const StarStyle = {
        backgroundImage: 'url(/img/rotor-pink-star.svg)',
        width: '100 vw',
        height: 'calc(30px + 2vw)',
        

    };

  return (
     <div style = {StarStyle} className={`star-divider ${customClass}`}>
         
     </div>
    )
}

export default StarDivider