import * as React from "react";
import Footer from "../components/Footer";
import "./sass/main.scss";
import CookieNotice from "./CookieNotice";


const TemplateWrapper = ({ children }) => {

  return (
 
    <div>
      {/* <UnderConstruction/> */}
      <div className="container.is-max-widescreen">{children}</div>
      <CookieNotice />
      <Footer />
    </div>
    
    
  );
};

export default TemplateWrapper;
