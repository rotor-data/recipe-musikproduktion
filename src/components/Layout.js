import * as React from "react";
import Footer from "../components/Footer";
import "./sass/main.scss";
import CookieNotice from "./CookieNotice";
import Navbar from "./Navbar";


const TemplateWrapper = ({ children }) => {

  return (
    <div>
      <Navbar />
      <div id="cases" />
      <div id="people" />
      <div className="layout__content">
        <div className="container.is-max-widescreen">{children}</div>
      </div>
      <div id="contact" />
      <CookieNotice />
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
