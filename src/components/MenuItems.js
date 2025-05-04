// src/components/MenuItems.js

import React, { useState } from "react"
import { Link } from "gatsby"

const MenuItems = () => {
  const [isActive, setIsActive] = useState(false)

  const toggleBurger = () => {
    setIsActive(!isActive)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      {/* Burger Button */}
      <div className="navbar-brand">
        <button
          onClick={toggleBurger}
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive ? "true" : "false"}
          data-target="navbarBasic"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      {/* Nav Menu */}
      <div id="navbarBasic" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start is-flex is-justify-content-center">
          <Link className="navbar-item navbar-hover-line" to="/about">
            About
          </Link>
          <Link className="navbar-item navbar-hover-line" to="/contact">
            Contact
          </Link>
          <Link className="navbar-item navbar-hover-line" to="/press-kit">
            Press Kit
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default MenuItems
