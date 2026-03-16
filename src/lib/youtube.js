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

export const fetchYoutubeVideos = async () => {
  const res = await fetch("/.netlify/functions/youtube")
  if (!res.ok) {
    throw new Error(`YouTube request failed (${res.status})`)
  }

  const data = await res.json()
  return normalizeYoutubeVideos(data)
}

