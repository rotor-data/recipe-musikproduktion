import React, { useEffect, useState } from "react"
import VideoModal from "../components/VideoModal"
import SeoHead from "../components/SeoHead"
import { fetchYoutubeVideos } from "../lib/youtube"

const descriptionPreview = (text, maxLength = 120) => {
  if (!text) return ""
  const trimmed = text.replace(/\s+/g, " ").trim()
  if (trimmed.length <= maxLength) return trimmed
  return `${trimmed.slice(0, maxLength).trimEnd()}...`
}

const WorkPage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchYoutubeVideos()
        setVideos(data)
      } catch (loadError) {
        console.error("Could not load videos", loadError)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  return (
    <section className="section content-page-shell content-page-shell--gradient">
      <div className="container is-fluid">
        <h1 className="title is-size-1 has-text-white content-page__title">Work</h1>

        {loading && <p className="has-text-grey-light">Loading selected work...</p>}
        {error && (
          <p className="has-text-danger-light">
            Could not load the videos right now. Please try again in a moment.
          </p>
        )}

        {!loading && !error && (
          <div className="work-video-grid">
            {videos.map(video => (
              <button
                key={video.id}
                type="button"
                className="work-video-grid__item"
                onClick={() => setSelectedVideo(video)}
                aria-label={`Play ${video.title}`}
              >
                <img src={video.thumbnail} alt={video.title || "YouTube video"} />
                <span className="work-video-grid__meta">
                  <span className="work-video-grid__name">{video.title}</span>
                  {video.publishedAt && (
                    <span className="work-video-grid__date">
                      {new Date(video.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  {video.description && (
                    <span className="work-video-grid__desc">
                      {descriptionPreview(video.description)}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} gradientBackground />
    </section>
  )
}

export default WorkPage

export const Head = () => (
  <SeoHead
    title="Work | Recipe Music Production"
    description="Selected work from Recipe Music Production."
    slug="/work"
  />
)
