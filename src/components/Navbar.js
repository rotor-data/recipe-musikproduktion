import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Logo from "../img/recipe-logo.svg"

const normalizeHref = href => {
  if (typeof href !== "string") return "/"
  if (href.startsWith("/#")) return href
  if (href.startsWith("#")) return `/${href}`
  return href
}

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query NavMenuQuery {
      navigation: markdownRemark(fileAbsolutePath: { regex: "/navigation\\.md$/i" }) {
        frontmatter {
          menu {
            label
            href
          }
        }
      }
      site {
        siteMetadata {
          company
        }
      }
    }
  `)

  const fallbackMenu = [
    { label: "Start", href: "/" },
    { label: "Work", href: "/work" },
    { label: "People", href: "/people" },
    { label: "Contact", href: "/contact" },
  ]

  const menu = (data?.navigation?.frontmatter?.menu || fallbackMenu).map(item => ({
    ...item,
    href: normalizeHref(item.href),
  }))

  const [open, setOpen] = useState(false)
  const [path, setPath] = useState("/")
  const brand = data?.site?.siteMetadata?.company || "Recipe"

  useEffect(() => {
    if (typeof window === "undefined") return
    setPath(window.location.pathname || "/")
  }, [])

  const isActive = href => {
    const current = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path
    const normalized = href.endsWith("/") && href !== "/" ? href.slice(0, -1) : href
    return current === normalized
  }

  return (
    <header className="rec-nav">
      <div className="rec-nav__inner">
        <a href="/" className="rec-nav__brand" aria-label="Home">
          <Logo aria-hidden="true" />
          <span className="rec-nav__brand-text">{brand}</span>
        </a>

        <nav className="rec-nav__menu" aria-label="Main">
          {menu.map(item => (
            <a
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={`rec-nav__link${isActive(item.href) ? " is-active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="rec-nav__actions">
          <button
            type="button"
            className="rec-nav__toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(prev => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <nav className="rec-nav__mobile" aria-label="Mobile">
          {menu.map(item => (
            <a
              key={`mobile-${item.href}-${item.label}`}
              href={item.href}
              className={`rec-nav__mobile-link${isActive(item.href) ? " is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Navbar
