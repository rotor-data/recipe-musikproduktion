import React from "react"
import PropTypes from "prop-types"
import { getSpotifyEmbedUrl, getSpotifyEmbedHeight } from "../lib/spotify"

// The players sit at the foot of the Work page, in the order the editor put
// them in. A row whose link Spotify cannot be made sense of is left out
// rather than rendered as an empty frame, and a list with nothing usable in
// it renders nothing at all.
const SpotifyPlaylists = ({ playlists = [] }) => {
  const items = (Array.isArray(playlists) ? playlists : [])
    .map(item => ({ ...item, embedUrl: getSpotifyEmbedUrl(item?.url) }))
    .filter(item => item.embedUrl)

  if (!items.length) return null

  return (
    <section className="rec-shell rec-spotify">
      {items.map(item => (
        <article className="rec-spotify__item" key={item.embedUrl}>
          {item.title && <h2 className="rec-spotify__title">{item.title}</h2>}
          {item.description && (
            <p className="rec-spotify__desc">{item.description}</p>
          )}
          <iframe
            className="rec-spotify__player"
            src={item.embedUrl}
            title={item.title || "Spotify"}
            height={getSpotifyEmbedHeight(item.url)}
            frameBorder="0"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </article>
      ))}
    </section>
  )
}

SpotifyPlaylists.propTypes = {
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

export default SpotifyPlaylists
