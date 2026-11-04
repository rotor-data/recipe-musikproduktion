export const normalizeYoutubeVideos = (input) => {
  if (!Array.isArray(input)) return []

  return input
    .filter(video => video?.id)
    .map(video => ({
      id: video.id,
      title: video.title || "Untitled",
      description: video.description || "",
      thumbnail:
        video.thumbnail ||
        video.thumbnails?.maxres?.url ||
        video.thumbnails?.standard?.url ||
        video.thumbnails?.high?.url ||
        video.thumbnails?.medium?.url ||
        video.thumbnails?.default?.url ||
        "",
      thumbnails: video.thumbnails || null,
      publishedAt: video.publishedAt || video.published || null,
      duration: video.duration || null,
      channelTitle: video.channelTitle || "",
      tags: Array.isArray(video.tags) ? video.tags : [],
      viewCount: video.viewCount || null,
      likeCount: video.likeCount || null,
    }))
  // No sorting here: the order comes from the playlist the editor drags into
  // shape, and re-sorting by date would throw that away.
}

export const getYoutubeVideoId = input => {
  if (!input) return ""
  const raw = String(input).trim()
  if (!raw) return ""

  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) {
    return raw
  }

  try {
    const url = new URL(raw)
    const host = url.hostname.replace(/^www\./i, "").toLowerCase()

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0]
      return /^[a-zA-Z0-9_-]{11}$/.test(id || "") ? id : ""
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const directId = url.searchParams.get("v")
      if (/^[a-zA-Z0-9_-]{11}$/.test(directId || "")) {
        return directId
      }

      const pathParts = url.pathname.split("/").filter(Boolean)
      const idFromPath = pathParts[pathParts.length - 1]
      if (/^[a-zA-Z0-9_-]{11}$/.test(idFromPath || "")) {
        return idFromPath
      }
    }
  } catch (_) {
    return ""
  }

  return ""
}

export const getYoutubeThumbnailFromId = videoId => {
  if (!videoId) return ""
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}


export const fetchYoutubeVideos = async () => {
  const res = await fetch("/.netlify/functions/youtube")
  if (!res.ok) {
    throw new Error(`YouTube request failed (${res.status})`)
  }

  const data = await res.json()
  return normalizeYoutubeVideos(data)
}

// Picking what the start page shows: the videos tagged "featured" on
// YouTube, and only those. Tagging is the whole control — a video that is
// not tagged must not creep onto the start page just because there is room
// for it. With nothing tagged the page falls back to the first few, so it is
// never empty. Curation happens where the videos live, so there is no second
// list to keep in sync. Kept pure so it can be tested without a browser or
// the API.
export const selectStartPageVideos = (channel, limit = 5) => {
  const all = Array.isArray(channel) ? channel : []
  const isFeatured = video =>
    Boolean(
      video &&
        (video.highlight ||
          (video.tags || []).some(tag => String(tag).toLowerCase() === "featured"))
    )

  const featured = all.filter(isFeatured)

  return {
    source: featured.length ? "tagged" : "latest",
    videos: (featured.length ? featured : all).slice(0, limit),
  }
}
