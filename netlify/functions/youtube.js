// The channel's uploads are read through playlistItems rather than search:
// search.list costs 100 quota units per call against a 10 000/day default,
// playlistItems.list costs 1. Together with videos.list that is 2 units a
// call instead of 101, so the response can be cached for minutes rather
// than an hour and a new upload shows up almost immediately.
const CACHE_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=60",
  "Netlify-CDN-Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
}

// Every channel's uploads live in a playlist whose id is the channel id
// with the UC prefix swapped for UU.
const uploadsPlaylistId = channelId =>
  typeof channelId === "string" && channelId.startsWith("UC")
    ? `UU${channelId.slice(2)}`
    : channelId

// The order the videos appear in on the site. YouTube does not let anyone
// reorder a channel's uploads, but a playlist can be dragged into any order,
// so the editor builds one and the site follows it. The id is an env var with
// the current playlist as the default, so the site keeps working if the
// variable is never set and can be pointed at another list without a code
// change.
const ORDER_PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID || "PLRS5cojQPHiE"

const playlistVideoIds = async (apiKey, playlistId) => {
  const url =
    `https://www.googleapis.com/youtube/v3/playlistItems` +
    `?key=${apiKey}&playlistId=${playlistId}` +
    `&part=contentDetails&maxResults=50`

  const res = await fetch(url)
  const data = await res.json()
  return (data.items || []).map(item => item?.contentDetails?.videoId).filter(Boolean)
}

const shape = (id, snippet, detail) => {
  const tags = snippet?.tags || []
  const tidyTags = tags.map(tag => (tag || "").toLowerCase())

  return {
    id,
    title: snippet?.title,
    description: snippet?.description,
    thumbnail:
      snippet?.thumbnails?.maxres?.url ||
      snippet?.thumbnails?.standard?.url ||
      snippet?.thumbnails?.high?.url,
    thumbnails: snippet?.thumbnails,
    published: snippet?.publishedAt,
    publishedAt: snippet?.publishedAt,
    channelTitle: snippet?.channelTitle,
    tags,
    duration: detail?.contentDetails?.duration,
    viewCount: detail?.statistics?.viewCount,
    likeCount: detail?.statistics?.likeCount,
    highlightLayout: tidyTags.includes("layout-one") ? "oneTop" : "twoTop",
    highlight: tidyTags.includes("featured"),
  }
}

exports.handler = async function () {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  if (!apiKey || !channelId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing YouTube API config" }),
    }
  }

  try {
    // The playlist decides the order. The uploads are read as well and
    // appended, so a video the editor has not put in the playlist yet still
    // shows up rather than silently disappearing from the page.
    const [ordered, uploads] = await Promise.all([
      ORDER_PLAYLIST_ID ? playlistVideoIds(apiKey, ORDER_PLAYLIST_ID) : [],
      playlistVideoIds(apiKey, uploadsPlaylistId(channelId)),
    ])

    const videoIds = [...ordered, ...uploads.filter(id => !ordered.includes(id))]

    if (!videoIds.length) {
      return { statusCode: 200, headers: CACHE_HEADERS, body: JSON.stringify([]) }
    }

    // One more unit, and the only place tags, duration and counts come from.
    const videosUrl =
      `https://www.googleapis.com/youtube/v3/videos` +
      `?key=${apiKey}&id=${videoIds.join(",")}&part=snippet,contentDetails,statistics`

    const detailRes = await fetch(videosUrl)
    const detailData = await detailRes.json()
    const detailMap = new Map((detailData.items || []).map(item => [item.id, item]))

    // Keep the order settled above. Private and deleted videos come back
    // from playlistItems but not from videos.list, so they drop out here.
    const videos = videoIds
      .map(id => {
        const detail = detailMap.get(id)
        return detail ? shape(id, detail.snippet, detail) : null
      })
      .filter(Boolean)

    return { statusCode: 200, headers: CACHE_HEADERS, body: JSON.stringify(videos) }
  } catch (error) {
    console.error("YouTube fetch error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch YouTube videos" }),
    }
  }
}
