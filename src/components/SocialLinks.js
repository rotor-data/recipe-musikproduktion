import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// Import only available icons
import FacebookIcon from '../img/social/facebook.svg'
import InstagramIcon from '../img/social/instagram.svg'
import SpotifyIcon from '../img/social/spotify.svg'
import DeezerIcon from '../img/social/deezer.svg'
import AppleIcon from '../img/social/apple.svg'
import YoutubeIcon from '../img/social/youtube.svg'
// Tiktok icon is missing, so not imported
// Linkedin, Vimeo, Twitter exist as files but no links provided now

const iconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  spotify: SpotifyIcon,
  deezer: DeezerIcon,
  apple: AppleIcon,
  youtube: YoutubeIcon,
  // tiktok: TiktokIcon (not imported because you don't have tiktok.svg yet)
}

const SocialLinks = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          socialLinks {
            facebook
            instagram
            spotify
            deezer
            apple
            youtube
          }
        }
      }
    }
  `)

  const socialLinks = data.site.siteMetadata.socialLinks

  return (
    <div className="social-links is-flex is-flex-wrap-wrap is-justify-content-center mt-5">
      {Object.entries(socialLinks).map(([name, url]) => {
        if (!url) return null // Skip if url is empty
        if (!iconMap[name]) {
          console.warn(`No icon found for social link: ${name}`)
          return null // Skip if icon missing
        }
        return (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4"
            aria-label={name}
          >
            {React.createElement(iconMap[name], {
              style: { width: '2rem', height: '2rem' },
            })}
          </a>
        )
      })}
    </div>
  )
}

export default SocialLinks
