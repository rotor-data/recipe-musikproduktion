import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const labelMap = {
  facebook: "Facebook",
  twitter: "X",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  vimeo: "Vimeo",
  youtube: "YouTube",
  tiktok: "TikTok",
  spotify: "Spotify",
  bandcamp: "Bandcamp",
  apple: "Apple Music",
  deezer: "Deezer",
}

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterData {
      site {
        siteMetadata {
          company
          socialLinks {
            facebook
            twitter
            linkedin
            instagram
            vimeo
            youtube
            tiktok
            spotify
            bandcamp
            apple
            deezer
          }
        }
      }
    }
  `)

  const company = data?.site?.siteMetadata?.company || "Recipe Music Production"
  const socialLinks = data?.site?.siteMetadata?.socialLinks || {}
  const visibleSocial = Object.entries(socialLinks).filter(([, url]) => Boolean(url))
  const fallbackLinks = [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Vimeo", href: "#" },
  ]

  return (
    <footer className="rec-footer">
      <div className="rec-footer__inner">
        <p className="rec-footer__brand">{company}</p>
        <p className="rec-footer__copyright">
          © {new Date().getFullYear()} {company}. All rights reserved.
        </p>
        {visibleSocial.length > 0 && (
          <div className="rec-footer__links">
            {visibleSocial.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer">
                {labelMap[name] || name}
              </a>
            ))}
          </div>
        )}
        {visibleSocial.length === 0 && fallbackLinks.length > 0 && (
          <div className="rec-footer__links">
            {fallbackLinks.map(link => (
              <a key={`${link.href}-${link.label}`} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer
