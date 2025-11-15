const React = require("react")
const Layout = require("./src/components/Layout").default

if (typeof global.ResizeObserver === "undefined") {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  global.ResizeObserver = ResizeObserverMock
}

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "sv" })
}

exports.wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}
