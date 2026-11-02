const fs = require("fs")
const path = require("path")

// Deleting a picture in the media library should make it disappear from the
// page, not stop the site from building.
//
// gatsby-remark-relative-images rewrites absolute frontmatter paths so that
// childImageSharp can resolve them, and throws the moment one has no file
// behind it. It offers no way to soften that, and its onCreateNode runs
// before the site's own, so the site cannot clean up after it.
//
// This plugin does the cleaning first. Listed ahead of the transformer in
// gatsby-config, it blanks any absolute frontmatter path with no file, so the
// library never sees a dangling one. The field then resolves to null, the
// template renders without the image, and the build carries on. It warns, so
// an accidental delete is still visible in the deploy log.
const STATIC_DIR = path.join(process.cwd(), "static")

const blankMissing = (value, missing) => {
  if (Array.isArray(value)) return value.map(item => blankMissing(item, missing))
  if (value && typeof value === "object") {
    return Object.keys(value).reduce((acc, key) => {
      acc[key] = blankMissing(value[key], missing)
      return acc
    }, {})
  }
  // Match what the library picks up: absolute, and with a file extension.
  if (typeof value === "string" && path.isAbsolute(value) && path.extname(value)) {
    const onDisk = path.join(STATIC_DIR, value)
    let size = -1
    try {
      size = fs.statSync(onDisk).size
    } catch (error) {
      size = -1
    }
    // -1 is no file at all. 0 is an upload that died halfway and left an empty
    // one behind; it gets past existsSync, and probe-image-size then kills the
    // build on it — which is what ante-filip.jpg did for twelve days.
    if (size <= 0) {
      missing.push(`${value}${size === 0 ? " (tom fil)" : ""}`)
      return null
    }
  }
  return value
}

exports.onCreateNode = ({ node, reporter }) => {
  const type = node.internal && node.internal.type
  if (type !== "MarkdownRemark" && type !== "Mdx") return
  if (!node.fileAbsolutePath || !node.frontmatter) return

  const missing = []
  node.frontmatter = blankMissing(node.frontmatter, missing)

  if (missing.length) {
    reporter.warn(
      `${path.relative(process.cwd(), node.fileAbsolutePath)}: ` +
        `left out ${missing.length} image(s) with no file behind them — ${missing.join(", ")}`
    )
  }
}
