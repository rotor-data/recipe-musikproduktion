import React from "react";
import { Helmet } from "react-helmet";
import logo from "../../static/img/Rotor-logo.png";
import { Link } from "gatsby";
import "./sass/main.scss";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const LandingPageHead = ({children, backgroundClass}) => {

  const { title, description, originalSite } = useSiteMetadata();
 return (

    <>

   <div className={`${backgroundClass?backgroundClass:`has-background-primary`} pl-3 pt-3`}>
     <Link to="/" title="Logo">
               <img src={logo} alt="Logo" width="80px" height="80px" />
     </Link>
   </div>
   {children}

  <div className={`${backgroundClass?backgroundClass:`has-background-primary`} has-text-white is-family-secondary is-size-7 has-text-centered py-3`}>©Rotor Digitalbyrå {new Date().getFullYear()}</div>
    </>
 )

}

export default LandingPageHead