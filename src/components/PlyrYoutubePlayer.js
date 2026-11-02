import React, { useEffect, useRef } from "react"
import "plyr/dist/plyr.css"

const PlyrYouTubePlayer = ({ videoId }) => {
  const playerRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined
    }

    let player
    let mounted = true

    import("plyr").then(({ default: Plyr }) => {
      if (!mounted || !playerRef.current) {
        return
      }

      player = new Plyr(playerRef.current, {
        // The player only ever opens because someone clicked a video, so
        // starting it here saves them pressing play a second time. That same
        // click is what lets the browser allow sound.
        autoplay: true,
        controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
        youtube: {
          noCookie: true,
          rel: 0,
          modestbranding: 1,
          showinfo: 0,
        },
      })

      player.on("ended", () => {
        player.stop()
      })
    })

    return () => {
      mounted = false
      if (player) {
        player.destroy()
      }
    }
  }, [videoId])

  return (
    <div
      ref={playerRef}
      className="plyr__video-embed"
      data-plyr-provider="youtube"
      data-plyr-embed-id={videoId}
    />
  )
}

export default PlyrYouTubePlayer
