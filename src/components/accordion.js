import React, { useState } from 'react';
import { isObject } from 'lodash';

const Accordion = ({text, explanation}) => {



  const [isActive, setIsActive] = useState(false);
  return (
    <React.Fragment>

      <div className="accordion columns" role="presentation" onClick={() => setIsActive(!isActive)}>
  <div role="presentation" className={isActive ? 'accordion-active accordion-item column p-5 has-background-info has-text-white' : 'accordion-item column p-5' } >
    <div
      className="accordion-title is-size-5"
      
      
    >
      <h3>{text}</h3>
      <div className={isActive ? 'active-triangle': 'inactive-triangle'}></div>
    </div> 
  { isObject(explanation)
    ?<div className="accordion-content" aria-expanded={isActive}><br></br><p>{explanation}</p></div>
    :<div className="accordion-content" aria-expanded={isActive}><br></br><p className="autolink" dangerouslySetInnerHTML={{__html: explanation}}></p></div>
  }
  </div>
</div>
    </React.Fragment>
  );
};



export default Accordion;