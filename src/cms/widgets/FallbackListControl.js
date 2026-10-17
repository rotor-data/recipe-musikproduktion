import React from "react"

// Shown when the grid cannot run against this version of Decap. It uses
// nothing but value/onChange, the two props that have never changed, so an
// editor can still read and fix the content instead of facing a blank pane.
const toArray = value => {
  if (!value) return []
  if (typeof value.toJS === "function") return value.toJS()
  return Array.isArray(value) ? value : []
}

const FallbackListControl = ({ value, onChange, reason }) => {
  const items = toArray(value)

  const patch = (index, key, val) => {
    const next = items.slice()
    next[index] = { ...(next[index] || {}), [key]: val }
    onChange(next)
  }

  return (
    <div className="gg-fallback">
      <p className="gg-fallback__notice">
        Bildrutnätet kunde inte visas{reason ? ` (${reason})` : ""}. Innehållet går
        fortfarande att redigera här nedanför, och inget har gått förlorat. Säg till
        så fixar vi rutnätet.
      </p>
      {items.map((item, index) => (
        <div className="gg-fallback__row" key={`${(item && item.src) || "image"}-${index}`}>
          <code>{(item && item.src) || "(ingen bild)"}</code>
          <label>
            <span>Namn</span>
            <input
              type="text"
              value={(item && item.title) || ""}
              onChange={event => patch(index, "title", event.target.value)}
            />
          </label>
          <label>
            <span>Alt-text</span>
            <input
              type="text"
              value={(item && item.alt) || ""}
              onChange={event => patch(index, "alt", event.target.value)}
            />
          </label>
          <label className="gg-fallback__check">
            <input
              type="checkbox"
              checked={Boolean(item && item.featured)}
              onChange={event => patch(index, "featured", event.target.checked)}
            />
            <span>Utvald</span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default FallbackListControl
