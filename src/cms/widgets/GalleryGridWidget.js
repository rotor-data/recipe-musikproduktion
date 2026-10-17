import React from "react"
import GalleryGridControl from "./GalleryGridControl"
import FallbackListControl from "./FallbackListControl"

// The grid talks to a handful of Decap internals. If a future version stops
// passing one of them, or the grid throws, fall back to an editor built only
// on value and onChange rather than leaving the editor with a blank pane.
class GalleryGridWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = { crashed: null }
  }

  static getDerivedStateFromError(error) {
    return { crashed: error && error.message ? error.message : "oväntat fel" }
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error("Gallery grid widget failed, using the fallback editor", error)
  }

  render() {
    const { value, onChange } = this.props

    if (typeof onChange !== "function") {
      return <FallbackListControl value={value} onChange={() => {}} reason="kan inte spara" />
    }

    if (this.state.crashed) {
      return <FallbackListControl value={value} onChange={onChange} reason={this.state.crashed} />
    }

    return <GalleryGridControl {...this.props} />
  }
}

export default GalleryGridWidget
