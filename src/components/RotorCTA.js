import * as React from "react";
import { Link } from "gatsby";



const RotorCTA = ({buttonText, buttonLink, headline, text}) => {
  
    return ( 
    <div className="is-relative">
      <div className="is-absolute rotor-cta p-5 column is-three-fifths is-offset-one-fifth" style={{height:130}}>
        <h2 className="is-size-3 has-tight-spacing has-tight-height mb-3">{headline}</h2>
        <p>{text}</p>
        <Link className="rotor-button" to={buttonLink}>{buttonText} </Link>
      
      </div>
    </div>
    
    )
    };
export default RotorCTA