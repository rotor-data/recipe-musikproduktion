import React from "react"
import PropTypes from "prop-types"
import PlyrYouTubePlayer from "./PlyrYoutubePlayer"

const VideoModal = ({ video, onClose }) => {
  if (!video) return null

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-content">
        <div className="box">
          <PlyrYouTubePlayer videoId={video.id} />
          <h3 className="title is-5 mt-3">{video.title}</h3>
          <p>{video.description}</p>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      />
    </div>
  )
}

VideoModal.propTypes = {
  video: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}

export default VideoModal
