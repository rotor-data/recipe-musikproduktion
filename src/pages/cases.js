import React, { useEffect, useMemo, useState } from "react"

const CasesHighlightColumn = ({ videos, layout = "twoTop" }) => {
  if (!videos?.length) {
    return null
  }

  const renderVideoCard = (video, styleClass) => (
    <a
      key={video.id}
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noreferrer"
      className={`cases-highlight-video cases-dashed ${styleClass}`}
    >
      <div className="cases-highlight-video-media">
        {video.thumbnail && (
          <img src={video.thumbnail} alt={video.title || "YouTube highlight"} />
        )}
        <div className="cases-highlight-video-overlay">
          <p className="cases-video-card-title has-text-weight-bold is-size-5 is-size-6-mobile m-0">
            {video.title}
          </p>
          {video.description && (
            <p className="cases-video-card-description is-size-7 is-size-7-mobile m-0 has-text-light">
              {video.description}
            </p>
          )}
          <span className="cases-video-card-cta is-size-7 has-text-link has-text-weight-semibold">
            Spela upp ↗
          </span>
        </div>
      </div>
    </a>
  )

  const highlightVideo = videos.find(video => video.highlight) || videos[0]
  const others = videos.filter(video => video.id !== highlightVideo.id)

  if (layout === "twoTop") {
    const topVideos = others.slice(0, 2)
    return (
      <div className="column is-half-desktop cases-highlight-column">
        <div className="cases-highlight-grid">
          <div className="cases-highlight-grid-row">
            {topVideos.map(video => renderVideoCard(video, "cases-highlight-grid-compact"))}
          </div>
          {highlightVideo && renderVideoCard(highlightVideo, "cases-highlight-grid-prop")}
        </div>
      </div>
    )
  }

  const bottomVideos = others.slice(0, 2)

  return (
    <div className="column is-half-desktop cases-highlight-column">
      <div className="cases-highlight-grid">
        {highlightVideo && renderVideoCard(highlightVideo, "cases-highlight-grid-prop")}
        <div className="cases-highlight-grid-row">
          {bottomVideos.map(video => renderVideoCard(video, "cases-highlight-grid-compact"))}
        </div>
      </div>
    </div>
  )
}

const CasesVideoBlocks = ({ videoChunks }) => {
  if (!videoChunks.length) {
    return null
  }

  return (
    <section className="section py-5 cases-video-section">
      <div className="container is-fluid">
        {videoChunks.map((chunkPair, rowIndex) => {
          const [firstChunk, secondChunk] = chunkPair
          const highlightPosition = rowIndex % 2 === 0 ? "left" : "right"
          const containsHighlight = chunk =>
            (chunk || []).some(video => video.highlight)

          const highlightChunk = containsHighlight(firstChunk)
            ? firstChunk
            : containsHighlight(secondChunk)
              ? secondChunk
              : firstChunk || secondChunk
          const secondaryChunk = highlightChunk === firstChunk ? secondChunk : firstChunk

          const leftElement =
            highlightPosition === "left"
              ? highlightChunk && (
                  <CasesHighlightColumn
                    videos={highlightChunk}
                    layout="twoTop"
                    key={`highlight-left-${rowIndex}`}
                  />
                )
              : secondaryChunk && (
                  <CasesHighlightColumn
                    videos={secondaryChunk}
                    layout="twoTop"
                    key={`highlight-left-${rowIndex}`}
                  />
                )

          const rightElement =
            highlightPosition === "left"
              ? secondaryChunk && (
                  <CasesHighlightColumn
                    videos={secondaryChunk}
                    layout="oneTop"
                    key={`highlight-right-${rowIndex}`}
                  />
                )
              : highlightChunk && (
                  <CasesHighlightColumn
                    videos={highlightChunk}
                    layout="oneTop"
                    key={`highlight-right-${rowIndex}`}
                  />
                )

          if (!leftElement && !rightElement) {
            return null
          }

          return (
            <div className="columns is-variable is-2 cases-block" key={`cases-block-${rowIndex}`}>
              {leftElement}
              {rightElement}
            </div>
          )
        })}
      </div>
    </section>
  )
}

const CasesPage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadVideos = async () => {
      console.log("Cases page: requesting YouTube videos")
      try {
        const res = await fetch("/.netlify/functions/youtube")
        console.log("Cases page: fetch response status", res.status)
        const data = await res.json()
        console.log("Cases page: youtube data", data)
        if (Array.isArray(data) && data.length > 0) {
          setVideos(data)
        } else {
          console.warn("Cases page: youtube data empty or invalid", data)
          setError(true)
        }
      } catch (error) {
        console.error("Cases page: youtube fetch failed", error)
        setError(true)
      } finally {
        console.log("Cases page: youtube fetch completed")
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  const chunkPairs = useMemo(() => {
    if (!videos.length) {
      return []
    }

    const chunkSize = 3
    const chunks = []
    const normalizeChunk = chunk =>
      (chunk || [])
        .filter(Boolean)
        .sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))
    for (let i = 0; i < videos.length; i += chunkSize) {
      chunks.push(normalizeChunk(videos.slice(i, i + chunkSize)))
    }

    const pairs = []
    for (let i = 0; i < chunks.length; i += 2) {
      pairs.push([chunks[i], chunks[i + 1]])
    }

    return pairs
  }, [videos])

  return (
    <>
      <section className="section">
        <div className="container">
          {loading && <p className="has-text-grey">Hämtar case-videos…</p>}
          {error && (
            <p className="has-text-danger">
              Det gick inte att hämta videorna just nu. Försök igen om en stund.
            </p>
          )}
        </div>
      </section>
      <CasesVideoBlocks videoChunks={chunkPairs} />
    </>
  )
}

export default CasesPage
