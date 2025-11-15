import React, { useEffect, useRef, useState } from "react"
import Plyr from "plyr"
import "plyr/dist/plyr.css"

const PlyrYouTubePlayer = ({ videoId }) => {
  const playerRef = useRef(null)
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    const player = new Plyr(playerRef.current, {
      youtube: {
        noCookie: true,
        rel: 0,
        modestbranding: 1,
      },
    })

    player.on("ended", () => {
      setEnded(true)
    })

    return () => {
      player.destroy()
    }
  }, [videoId])

  return (
    <div>
      {!ended ? (
        <div
          ref={playerRef}
          className="plyr__video-embed"
          data-plyr-provider="youtube"
          data-plyr-embed-id={videoId}
        />
      ) : (
        <div className="box has-text-centered">
          <h2 className="title is-4">Thanks for watching!</h2>
          <p>Here’s what you can do next:</p>
          <a href="/contact" className="button is-primary mt-4">
            Contact Us
          </a>
        </div>
      )}
    </div>
  )
}

export default PlyrYouTubePlayer
