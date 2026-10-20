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
    this.state = { crashed: null, broken: [] }
    this.markBroken = this.markBroken.bind(this)
    this.clearBroken = this.clearBroken.bind(this)
    // Decap grabs isValid off the instance without binding it (Widget.js:32)
    // and later calls it bare, so an unbound method would lose `this`.
    this.isValid = this.isValid.bind(this)
  }

  // An upload that fails halfway still lands in the repo, as a file of zero
  // bytes. The build then dies on it, which is how the site stood still for a
  // day. The grid tells us when an image cannot be decoded; remember those.
  markBroken(path) {
    if (!path || this.state.broken.includes(path)) return
    this.setState(state =>
      state.broken.includes(path) ? null : { broken: [...state.broken, path] }
    )
    // Decap validates a field when its value changes, and an image failing to
    // load is not a value change — so the save would go through on a
    // validation made before we knew. Hand the same value back to ask for a
    // fresh one.
    if (typeof this.props.onChange === "function") {
      this.props.onChange(this.props.value)
    }
  }

  clearBroken(path) {
    if (!path) return
    this.setState(state =>
      state.broken.includes(path) ? { broken: state.broken.filter(p => p !== path) } : null
    )
  }

  // Decap reads this off the control instance (Widget.js:32) and refuses to
  // save while it returns an error, so a broken image cannot reach the repo.
  isValid() {
    const { broken } = this.state
    if (!broken.length) return true
    const names = broken.map(p => p.split("/").pop()).join(", ")
    return {
      error: {
        message:
          broken.length === 1
            ? `Bilden ${names} går inte att läsa — uppladdningen misslyckades. Ta bort den ur galleriet och ladda upp den igen.`
            : `${broken.length} bilder går inte att läsa: ${names}. Ta bort dem ur galleriet och ladda upp dem igen.`,
      },
    }
  }

  // Decap re-renders a widget only when value, classNameWrapper or
  // hasActiveStyle change, unless the widget supplies its own rule
  // (Widget.js). The media library answers through mediaPaths, which is not
  // on that list, so without this the chosen image never reaches the grid.
  // Decap calls this with nextProps alone, so nextState may be missing.
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState && this.state.crashed !== nextState.crashed) return true
    if (nextState && this.state.broken.length !== nextState.broken.length) return true
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

    return (
      <GalleryGridControl
        {...this.props}
        broken={this.state.broken}
        onBroken={this.markBroken}
        onReadable={this.clearBroken}
      />
    )
  }
}

export default GalleryGridWidget
