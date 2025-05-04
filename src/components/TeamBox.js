import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";


import "./sass/main.scss";



const TeamBox = ({ name, title, tel, mail,image }) => {
    const currImage = getImage(image);
    let height;

    if (tel && !mail) {
      height = '520 px';
    } else if (mail && !tel) {
      height = '520 px';
    } else if (tel && mail) {
      height = '530 px';
    } else {
      height = '500 px';
    }
    return (
        <div>
          <div className="card has-star-border" style={{height:{height},width:'400px'}}>
  <div>
    <div className="pt-6 has-text-centered">
    <GatsbyImage image={currImage} />
    <img src={image} width="140px"/>
    </div>
  </div>
  <div className="card-content">
    <div className="media">
      <div className="media-left">
       
      </div>
      <div className="media-content has-text-centered mt-3">
        <p className="has-text-weight-bold is-size-4" >{name}</p>
        <div>
          {mail?<a href={`mailto:${mail}`}>{mail}</a>:null}
        </div>
        {tel?<a href= {`tel:+46${tel.replace(/ /g,'').replace('-','').substring(1)}`} className="is-6">{tel}</a>:null}
        <p className="subtitle is-6">{title}</p>
       
      </div>
    </div>

  </div>
</div>

        </div>
    );
}
export default TeamBox;