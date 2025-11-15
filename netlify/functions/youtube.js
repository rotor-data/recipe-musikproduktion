exports.handler = async function () {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`

  try {
    const res = await fetch(apiUrl)
    const data = await res.json()

    console.log("YouTube API Response:", JSON.stringify(data, null, 2))

    const videos = data.items
      ?.filter(item => item.id.kind === "youtube#video")
      .map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
      }))

    return {
      statusCode: 200,
      body: JSON.stringify(videos || []),
    }
  } catch (error) {
    console.error("YouTube fetch error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch YouTube videos" }),
    }
  }
}
