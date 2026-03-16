exports.handler = async function () {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  if (!apiKey || !channelId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing YouTube API config" }),
    }
  }

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&type=video&maxResults=50`

  try {
    const res = await fetch(searchUrl)
    const data = await res.json()

    if (!Array.isArray(data.items)) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      }
    }

    const videos = data.items
      ?.filter(item => item.id.kind === "youtube#video")
      .map(item => ({
        id: item.id.videoId,
        snippet: item.snippet,
      }))

    const videoIds = videos?.map(video => video.id).filter(Boolean)

    let enrichedVideos = videos

    if (videoIds?.length) {
      const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds.join(
        ","
      )}&part=snippet,contentDetails,statistics`
      const detailRes = await fetch(videosUrl)
      const detailData = await detailRes.json()
      const detailMap = new Map(
        detailData.items?.map(item => [item.id, item]) || []
      )

      enrichedVideos = videos.map(video => {
        const detail = detailMap.get(video.id)
        const snippet = detail?.snippet || video.snippet
        const tags = snippet?.tags || []
        const tidyTags = tags.map(tag => (tag || "").toLowerCase())
        const highlightLayout = tidyTags.includes("layout-one")
          ? "oneTop"
          : "twoTop"
        const highlight = tidyTags.includes("featured")
        return {
          id: video.id,
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
          highlightLayout,
          highlight,
        }
      })
    } else {
      enrichedVideos = videos.map(video => ({
        id: video.id,
        title: video.snippet?.title,
        description: video.snippet?.description,
        thumbnail: video.snippet?.thumbnails?.high?.url,
        published: video.snippet?.publishedAt,
        publishedAt: video.snippet?.publishedAt,
        channelTitle: video.snippet?.channelTitle,
        tags: video.snippet?.tags || [],
        thumbnails: video.snippet?.thumbnails,
        highlightLayout: "twoTop",
        highlight: false,
      }))
    }

    return {
      statusCode: 200,
      body: JSON.stringify(enrichedVideos || []),
    }
  } catch (error) {
    console.error("YouTube fetch error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch YouTube videos" }),
    }
  }
}
