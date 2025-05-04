import React from "react";
import { Link } from "gatsby";
import logo from "../img/rotor-logo.svg";
import MenuItems from "./MenuItems";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

const Navbar = class extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  toggleHamburger() {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      }
    );
  }

  render() {
    return (
      <nav
        className="navbar is-fixed-top is-spaced is-size-5 is-size-5-touch"
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
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              role="menuitem"
              tabIndex={0}
              onKeyPress={() => this.toggleHamburger()}
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          {<div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <MenuItems mobile={`${this.state.navBarActiveClass}`} />
            
            <div className="navbar-end has-text-centered">
              
            </div>
          </div>}
        </div>
      </nav>
    );
  }
};

export default Navbar;