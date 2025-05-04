import React from "react";
import { Link } from "gatsby";
import logo from "../img/rotor-logo.svg";
import MenuItems from "./MenuItems";
import { useState } from "react";

const Navbar2 = () => {
const [active, setActive] = useState(false);


const handleClickBurger = () => {
  setActive(!active)

  

}

  return (

<nav
        className="navbar is-fixed-top is-spaced is-size-5 is-size-5-mobile"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="Rotor logo" style={{ width: "125px" }} />
            </Link>
           
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${active?'is-active':''}`}
              data-target="navMenu"
              role="menuitem"
              tabIndex={0}
              onKeyPress={handleClickBurger}
              onClick={handleClickBurger}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          {<div
            id="navMenu"
            className={`navbar-menu ${active?'is-active':''}`}
          >
            <MenuItems mobile={`${active?'is-active':''}`} />
            
            <div className="navbar-end has-text-centered">

              <div className="navbar-cta navbar-end has-star-right">
                <Link to="/lp/kostnadsfri-guide" className="has-text-white">
                Gratis guide</Link>
              </div>
            {/* <a className="navbar-cta navbar-end has-star-right" target="blank" rel="noreferrer" href="https://rotor.ger-dig.com/gratis-mote">Gratis möte</a> */}
            </div>
          </div>}
        </div>
      </nav>

  )
};

export default Navbar2;