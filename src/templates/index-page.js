import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SeoHead from "../components/SeoHead"
import MarkdownRenderer from "../components/MarkdownRenderer"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage"
import { fetchYoutubeVideos } from "../lib/youtube"

export const IndexPageTemplate = ({
  content,
  peopleTeasers = [],
  fallbackLogos = [],
  disableYoutubeFetch = false,
}) => {
  const { hero, pageCopy = {}, solutions = {}, logoBanner = {} } = content
  const [latestVideos, setLatestVideos] = useState([])
  const blocks = pageCopy.flowBlocks || []
  const studioBlock = blocks[0] || {}
  const workBlock = blocks[1] || {}
  const peopleBlock = blocks[2] || {}
  const cmsLogoItems = (logoBanner.logos || [])
    .filter(item => item?.image)
    .map((item, index) => ({
      id: item.alt || `cms-logo-${index}`,
      image: item.image,
      alt: item.alt || "Partner logo",
      href: item.href || "",
    }))
  const logoItems = cmsLogoItems.length ? cmsLogoItems : fallbackLogos

  const serviceCards = [
    ...(studioBlock.cards || []),
    ...(peopleBlock.cards || []),
  ].filter(card => card?.title || card?.description || card?.image)
  const heroPrimaryCtaText = hero?.cta?.primaryText || hero?.cta?.buttonText || "Contact"
  const heroPrimaryCtaHref = hero?.cta?.primaryHref || "/contact"
  const heroSecondaryCtaText =
    hero?.cta?.secondaryText || workBlock.highlight?.ctaText || "View work"
  const heroSecondaryCtaHref =
    hero?.cta?.secondaryHref || workBlock.highlight?.ctaLink || "/work"
  const peoplePrimaryCtaText = peopleBlock.highlight?.ctaText || "Open gallery"
  const peoplePrimaryCtaHref = peopleBlock.highlight?.ctaLink || "/people"
  const peopleSecondaryCtaText =
    peopleBlock.highlight?.secondaryCtaText || "Start a project"
  const peopleSecondaryCtaHref =
    peopleBlock.highlight?.secondaryCtaLink || "/contact"
  const bottomCta = pageCopy.bottomCta || {}

  const workItems = (workBlock.galleryItems || [])
    .filter(item => item?.image && (item?.title || item?.subtitle))
    .slice(0, 3)

  useEffect(() => {
    if (disableYoutubeFetch) {
      setLatestVideos([])
      return undefined
    }

    let active = true

    const loadLatestVideos = async () => {
      try {
        const videos = await fetchYoutubeVideos()
        if (active) setLatestVideos(videos.slice(0, 3))
      } catch (error) {
        console.error("Could not load latest videos", error)
      }
    }

    loadLatestVideos()

    return () => {
      active = false
    }
  }, [disableYoutubeFetch])

  const featuredWorkItems = useMemo(() => {
    if (latestVideos.length) {
      return latestVideos.map(video => ({
        id: video.id,
        title: video.title,
        subtitle: video.publishedAt
          ? new Date(video.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "",
        thumbnail: video.thumbnail,
        link: `https://www.youtube.com/watch?v=${video.id}`,
        external: true,
      }))
    }

    return workItems.map((item, index) => ({
      id: `fallback-${index}`,
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      link: item.link || "/work",
      external: false,
    }))
  }, [latestVideos, workItems])

  const heroImage = getImage(hero?.image)

  return (
    <main className="rec-page rec-start-page">
      <section className="rec-start-hero">
        {heroImage && (
          <div className="rec-start-hero__media">
            <GatsbyImage
              image={heroImage}
              alt=""
              style={{ width: "100%", height: "100%" }}
              imgStyle={{ objectFit: "cover" }}
            />
          </div>
        )}

        <div className="rec-start-hero__overlay rec-shell">
          <div className="rec-start-hero__content">
            {hero?.title && (
              <div className="rec-start-hero__title">
                <MarkdownRenderer markdown={hero.title} />
              </div>
            )}
            {(hero?.description || hero?.h1title) && (
              <div className="rec-start-hero__details">
                {hero?.description && (
                  <div className="rec-start-hero__body">
                    <MarkdownRenderer markdown={hero.description} />
                  </div>
                )}
                {hero?.h1title && (
                  <div className="rec-start-hero__h1-wrap">
                    <span className="rec-start-hero__h1-line" aria-hidden="true" />
                    <h1 className="rec-start-hero__h1-small">{hero.h1title}</h1>
                  </div>
                )}
              </div>
            )}
            <div className="rec-start-hero__actions">
              <a href={heroPrimaryCtaHref} className="rec-button rec-button--primary">
                {heroPrimaryCtaText}
              </a>
              <a href={heroSecondaryCtaHref} className="rec-button rec-button--ghost">
                {heroSecondaryCtaText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {logoItems.length > 0 && (
        <section className="rec-logo-banner">
          <div className="rec-shell rec-logo-banner__inner">
            <p className="rec-logo-banner__label">{logoBanner.label || "Industry partners"}</p>
            <div className="rec-logo-banner__row">
              {logoItems.map((item, index) => {
                const imageEl = (
                  <img
                    src={item.image}
                    alt={item.alt || "Partner logo"}
                    className="rec-logo-banner__image"
                    loading="lazy"
                  />
                )

                if (item.href) {
                  return (
                    <a
                      href={item.href}
                      className="rec-logo-banner__item"
                      key={`${item.id || item.alt}-${index}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {imageEl}
                    </a>
                  )
                }

                return (
                  <div className="rec-logo-banner__item" key={`${item.id || item.alt}-${index}`}>
                    {imageEl}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="rec-section rec-shell">
        <div className="rec-section__head">
          <h2 className="rec-section__title">
            {workBlock.highlight?.pretitle || "Work"}:
            <br />
            {workBlock.highlight?.title || "Selected projects"}
          </h2>
          <a href={workBlock.highlight?.ctaLink || "/work"} className="rec-link-inline">
            {workBlock.highlight?.ctaText || "View all work"}
          </a>
        </div>
        <div className="rec-work-preview-grid">
          {featuredWorkItems.map((item, index) => (
            <a
              href={item.link || "/work"}
              key={`${item.id}-${index}`}
              className="rec-work-preview-card"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              <div className="rec-work-preview-card__media">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.title || "Project"} />
                ) : (
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: item.image,
                      alt: item.title || "Project",
                    }}
                  />
                )}
              </div>
              <div className="rec-work-preview-card__meta">
                <p>{item.title}</p>
                {item.subtitle && <span>{item.subtitle}</span>}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="rec-section rec-shell rec-section--studio">
        <div className="rec-section__head rec-section__head--right">
          <h2 className="rec-section__title">
            {studioBlock.highlight?.pretitle || "Studio"}:
            <br />
            {studioBlock.highlight?.title || "Sound with direction"}
          </h2>
          {studioBlock.highlight?.body && (
            <p className="rec-section__lead">{studioBlock.highlight.body}</p>
          )}
        </div>
        <div className="rec-service-grid">
          {serviceCards.slice(0, 2).map((card, index) => (
            <article className="rec-service-card" key={`${card.title}-${index}`}>
              {card.image && (
                <div className="rec-service-card__image">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: card.image,
                      alt: card.title || "Service",
                    }}
                  />
                </div>
              )}
              {card.tagline && <p className="rec-service-card__tag">{card.tagline}</p>}
              {card.title && <h3 className="rec-service-card__title">{card.title}</h3>}
              {card.description && (
                <MarkdownRenderer markdown={card.description} textClassName="rec-service-card__body" />
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="rec-section rec-shell rec-section--people">
        <div className="rec-section__head rec-section__head--right">
          <h2 className="rec-section__title">
            {peopleBlock.highlight?.pretitle || "People"}:
            <br />
            {peopleBlock.highlight?.title || "The studio"}
          </h2>
          {peopleBlock.highlight?.body && (
            <p className="rec-section__lead">{peopleBlock.highlight.body}</p>
          )}
          <div className="rec-section__actions">
            <a href={peoplePrimaryCtaHref} className="rec-button rec-button--ghost">
              {peoplePrimaryCtaText}
            </a>
            <a href={peopleSecondaryCtaHref} className="rec-button rec-button--ghost">
              {peopleSecondaryCtaText}
            </a>
          </div>
        </div>
        {peopleTeasers.length > 0 && (
          <div className="rec-people-strip">
            {peopleTeasers.map((item, index) => {
              const imageData = getImage(item.image)
              if (!imageData) return null

              return (
                <a
                  href="/people"
                  className="rec-people-strip__item"
                  key={`${item.alt || "people"}-${index}`}
                  aria-label={`Open people gallery: ${item.alt || "image"}`}
                >
                  <GatsbyImage image={imageData} alt={item.alt || "People teaser"} />
                </a>
              )
            })}
          </div>
        )}
      </section>

      <section className="rec-section rec-shell rec-section--solutions">
        <div className="rec-section__head rec-section__head--solutions">
          <h2 className="rec-section__title">Solutions</h2>
          <p className="rec-section__kicker">Specialized workflows</p>
        </div>
        <div className="rec-solutions-grid">
          {(solutions.blocks || []).slice(0, 3).map((block, index) => (
            <article className="rec-solution-card" key={`${block.category}-${index}`}>
              <span className="rec-solution-card__index">{`0${index + 1}`}</span>
              {block.category && <h3>{block.category}</h3>}
              {block.items?.description && <p>{block.items.description}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="rec-section rec-shell rec-section--cta">
        <h2>{bottomCta.title || "Ready to define your sound?"}</h2>
        <a href={bottomCta.buttonHref || heroPrimaryCtaHref} className="rec-button rec-button--primary">
          {bottomCta.buttonText || heroPrimaryCtaText}
        </a>
      </section>
    </main>
  )
}

IndexPageTemplate.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    solutions: PropTypes.object,
    pageCopy: PropTypes.object,
    logoBanner: PropTypes.shape({
      label: PropTypes.string,
      logos: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.string,
          alt: PropTypes.string,
          href: PropTypes.string,
        })
      ),
    }),
  }),
  peopleTeasers: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      alt: PropTypes.string,
    })
  ),
  fallbackLogos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.string,
      alt: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  disableYoutubeFetch: PropTypes.bool,
}

const IndexPage = ({ data }) => {
  const content = data.markdownRemark.frontmatter
  const galleryImages = data.peopleGallery?.frontmatter?.galleryImages || []
  const fallbackLogos = (data.logoGallery?.edges || [])
    .map(({ node }) => ({
      id: node?.name || "",
      image: node?.publicURL || "",
      alt: node?.name || "Partner logo",
      href: "",
    }))
    .filter(item => item.image)

  const teaserSeen = new Set()
  const peopleTeasers = galleryImages
    .filter(image => image?.src)
    .filter(image => {
      const key = image?.src?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || image?.src
      if (!key || teaserSeen.has(key)) return false
      teaserSeen.add(key)
      return true
    })
    .map(image => ({ image: image.src, alt: image.alt || image.title }))
    .slice(0, 6)

  return <IndexPageTemplate content={content} peopleTeasers={peopleTeasers} fallbackLogos={fallbackLogos} />
}

export default IndexPage

export const Head = ({ data }) => {
  const meta = data.markdownRemark.frontmatter.meta

  return <SeoHead title={meta.title} description={meta.description} slug="/" />
}

export const query = graphql`
  query {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        meta {
          title
          description
        }
        hero {
          title
          h1title
          description
          cta {
            buttonText
            primaryText
            primaryHref
            secondaryText
            secondaryHref
          }
          image {
            childImageSharp {
              gatsbyImageData(
                quality: 90
                layout: CONSTRAINED
                transformOptions: {
                  cropFocus: CENTER
                  duotone: { shadow: "#707070", highlight: "#C29C38", opacity: 80 }
                }
              )
            }
          }
        }
        logoBanner {
          label
          logos {
            image
            alt
            href
          }
        }
        pageCopy {
          bottomCta {
            title
            buttonText
            buttonHref
          }
          flowBlocks {
            highlightPosition
            highlight {
              pretitle
              title
              body
              ctaText
              secondaryCtaText
              secondaryCtaLink
              megaHeadline
              ctaLink
            }
            showGallery
            galleryItems {
              image {
                childImageSharp {
                  gatsbyImageData(
                    quality: 80
                    layout: CONSTRAINED
                    transformOptions: {
                      cropFocus: CENTER
                      fit: COVER
                    }
                    width: 800
                    height: 360
                  )
                }
              }
              title
              subtitle
              bigText
              link
            }
            cards {
              tagline
              title
              description
              fullWidth
              link
              linkLabel
              image {
                childImageSharp {
                  gatsbyImageData(
                    quality: 90
                    layout: CONSTRAINED
                    transformOptions: {
                      cropFocus: CENTER
                      fit: COVER
                    }
                    width: 900
                    height: 360
                  )
                }
              }
            }
          }
        }
        solutions {
          image {
            childImageSharp {
              gatsbyImageData(
                width: 900
                height: 600
                quality: 82
                placeholder: BLURRED
                layout: CONSTRAINED
                transformOptions: { fit: COVER, cropFocus: CENTER }
              )
            }
          }
          blocks {
            category
            items {
              title
              description
            }
          }
        }
      }
    }
    peopleGallery: markdownRemark(frontmatter: { templateKey: { eq: "people-gallery" } }) {
      frontmatter {
        galleryImages {
          title
          alt
          src {
            childImageSharp {
              gatsbyImageData(
                width: 520
                height: 520
                quality: 82
                placeholder: BLURRED
                layout: CONSTRAINED
                transformOptions: { fit: COVER, cropFocus: CENTER, grayscale: true }
              )
            }
          }
        }
      }
    }
    logoGallery: allFile(
      filter: {
        relativeDirectory: { eq: "logo-gallery" }
        extension: { regex: "/(png)|(jpg)|(jpeg)|(webp)|(avif)/" }
      }
      sort: { name: ASC }
    ) {
      edges {
        node {
          name
          publicURL
        }
      }
    }
  }
`
