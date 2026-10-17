import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import SeoHead from "../components/SeoHead"
import { cropPositionToObjectPosition } from "../lib/imageCrop"
import VideoModal from "../components/VideoModal"
import { fetchYoutubeVideos } from "../lib/youtube"

export const WorkPageTemplate = ({ content = {} }) => {
  const hero = content?.hero || {}
  // This page is the archive: always the whole channel. Curation happens on
  // the start page instead, so pinning a video there cannot freeze this list.
  const [channelVideos, setChannelVideos] = useState([])
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchYoutubeVideos()
      .then(items => {
        if (!cancelled) setChannelVideos(items)
      })
      .catch(() => {
        if (!cancelled) setChannelVideos([])
      })

    return () => {
      cancelled = true
    }
  }, [])

  const videos = useMemo(() => {
    return channelVideos.map(video => ({
      videoId: video.id,
      youtubeUrl: `https://youtu.be/${video.id}`,
      title: video.title,
      description: video.description,
      subtitle: video.publishedAt
        ? new Date(video.publishedAt).toLocaleDateString("sv-SE")
        : "",
      category: "",
      cropPosition: "center",
      thumbnail: video.thumbnail,
      channelTitle: video.channelTitle,
      publishedAt: video.publishedAt,
      order: 0,
    }))
  }, [channelVideos])
  const [activeFilterLabel, setActiveFilterLabel] = useState("All tracks")

  const filters = useMemo(() => {
    const categories = Array.from(
      new Set(videos.map(video => String(video.category || "").trim()).filter(Boolean))
    )

    return [
      { label: "All tracks", query: "" },
      ...categories.map(category => ({
        label: category,
        query: category.toLowerCase(),
      })),
    ]
  }, [videos])

  const activeFilter =
    filters.find(filter => filter.label === activeFilterLabel) || filters[0]

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

    return videos.filter(video => String(video.category || "").toLowerCase() === query)
  }, [activeFilter, videos])

  return (
    <main className="rec-page rec-work-page">
      <section className="rec-shell rec-work">
        <header className="rec-work__header">
          <div>
            <p className="rec-work__eyebrow">{hero.eyebrow || "Archive // Featured videos"}</p>
            <h1 className="rec-work__title">{hero.title || "Sonic Gallery"}</h1>
          </div>
          <div className="rec-work__status">
            <span className="rec-work__status-label">
              {hero.statusLabel || "Engine state"}
            </span>
            <span className="rec-work__status-value">
              <span className="rec-work__status-dot" />
              {hero.statusValue || "CURATED_LINKS"}
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

            <div className="rec-work__panel rec-work__panel--mono">
              <span className="rec-work__panel-title">Session info</span>
              <div className="rec-work__session-list">
                {["SOURCE: CMS_LINKS", "ITEMS: 5 FEATURED", "FORMAT: YOUTUBE_URL", "MODE: MANUAL"].map((line, index) => (
                  <p key={`${line}-${index}`}>{line}</p>
                ))}
              </div>
            </div>
          </aside>

          <div className="rec-work__videos">
            {filteredVideos.length === 0 && (
              <article className="rec-work__empty">
                <h2>No matching videos</h2>
                <p>Loading the channel, or choose another filter.</p>
              </article>
            )}

            {filteredVideos.map(video => (
              <button
                key={`${video.videoId || video.youtubeUrl}-${video.order}`}
                type="button"
                className="rec-work__card"
                onClick={() => setActiveVideo(video)}
                aria-label={`Play ${video.title}`}
              >
                <div className="rec-work__card-media">
                  {video.thumbnail && (
                    <img
                      src={video.thumbnail}
                      alt={video.title || "YouTube video"}
                      style={{ objectPosition: cropPositionToObjectPosition(video.cropPosition) }}
                    />
                  )}
                  <span className="rec-work__card-play" aria-hidden="true">
                    <span>Watch</span>
                  </span>
                </div>
                <div className="rec-work__card-meta">
                  <p className="rec-work__card-tag">{video.category || "Featured video"}</p>
                  <p className="rec-work__card-title">{video.title}</p>
                  {video.description && <p className="rec-work__card-desc">{video.description}</p>}
                  {video.subtitle && <p className="rec-work__card-date">{video.subtitle}</p>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoModal
          video={{
            id: activeVideo.videoId,
            title: activeVideo.title,
            description: activeVideo.description,
            channelTitle: activeVideo.channelTitle,
            publishedAt: activeVideo.publishedAt,
          }}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </main>
  )
}

WorkPageTemplate.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.shape({
      eyebrow: PropTypes.string,
      title: PropTypes.string,
      statusLabel: PropTypes.string,
      statusValue: PropTypes.string,
    }),
    featuredVideos: PropTypes.arrayOf(
      PropTypes.shape({
        order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        subtitle: PropTypes.string,
        description: PropTypes.string,
        category: PropTypes.string,
        youtubeUrl: PropTypes.string,
        thumbnail: PropTypes.string,
        cropPosition: PropTypes.string,
      })
    ),
  }),
}

const WorkPage = ({ data }) => {
  const content = data?.workPage?.frontmatter || {}
  return <WorkPageTemplate content={content} />
}

export default WorkPage

export const Head = ({ data }) => {
  const meta = data?.workPage?.frontmatter?.meta || {}

  return (
    <SeoHead
      title={meta.title || "Work | Recipe Music Production"}
      description={meta.description || "Selected work from Recipe Music Production."}
      slug="/work"
    />
  )
}

Head.propTypes = {
  data: PropTypes.shape({
    workPage: PropTypes.shape({
      frontmatter: PropTypes.shape({
        meta: PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
        }),
      }),
    }),
  }),
}

export const query = graphql`
  query WorkPageQuery {
    workPage: markdownRemark(frontmatter: { templateKey: { eq: "work-page" } }) {
      frontmatter {
        meta {
          title
          description
        }
        hero {
          eyebrow
          title
          statusLabel
          statusValue
        }
      }
    }
  }
`
