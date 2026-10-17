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
    .sort((a, b) => {
      const left = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const right = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return right - left
    })
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

export const normalizeCmsFeaturedVideos = input => {
  if (!Array.isArray(input)) return []

  return input
    .map(item => {
      const youtubeUrl = item?.youtubeUrl || item?.url || ""
      const videoId = getYoutubeVideoId(youtubeUrl)

      return {
        order: Number(item?.order) || 0,
        title: item?.title || "",
        subtitle: item?.subtitle || "",
        description: item?.description || "",
        category: item?.category || "",
        cropPosition: item?.cropPosition || "center",
        youtubeUrl,
        videoId,
        thumbnail: item?.thumbnail || getYoutubeThumbnailFromId(videoId),
      }
    })
    .filter(item => item.youtubeUrl && item.title)
}

export const fetchYoutubeVideos = async () => {
  const res = await fetch("/.netlify/functions/youtube")
  if (!res.ok) {
    throw new Error(`YouTube request failed (${res.status})`)
  }

  const data = await res.json()
  return normalizeYoutubeVideos(data)
}

// Picking what the start page shows, in order of how explicit the choice is:
// a curated list in the CMS beats everything, then videos tagged "featured"
// on YouTube, then the newest to fill the remaining slots. Kept pure so it
// can be tested without a browser or the API.
export const selectStartPageVideos = (curated, channel, limit = 5) => {
  if (Array.isArray(curated) && curated.length) {
    return { source: "cms", videos: curated.slice(0, limit) }
  }

  const all = Array.isArray(channel) ? channel : []
  const isFeatured = video =>
    Boolean(video && (video.highlight || (video.tags || []).some(tag => String(tag).toLowerCase() === "featured")))

  const featured = all.filter(isFeatured)
  const rest = all.filter(video => !isFeatured(video))

  return {
    source: featured.length ? "tagged" : "latest",
    videos: [...featured, ...rest].slice(0, limit),
  }
}
