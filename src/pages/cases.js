import React, { useEffect, useState } from "react"
import VideoGallery from "../components/VideoGallery"

const YouTubeGalleryPage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/.netlify/functions/youtube")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setVideos(data)
          console.log(data)
        } else {
          setError(true)
        }
      })
      .catch(err => {
        console.error("Fetch error:", err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <p className="is-size-5">Loading videos...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <p className="is-size-5 has-text-danger">
            Unable to load videos. Try again later.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">Video Gallery</h1>
        <VideoGallery videos={videos} />
      </div>
    </section>
  )
}

export default YouTubeGalleryPage
