import React from "react"
import PropTypes from "prop-types"

const VideoThumbnailCard = ({ video, onClick }) => {
  return (
    <div className="video-card video-thumbnail-card" onClick={() => onClick(video)}>
      <div className="video-card-image">
        <figure className="image is-16by9">
          <img src={video.thumbnail} alt={video.title} />
        </figure>
      </div>
      <div className="video-card-content">
        <p className="title is-6">{video.title}</p>
        {video.publishedAt && (
          <p className="subtitle is-7">
            {new Date(video.publishedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}

VideoThumbnailCard.propTypes = {
  video: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default VideoThumbnailCard
