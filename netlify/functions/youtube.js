exports.handler = async function () {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`

  try {
    const res = await fetch(searchUrl)
    const data = await res.json()

    console.log("YouTube API Response:", JSON.stringify(data, null, 2))

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
      )}&part=snippet,contentDetails`
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
          thumbnail: snippet?.thumbnails?.high?.url,
          published: snippet?.publishedAt,
          tags,
          duration: detail?.contentDetails?.duration,
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
        tags: video.snippet?.tags || [],
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
