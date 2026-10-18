import React from "react"
import GalleryGridControl from "./GalleryGridControl"
import FallbackListControl from "./FallbackListControl"

const mediaPathOf = props => {
  const { mediaPaths, forID } = props
  return mediaPaths && typeof mediaPaths.get === "function" ? mediaPaths.get(forID) : null
}

// The grid talks to a handful of Decap internals. If a future version stops
// passing one of them, or the grid throws, fall back to an editor built only
// on value and onChange rather than leaving the editor with a blank pane.
class GalleryGridWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = { crashed: null }
  }

  // Decap re-renders a widget only when value, classNameWrapper or
  // hasActiveStyle change, unless the widget supplies its own rule
  // (Widget.js). The media library answers through mediaPaths, which is not
  // on that list, so without this the chosen image never reaches the grid.
  // Decap calls this with nextProps alone, so nextState may be missing.
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState && this.state.crashed !== nextState.crashed) return true
    if (
      this.props.value !== nextProps.value ||
      this.props.classNameWrapper !== nextProps.classNameWrapper ||
      this.props.hasActiveStyle !== nextProps.hasActiveStyle ||
      this.props.getAsset !== nextProps.getAsset
    ) {
      return true
    }
    return mediaPathOf(this.props) !== mediaPathOf(nextProps)
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
