import React, { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query NavMenuQuery {
      navigation: markdownRemark(
        fileAbsolutePath: { regex: "/navigation\\.md$/i" }
      ) {
        frontmatter {
          menu {
            label
            href
          }
        }
      }
    }
  `)

  const fallbackMenu = [
    { label: "Om oss", href: "#om-oss" },
    { label: "Cases", href: "#cases" },
    { label: "People", href: "#people" },
    { label: "Kontakt", href: "#contact" },
  ]
  const menu = data?.navigation?.frontmatter?.menu ?? fallbackMenu

  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const prevScrollY = useRef(0)

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined
    }
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 50) {
        setVisible(true)
      } else if (currentY > prevScrollY.current) {
        setVisible(false)
      } else if (currentY < prevScrollY.current) {
        setVisible(true)
      }
      prevScrollY.current = currentY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const overlayVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  }

  return (
    <nav className={`nav-bar ${visible ? "" : "nav-bar--hidden"}`}>
      <div className="nav-bar__inner">
        <div className="nav-bar__logo">Recipe</div>
        <div className="nav-bar__menu">
          {menu.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="nav-bar__link has-text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          className="nav-bar__hamburger"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-bar__overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ type: "tween", duration: 0.35 }}
          >
            <button
              className="nav-bar__overlay-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            {menu.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="nav-bar__overlay-link has-text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
