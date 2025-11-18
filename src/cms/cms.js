import CMS from "decap-cms-app"
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import PeopleGalleryPreview from './preview-templates/PeopleGalleryPreview'

const ensureLink = (href, options = {}) => {
  const head = document.head || document.getElementsByTagName("head")[0]
  if (!head) {
    return
  }

  const existing = head.querySelector(`link[href="${href}"]`)
  if (existing) {
    return
  }

  const link = document.createElement("link")
  link.rel = options.rel || "stylesheet"
  link.type = options.type || "text/css"
  link.href = href
  if (options.crossOrigin) {
    link.crossOrigin = options.crossOrigin
  }
  head.appendChild(link)
}
CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

loadCustomCmsAssets()

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('people', PeopleGalleryPreview)

function loadCustomCmsAssets() {
  if (typeof window === "undefined") {
    return
  }

  ensureLink("https://use.typekit.net/jni5cuh.css", {
    crossOrigin: "anonymous",
  })
  ensureLink("/admin/custom-cms-css.css")

  if (process.env.NETLIFY_SITE_URL) {
    window.localStorage.setItem("netlifySiteURL", process.env.NETLIFY_SITE_URL)
  }

  if (
    window.location.hostname === "localhost" &&
    window.localStorage.getItem("netlifySiteURL")
  ) {
    console.log(
      `%cnetlifySiteURL: ${window.localStorage.getItem("netlifySiteURL")}`,
      "color: hotpink; font-size: 15px"
    )
  }
}
