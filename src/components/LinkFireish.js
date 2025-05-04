import React from "react"
import PreviewCompatibleImage from "./PreviewCompatibleImage"

// Platform SVGs
import SpotifyIcon from "../img/social/spotify.svg"
import AppleMusicIcon from "../img/social/apple.svg"
import DeezerIcon from "../img/social/deezer.svg"
import YoutubeIcon from "../img/social/youtube.svg"
import { trackEvent } from "./TrackEvent"
// ...

const iconMap = {
  spotify: SpotifyIcon,
  applemusic: AppleMusicIcon,
  deezer: DeezerIcon,
  youtube: YoutubeIcon,
}

const LinkFireish = ({ title, subtitle, image, platforms }) => {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "480px" }}>
        
        {/* Artwork with Play button */}
        <div className="artwork-wrapper" style={{ position: "relative", boxShadow:'#ffffff4a 0 0 50px' }}>
          <PreviewCompatibleImage
            imageInfo={{
              image: image,
              alt: title,
              style: {
                borderRadius: "8px",
                width: "100%",
                height: "auto",
              
              },
            }}
          />
         
        </div>

        {/* Title and Subtitle */}
        <div className="has-text-centered mt-5">
          <h1 className="title is-5 mb-0 has-text-link">{title}</h1>
          <p className="has-text-link has-wide-spacing mb-3">NOCTOSCOPE</p>
  
          <p className="is-family-primary is-6 has-text-link">{subtitle}</p>
        </div>

        {/* Platform List */}
        <div className="mt-5">
          {platforms.map(({ platform, url }) => {
            const Icon = iconMap[platform.toLowerCase()]
            if (!url || !Icon) {
              console.warn(`Missing platform or icon for: ${platform}`)
              return null
            }
            return (
              <div
                key={platform}
                className="box has-background-white is-flex is-align-items-center is-justify-content-space-between mb-3"
                style={{ borderRadius: "8px", padding: "1rem 1.5rem" }}
              >
                <div className="is-flex is-align-items-center">
                  <Icon style={{ width: "2rem", height: "2rem", marginRight: "0.75rem" }} />
                  <div>
                    <div className="has-text-weight-semibold">{platform}</div>
            
                  </div>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button is-small is-outlined is-black"
                  style={{ minWidth: "72px" }}
                  onClick={() => {
                    trackEvent({
                      metaEventName: 'PlayLinkClick',
                      ga4EventName: 'play_link_click',
                      payload: {
                        platform: platform,
                        url: url,
                      },
                    });
                  }}
                >
                  Play
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LinkFireish
