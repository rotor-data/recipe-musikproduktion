// Turning a Spotify link into an embeddable one. The address of the player
// is the address of the thing with /embed/ inserted, so no key, no token and
// no request at build time: paste a link in the CMS and the player works.
//
// Spotify's oEmbed endpoint would also hand over the title and the cover,
// but the editor writes their own heading here, so there is nothing to fetch
// and nothing to fail.
const KINDS = ["playlist", "album", "track", "artist", "episode", "show"]

const ID = /^[a-zA-Z0-9]{22}$/

// Accepts a full link, an /embed/ link, a spotify:playlist:<id> URI, a bare
// playlist id, or the whole <iframe> snippet from Spotify's Embed option —
// which is just as easy to copy as the plain link, so it should not have to
// be explained.
export const parseSpotifyLink = input => {
  if (!input) return null
  let raw = String(input).trim()
  if (!raw) return null

  if (raw.includes("<")) {
    const embedded = raw.match(/https:\/\/[^"'\s>]*open\.spotify\.com[^"'\s>]*/i)
    if (!embedded) return null
    raw = embedded[0]
  }

  if (ID.test(raw)) {
    return { kind: "playlist", id: raw }
  }

  const uri = raw.match(/^spotify:([a-z]+):([a-zA-Z0-9]{22})$/)
  if (uri && KINDS.includes(uri[1])) {
    return { kind: uri[1], id: uri[2] }
  }

  try {
    const url = new URL(raw)
    if (!/(^|\.)spotify\.com$/i.test(url.hostname)) return null

    // Localised links carry the market first: /intl-sv/playlist/<id>.
    const parts = url.pathname.split("/").filter(Boolean)
    const kindAt = parts.findIndex(part => KINDS.includes(part))
    if (kindAt === -1) return null

    const kind = parts[kindAt]
    const id = parts[kindAt + 1]
    return ID.test(id || "") ? { kind, id } : null
  } catch (_) {
    return null
  }
}

export const getSpotifyEmbedUrl = input => {
  const parsed = parseSpotifyLink(input)
  if (!parsed) return ""
  return `https://open.spotify.com/embed/${parsed.kind}/${parsed.id}`
}

// A playlist, album or artist player lists what is in it and needs the room;
// a single track or episode is one row.
export const getSpotifyEmbedHeight = input => {
  const parsed = parseSpotifyLink(input)
  if (!parsed) return 0
  return parsed.kind === "track" || parsed.kind === "episode" ? 152 : 420
}
