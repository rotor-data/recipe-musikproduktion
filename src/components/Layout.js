import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";
import "./sass/main.scss";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import CookieNotice from "./CookieNotice";
import UnderConstruction from "./UnderConstruction";
import { Link } from "gatsby";
import logo from "../../static/img/Rotor-logo.png";


const TemplateWrapper = ({ children }) => {
  
  const { title, description } = useSiteMetadata();

  return (
 
    <div>

      {/* <Navbar2 /> */}
      {/* <UnderConstruction/> */}
      <div></div>
      <div className="container.is-max-widescreen">
        {children}

        

      
        </div>
        <CookieNotice/>
      {/* <Footer /> */}
     
      
      
    </div>
    
    
  );
};

export default TemplateWrapper;
