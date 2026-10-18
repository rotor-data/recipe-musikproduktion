import React, { useEffect, useMemo, useRef, useState } from "react"

// Decap hands the value over as an Immutable List. Nothing else in this file
// needs Immutable, so normalise once here and write plain arrays back.
const toArray = value => {
  if (!value) return []
  if (typeof value.toJS === "function") return value.toJS()
  return Array.isArray(value) ? value : []
}

const MAX_FEATURED = 5

const GalleryGridControl = props => {
  const {
    value,
    onChange,
    getAsset,
    onOpenMediaLibrary,
    onRemoveInsertedMedia,
    mediaPaths,
    forID,
    classNameWrapper,
    field,
  } = props

  const items = useMemo(() => toArray(value), [value])
  const [selected, setSelected] = useState(null)
  const [notice, setNotice] = useState(null)
  const [moving, setMoving] = useState(null)
  const pendingRef = useRef(null)

  const featuredCount = items.filter(item => item && item.featured).length

  const write = next => onChange(next)

  // The media library answers asynchronously: it writes the chosen path into
  // mediaPaths under the control id we opened it with.
  const mediaPath =
    mediaPaths && typeof mediaPaths.get === "function" ? mediaPaths.get(forID) : null

  useEffect(() => {
    if (!mediaPath || !pendingRef.current) return
    const path = typeof mediaPath === "string" ? mediaPath : String(mediaPath)
    const { mode, index } = pendingRef.current
    pendingRef.current = null

    if (mode === "add") {
      write([...items, { featured: false, title: "", subtitle: "", alt: "", src: path, cropPosition: "center" }])
      setSelected(items.length)
    } else if (mode === "replace" && items[index]) {
      const next = items.slice()
      next[index] = { ...next[index], src: path }
      write(next)
    }

    // Decap leaves the chosen path under our control id. Clear it, or picking
    // the same image a second time reads as a dead button.
    if (typeof onRemoveInsertedMedia === "function") onRemoveInsertedMedia(forID)
  }, [mediaPath]) // eslint-disable-line react-hooks/exhaustive-deps

  // The media library is the part of Decap most likely to move. When it is
  // not reachable, ask for a path by hand instead of offering a dead button.
  const hasMediaLibrary =
    typeof onOpenMediaLibrary === "function" && mediaPaths && typeof mediaPaths.get === "function"

  const openLibrary = (mode, index) => {
    if (hasMediaLibrary) {
      pendingRef.current = { mode, index }
      onOpenMediaLibrary({ controlID: forID, forImage: true, value: "", field })
      return
    }

    const current = mode === "replace" && items[index] ? items[index].src || "" : ""
    // eslint-disable-next-line no-alert
    const path = window.prompt("Sökväg till bilden, till exempel /img/namn.jpg", current)
    if (!path) return

    if (mode === "add") {
      write([...items, { featured: false, title: "", subtitle: "", alt: "", src: path, cropPosition: "center" }])
      setSelected(items.length)
    } else if (items[index]) {
      const next = items.slice()
      next[index] = { ...next[index], src: path }
      write(next)
    }
  }

  const toggleFeatured = index => {
    const item = items[index] || {}
    if (!item.featured && featuredCount >= MAX_FEATURED) {
      // Silently doing nothing reads as a broken button, so say why.
      setNotice(`Du har redan ${MAX_FEATURED} utvalda. Ta bort en stjärna först.`)
      return
    }
    setNotice(null)
    const next = items.slice()
    next[index] = { ...item, featured: !item.featured }
    write(next)
  }

  const patch = (index, key, val) => {
    const next = items.slice()
    next[index] = { ...(next[index] || {}), [key]: val }
    write(next)
  }

  const remove = index => {
    const next = items.slice()
    next.splice(index, 1)
    write(next)
    setSelected(null)
  }

  const move = (from, to) => {
    if (from === to || to < 0 || to >= items.length) return
    const next = items.slice()
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    write(next)
    setSelected(to)
  }

  // A path like /img/foo.jpg is a real URL once the entry is published, and
  // letting the browser fetch it keeps 48 full-size photos out of memory.
  const src = item => {
    const path = item && item.src
    return path && typeof path === "string" ? path : ""
  }

  // Until it is published, a freshly uploaded image exists only in the
  // browser, so that path 404s and the cell goes blank. getAsset knows it as
  // a blob. Reaching for that only after the path fails means a published
  // image can never be replaced by an unresolved placeholder.
  const useAssetOnError = event => {
    const img = event.target
    if (!getAsset || img.dataset.triedAsset) return
    img.dataset.triedAsset = "1"
    const asset = getAsset(img.getAttribute("data-path"), field)
    const url = asset ? String(asset) : ""
    if (url && url !== img.src) img.src = url
  }

  const current = selected != null ? items[selected] : null

  return (
    <div className={classNameWrapper}>
      <div className="gg-toolbar">
        <span className="gg-count">
          {items.length} bilder &middot; {featuredCount} av {MAX_FEATURED} utvalda
          {notice && <strong className="gg-notice">{notice}</strong>}
          {moving != null && (
            <strong className="gg-notice gg-notice--move">
              Flyttar bild {moving + 1} — klicka på platsen den ska till.{" "}
              <button type="button" className="gg-cancel" onClick={() => setMoving(null)}>
                Avbryt
              </button>
            </strong>
          )}
        </span>
        <button type="button" className="gg-add" onClick={() => openLibrary("add")}>
          {hasMediaLibrary ? "Lägg till bild" : "Lägg till bild via sökväg"}
        </button>
      </div>

      <div className="gg-grid">
        {items.map((item, index) => (
          <div
            key={`${item && item.src ? item.src : "image"}-${index}`}
            className={`gg-cell${selected === index ? " is-selected" : ""}${
              item && item.featured ? " is-featured" : ""
            }${moving === index ? " is-moving" : ""}${
              moving != null && moving !== index ? " is-target" : ""
            }`}

          >
            <button
              type="button"
              className="gg-thumb"
              onClick={() => {
                if (moving != null) {
                  if (moving !== index) move(moving, index)
                  setMoving(null)
                  return
                }
                setSelected(selected === index ? null : index)
              }}
              title={
                moving != null
                  ? moving === index
                    ? "Klicka på en annan bild för att flytta hit"
                    : "Flytta den valda bilden hit"
                  : "Klicka för att redigera"
              }
            >
              {src(item) ? (
                <img
                  src={src(item)}
                  data-path={src(item)}
                  onError={useAssetOnError}
                  alt=""
                />
              ) : (
                <span className="gg-missing">Ingen bild</span>
              )}
              <span className="gg-pos">{index + 1}</span>
            </button>
            <button
              type="button"
              className="gg-star"
              aria-pressed={Boolean(item && item.featured)}
              title={
                item && item.featured
                  ? "Utvald - klicka för att ta bort"
                  : featuredCount >= MAX_FEATURED
                  ? `Max ${MAX_FEATURED} utvalda`
                  : "Gör till utvald"
              }
              onClick={() => toggleFeatured(index)}
            >
              {item && item.featured ? "★" : "☆"}
            </button>
            <button
              type="button"
              className="gg-move"
              title="Flytta bilden"
              aria-label={`Flytta bild ${index + 1}`}
              onClick={() => {
                setMoving(moving === index ? null : index)
                setNotice(null)
              }}
            >
              ⇄
            </button>
            <span className="gg-name">{(item && item.title) || "Namn saknas"}</span>
          </div>
        ))}
      </div>

      {current && (
        <div className="gg-editor">
          <div className="gg-editor__head">
            <strong>Bild {selected + 1}</strong>
            <button type="button" onClick={() => setSelected(null)}>
              Stäng
            </button>
          </div>

          <label className="gg-field">
            <span>Namn</span>
            <input
              type="text"
              value={current.title || ""}
              placeholder="Vem eller vad bilden föreställer"
              onChange={event => patch(selected, "title", event.target.value)}
            />
          </label>

          <label className="gg-field">
            <span>Underrubrik</span>
            <input
              type="text"
              value={current.subtitle || ""}
              onChange={event => patch(selected, "subtitle", event.target.value)}
            />
          </label>

          <label className="gg-field">
            <span>Alt-text</span>
            <input
              type="text"
              value={current.alt || ""}
              placeholder="Beskriv bilden för den som inte kan se den"
              onChange={event => patch(selected, "alt", event.target.value)}
            />
          </label>

          <label className="gg-field">
            <span>Beskärning</span>
            <select
              value={current.cropPosition || "center"}
              onChange={event => patch(selected, "cropPosition", event.target.value)}
            >
              <option value="top">Överkant</option>
              <option value="center">Mitten</option>
              <option value="bottom">Underkant</option>
            </select>
          </label>

          <div className="gg-editor__actions">
            <button type="button" onClick={() => openLibrary("replace", selected)}>
              Byt bild
            </button>
            <button type="button" onClick={() => move(selected, selected - 1)}>
              Flytta vänster
            </button>
            <button type="button" onClick={() => move(selected, selected + 1)}>
              Flytta höger
            </button>
            <button type="button" className="gg-remove" onClick={() => remove(selected)}>
              Ta bort bild
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryGridControl
