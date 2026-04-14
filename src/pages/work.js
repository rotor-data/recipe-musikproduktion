import React, { useEffect, useMemo, useState } from "react"
import VideoModal from "../components/VideoModal"
import SeoHead from "../components/SeoHead"
import { fetchYoutubeVideos } from "../lib/youtube"

const formatDate = dateValue => {
  if (!dateValue) return ""
  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const WorkPage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [activeFilterLabel, setActiveFilterLabel] = useState("All tracks")

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

  const filters = useMemo(() => {
    const tagSet = new Set()
    videos.forEach(video => {
      ;(video.tags || []).forEach(tag => {
        const value = String(tag || "").trim()
        if (value) {
          tagSet.add(value)
        }
      })
    })

    const dynamic = Array.from(tagSet)
      .slice(0, 6)
      .map(tag => ({ label: tag, query: tag.toLowerCase() }))

    return [{ label: "All tracks", query: "" }, ...dynamic]
  }, [videos])

  const activeFilter = filters.find(filter => filter.label === activeFilterLabel) || filters[0]

  useEffect(() => {
    if (!filters.some(filter => filter.label === activeFilterLabel)) {
      setActiveFilterLabel(filters[0]?.label || "All tracks")
    }
  }, [activeFilterLabel, filters])

  const filteredVideos = useMemo(() => {
    const query = activeFilter?.query?.trim()?.toLowerCase()
    if (!query) {
      return videos
    }

    return videos.filter(video => {
      const text = [video.title, video.description, ...(video.tags || [])]
        .join(" ")
        .toLowerCase()
      return text.includes(query)
    })
  }, [activeFilter, videos])

  return (
    <main className="rec-page rec-work-page">
      <section className="rec-shell rec-work">
        <header className="rec-work__header">
          <div>
            <p className="rec-work__eyebrow">Archive // Selected works</p>
            <h1 className="rec-work__title">Sonic Gallery</h1>
          </div>
          <div className="rec-work__status">
            <span className="rec-work__status-label">Engine state</span>
            <span className="rec-work__status-value">
              <span className="rec-work__status-dot" />
              ACTIVE_OUTPUT
            </span>
          </div>
        </header>

        <div className="rec-work__grid">
          <aside className="rec-work__sidebar">
            <div className="rec-work__panel">
              <span className="rec-work__panel-title">Filter categories</span>
              <div className="rec-work__filters">
                {filters.map(filter => {
                  const isActive = filter.label === activeFilterLabel
                  return (
                    <button
                      key={filter.label}
                      type="button"
                      className={`rec-work__filter${isActive ? " is-active" : ""}`}
                      onClick={() => setActiveFilterLabel(filter.label)}
                    >
                      {filter.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rec-work__panel">
              <span className="rec-work__panel-title">Signal strength</span>
              <div className="rec-work__meter" aria-hidden="true">
                <span style={{ height: "24%" }} />
                <span style={{ height: "48%" }} />
                <span style={{ height: "76%" }} />
                <span style={{ height: "58%" }} />
                <span style={{ height: "92%" }} />
                <span style={{ height: "34%" }} />
                <span style={{ height: "62%" }} />
                <span style={{ height: "72%" }} />
              </div>
            </div>

            <div className="rec-work__panel rec-work__panel--mono">
              <span className="rec-work__panel-title">Session info</span>
              <div className="rec-work__session-list">
                {["REC_PORT: 8080", "BUFFER: 512 SAMPLES", "CLK: INTERNAL", "MASTER_V: -2.4dB"].map((line, index) => (
                  <p key={`${line}-${index}`}>{line}</p>
                ))}
              </div>
            </div>
          </aside>

          <div className="rec-work__videos">
            {loading && (
              <p className="rec-work__state">Loading selected work...</p>
            )}

            {error && (
              <p className="rec-work__state rec-work__state--error">
                Could not load videos right now. Please try again.
              </p>
            )}

            {!loading && !error && filteredVideos.length === 0 && (
              <article className="rec-work__empty">
                <h2>No matching videos</h2>
                <p>Try another filter or check back soon for new releases.</p>
              </article>
            )}

            {!loading && !error && filteredVideos.map(video => (
              <button
                key={video.id}
                type="button"
                className="rec-work__card"
                onClick={() => setSelectedVideo(video)}
                aria-label={`Play ${video.title}`}
              >
                <div className="rec-work__card-media">
                  <img src={video.thumbnail} alt={video.title || "YouTube video"} />
                  <span className="rec-work__card-play" aria-hidden="true">
                    <span>Play</span>
                  </span>
                </div>
                <div className="rec-work__card-meta">
                  <p className="rec-work__card-tag">
                    {(video.tags && video.tags[0]) || "Selected work"}
                  </p>
                  <p className="rec-work__card-title">{video.title}</p>
                  {video.description && (
                    <p className="rec-work__card-desc">
                      {video.description.replace(/\s+/g, " ").trim().slice(0, 140)}
                      {video.description.length > 140 ? "..." : ""}
                    </p>
                  )}
                  <p className="rec-work__card-date">
                    {formatDate(video.publishedAt) || "YouTube"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </main>
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
