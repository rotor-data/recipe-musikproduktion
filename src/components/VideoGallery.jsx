import React, { useState, useMemo } from "react"
import VideoThumbnailCard from "./VideoThumbnailCard"
import VideoModal from "./VideoModal"

const VideoGallery = ({ videos }) => {
  const [selected, setSelected] = useState(null)
  const [filterText, setFilterText] = useState("")
  const [sortKey, setSortKey] = useState("publishedAt") // or "title"
  const [sortDir, setSortDir] = useState("desc")

  // Filter / search
  const filtered = useMemo(() => {
    return videos.filter(v =>
      v.title.toLowerCase().includes(filterText.toLowerCase())
    )
  }, [videos, filterText])

  // Sort
  const sorted = useMemo(() => {
    return filtered.slice().sort((a, b) => {
      let va = a[sortKey] || ""
      let vb = b[sortKey] || ""
      if (sortKey === "publishedAt") {
        va = new Date(va)
        vb = new Date(vb)
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1
      if (va > vb) return sortDir === "asc" ? 1 : -1
      return 0
    })
  }, [filtered, sortKey, sortDir])

  const handleOpen = video => {
    setSelected(video)
  }
  const handleClose = () => {
    setSelected(null)
  }

  return (
    <div className="video-gallery">
      <div className="field is-grouped mb-4">
        <p className="control">
          <input
            className="input"
            type="text"
            placeholder="Search videos"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </p>
        <p className="control">
          <span className="select">
            <select
              value={sortKey}
              onChange={e => setSortKey(e.target.value)}
            >
              <option value="publishedAt">Date</option>
              <option value="title">Title</option>
            </select>
          </span>
        </p>
        <p className="control">
          <button
            className="button"
            onClick={() =>
              setSortDir(prev => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {sortDir === "asc" ? "↑ Asc" : "↓ Desc"}
          </button>
        </p>
      </div>

      <div className="columns is-multiline">
        {sorted.map(video => (
          <div key={video.id} className="column is-half">
            <VideoThumbnailCard video={video} onClick={handleOpen} />
          </div>
        ))}
      </div>

      <VideoModal video={selected} onClose={handleClose} />
    </div>
  )
}

export default VideoGallery
