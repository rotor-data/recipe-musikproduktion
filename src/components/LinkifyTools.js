import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import "./sass/main.scss";
import { isObject } from "lodash";

const Linkify = ({linkText, exclude}) => {



  const linkThis = ["google ads", "facebook","annonsering på sociala medier","seo","marketing automation","cro"];
  const regex = new RegExp(linkThis.map((el) => el).join("|"), "gi");
  
  const textLower = linkText.toLowerCase();
  const linking = (el) => {
    if (el === "google ads") return "../google-ads";
    if (el === "facebook" | el === "annonsering på sociala medier")  return "../sociala-medier-annonser";
    if (el === "seo") return "../seo";
    if (el === "marketing automation") return "../marketing-automation";
    if (el === "cro") return "../cro"
    console.log(el)
 
  }
  

  
  const output = [];
  let pos = 0;
  
  const matches = textLower.matchAll(regex);
  
  [...matches].forEach((match) => {
    output.push(linkText.substring(pos, match.index));
    pos = match.index + match[0].length;
    //adderat if-sats så att det inte länkar till nuvarande sida!
    
    match[0] !== exclude.toLowerCase() ? output.push(<Link to={linking(match[0])}>{linkText.substring(match.index, pos)}</Link>) : output.push (linkText.substring(match.index, match.index+ match[0].length));
    console.log(match,exclude)
    
  });
  output.push (linkText.substring(pos))
  console.log(output);

return ( 
<div>

{output.map (obj=> isObject(obj)?obj:<span dangerouslySetInnerHTML={{__html:obj}}></span>)}
                        
 

</div>
)
};

Linkify.propTypes = {
linkText: PropTypes.string,
link : PropTypes.string,
};

export default Linkify;