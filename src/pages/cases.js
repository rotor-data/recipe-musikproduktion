import React, { useEffect, useMemo, useState } from "react"
import Layout from "../components/Layout"
import FlowGrid from "../components/FlowGrid"

const CasesPage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/.netlify/functions/youtube")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setVideos(data)
        } else {
          setError(true)
        }
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const youtubeChannelId =
    process.env.GATSBY_YOUTUBE_CHANNEL_ID || process.env.YOUTUBE_CHANNEL_ID
  const youtubeChannelUrl = youtubeChannelId
    ? `https://www.youtube.com/channel/${youtubeChannelId}`
    : "https://www.youtube.com"

  const flowBlocks = useMemo(() => {
    if (!videos.length) {
      return []
    }

    return [
      {
        highlight: {
          pretitle: "Cases",
          title: "*Från studion till YouTube*",
          body:
            "Peek into our most recent sessions, collaborations, and behind-the-scenes sound design documented on our YouTube channel.",
          ctaText: "Öppna YouTube",
          ctaLink: youtubeChannelUrl,
          megaHeadline: "CASE STORIES",
        },
        cards: videos.map(video => ({
          title: video.title,
          description: video.description,
          image: video.thumbnail,
          link: `https://www.youtube.com/watch?v=${video.id}`,
          linkLabel: "Spela upp",
        })),
        highlightPosition: "right",
      },
    ]
  }, [videos, youtubeChannelUrl])

  return (
    <Layout>
      <section className="section">
        <div className="container">
          {loading && (
            <p className="has-text-grey">Hämtar case-videos…</p>
          )}
          {error && (
            <p className="has-text-danger">
              Det gick inte att hämta videorna just nu. Försök igen om en stund.
            </p>
          )}
        </div>
      </section>
      <FlowGrid flowBlocks={flowBlocks} />
    </Layout>
  )
}

export default CasesPage
