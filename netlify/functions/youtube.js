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

// 50 is the most either endpoint will take in one call, so both the reading
// of a list and the looking up of details have to be done in pages. Without
// this the 51st video does not go missing on its own: videos.list rejects
// the whole request, and the page comes back empty.
const PAGE = 50

const playlistVideoIds = async (apiKey, playlistId) => {
  const ids = []
  let pageToken = ""

  // A guard rather than a while (true): a page token that never settles
  // would otherwise spin until the function times out.
  for (let page = 0; page < 10; page += 1) {
    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems` +
      `?key=${apiKey}&playlistId=${playlistId}` +
      `&part=contentDetails&maxResults=${PAGE}` +
      (pageToken ? `&pageToken=${pageToken}` : "")

    const res = await fetch(url)
    const data = await res.json()
    ids.push(
      ...(data.items || []).map(item => item?.contentDetails?.videoId).filter(Boolean)
    )

    pageToken = data.nextPageToken || ""
    if (!pageToken) break
  }

  return ids
}

const videoDetails = async (apiKey, videoIds) => {
  const found = new Map()

  for (let at = 0; at < videoIds.length; at += PAGE) {
    const batch = videoIds.slice(at, at + PAGE)
    const url =
      `https://www.googleapis.com/youtube/v3/videos` +
      `?key=${apiKey}&id=${batch.join(",")}&part=snippet,contentDetails,statistics`

    const res = await fetch(url)
    const data = await res.json()
    if (data.error) {
      throw new Error(data.error.message || "videos.list failed")
    }

    for (const item of data.items || []) {
      found.set(item.id, item)
    }
  }

  return found
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

    // Not cached, unlike a real answer: if YouTube is down or the key has
    // been revoked this is indistinguishable from a channel with nothing in
    // it, and caching it would leave the page empty for a day over a hiccup
    // that lasted a minute.
    if (!videoIds.length) {
      return {
        statusCode: 503,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        body: JSON.stringify({ error: "No videos came back from YouTube" }),
      }
    }

    // The only place tags, duration and counts come from.
    const detailMap = await videoDetails(apiKey, videoIds)

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
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ error: "Failed to fetch YouTube videos" }),
    }
  }
}
