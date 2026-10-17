import { graphql, useStaticQuery } from "gatsby"

// Text that appears on every page, or on pages without their own CMS entry.
// Components read it here so nothing has to be hardcoded in a component.
const useSiteText = () => {
  const data = useStaticQuery(graphql`
    query SiteTextQuery {
      markdownRemark(frontmatter: { templateKey: { eq: "site-text" } }) {
        frontmatter {
          footer {
            rightsText
          }
          cookies {
            bannerText
            acceptButton
            customizeButton
            modalAcceptAll
            modalSave
          }
          notFound {
            title
            body
          }
        }
      }
    }
  `)

  const fm = data?.markdownRemark?.frontmatter || {}
  return {
    footer: fm.footer || {},
    cookies: fm.cookies || {},
    notFound: fm.notFound || {},
  }
}

export default useSiteText
