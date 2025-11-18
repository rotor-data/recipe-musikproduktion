import React from "react"
import PropTypes from "prop-types"
import PlyrYouTubePlayer from "./PlyrYoutubePlayer"

const VideoModal = ({ video, onClose, gradientBackground = false }) => {
  if (!video) return null

  return (
    <div className="modal is-active">
      <div
        className={`modal-background${gradientBackground ? " cases-video-modal-background" : ""}`}
        onClick={onClose}
      />
      <div className="modal-content video-modal-wrapper">
        <div className="video-modal-body">
          <div className="video-modal-content">
            <PlyrYouTubePlayer videoId={video.id} />
          </div>
          <div className="video-modal-details">
            <h3 className="title is-4">{video.title}</h3>
            {video.description && <p>{video.description}</p>}
          </div>
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
  gradientBackground: PropTypes.bool,
}

export default VideoModal
