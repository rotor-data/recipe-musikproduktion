import * as React from "react";
import Footer from "../components/Footer";
import "./sass/main.scss";
import "./sass/recipe-modern.scss";
import CookieNotice from "./CookieNotice";
import Navbar from "./Navbar";


const TemplateWrapper = ({ children }) => {

  return (
    <div className="rec-app">
      <Navbar />
      <div className="layout__content">
        {children}
      </div>
      <CookieNotice />
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
