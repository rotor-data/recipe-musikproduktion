import * as React from "react"
import Layout from "../components/Layout"
import useSiteText from "../lib/useSiteText"

const NotFoundPage = () => {
  const { notFound } = useSiteText()

  return (
    <Layout>
      <div>
        {notFound.title && <h1>{notFound.title}</h1>}
        {notFound.body && <p>{notFound.body}</p>}
      </div>
    </Layout>
  )
}

export default NotFoundPage
