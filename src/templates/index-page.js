import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import HeroSection from "../components/HeroSection"
import SeoHead from "../components/SeoHead"
import MarkdownRenderer from "../components/MarkdownRenderer"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage"
import { fetchYoutubeVideos } from "../lib/youtube"

export const IndexPageTemplate = ({ content, peopleTeasers = [] }) => {
  const { hero, pageCopy = {} } = content
  const [latestVideos, setLatestVideos] = useState([])
  const blocks = pageCopy.flowBlocks || []
  const studioBlock = blocks[0] || {}
  const workBlock = blocks[1] || {}
  const peopleBlock = blocks[2] || {}

  const serviceCards = [
    ...(studioBlock.cards || []),
    ...(peopleBlock.cards || []),
  ].filter(card => card?.title || card?.description || card?.image)

  const workItems = (workBlock.galleryItems || [])
    .filter(item => item?.image && (item?.title || item?.subtitle))
    .slice(0, 3)

  useEffect(() => {
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
  }, [])

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

  return (
    <>
      <div className="has-background-black">
        <HeroSection
          title={hero.title}
          h1title={hero.h1title}
          image={hero.image}
          showLogoBanner={hero?.showLogoBanner}
        />
      </div>

      {hero.description && (
        <section className="section hero-body-copy">
          <div className="container is-fluid">
            <div className="hero-body-copy__inner">
              <MarkdownRenderer markdown={hero.description} />
            </div>
          </div>
        </section>
      )}

      <section className="section start-shell">
        <div className="container is-fluid">
          <div className="start-section">
            <div className="start-section__header">
              <p className="start-section__kicker">
                {workBlock.highlight?.pretitle || "Work"}
              </p>
              <h2 className="start-section__title">
                {workBlock.highlight?.title || "Selected projects"}
              </h2>
            </div>
            <div className="start-work-grid">
              {featuredWorkItems.map((item, index) => (
                <a
                  href={item.link || "/work"}
                  key={`${item.id}-${index}`}
                  className="start-work-card"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  {item.thumbnail ? (
                    <div className="start-work-card__media">
                      <img src={item.thumbnail} alt={item.title || "Project"} />
                    </div>
                  ) : (
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: item.image,
                        alt: item.title || "Project",
                      }}
                    />
                  )}
                  <div className="start-work-card__meta">
                    <p className="start-work-card__title">{item.title}</p>
                    {item.subtitle && (
                      <p className="start-work-card__subtitle">{item.subtitle}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
            <a href="/work" className="start-link">
              View all work
            </a>
          </div>

          <div className="start-section">
            <div className="start-section__header">
              <p className="start-section__kicker">
                {studioBlock.highlight?.pretitle || "Services"}
              </p>
              <h2 className="start-section__title">
                {studioBlock.highlight?.title || "What we do"}
              </h2>
              {studioBlock.highlight?.body && (
                <p className="start-section__body">{studioBlock.highlight.body}</p>
              )}
            </div>

            <div className="start-service-grid">
              {serviceCards.slice(0, 3).map((card, index) => (
                <article className="start-service-card" key={`${card.title}-${index}`}>
                  {card.image && (
                    <div className="start-service-card__image">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: card.image,
                          alt: card.title || "Service",
                        }}
                      />
                    </div>
                  )}
                  {card.tagline && <p className="start-service-card__tag">{card.tagline}</p>}
                  {card.title && <p className="start-service-card__title">{card.title}</p>}
                  {card.description && (
                    <MarkdownRenderer
                      markdown={card.description}
                      textClassName="start-service-card__body"
                    />
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="start-section start-section--compact">
            <div className="start-section__header">
              <p className="start-section__kicker">
                {peopleBlock.highlight?.pretitle || "People"}
              </p>
              <h2 className="start-section__title">
                {peopleBlock.highlight?.title || "The studio"}
              </h2>
              {peopleBlock.highlight?.body && (
                <p className="start-section__body">{peopleBlock.highlight.body}</p>
              )}
            </div>
            <div className="start-actions">
              <a href="/people" className="start-link">
                Open gallery
              </a>
              <a href="/contact" className="start-link">
                Start a project
              </a>
            </div>
            {peopleTeasers.length > 0 && (
              <div className="start-people-teasers">
                {peopleTeasers.map((item, index) => {
                  const imageData = getImage(item.image)
                  if (!imageData) return null

                  return (
                    <a
                      href="/people"
                      className="start-people-teaser"
                      key={`${item.alt || "people"}-${index}`}
                      aria-label={`Open people gallery: ${item.alt || "image"}`}
                    >
                      <GatsbyImage image={imageData} alt={item.alt || "People teaser"} />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

IndexPageTemplate.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    solutions: PropTypes.object,
    pageCopy: PropTypes.object,
  }),
  peopleTeasers: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      alt: PropTypes.string,
    })
  ),
}

const IndexPage = ({ data }) => {
  const content = data.markdownRemark.frontmatter
  const galleryBlocks = data.peopleGallery?.frontmatter?.galleryBlocks || []

  const peopleTeasers = galleryBlocks
    .flatMap(block => {
      const highlight = block?.highlight?.src
        ? [{ image: block.highlight.src, alt: block.highlight.alt || block.highlight.title }]
        : []
      const cards = (block?.cards || [])
        .filter(card => card?.src)
        .map(card => ({ image: card.src, alt: card.alt || card.title }))
      return [...highlight, ...cards]
    })
    .slice(0, 6)

  return <IndexPageTemplate content={content} peopleTeasers={peopleTeasers} />
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
        pageCopy {
          flowBlocks {
            highlightPosition
            highlight {
              pretitle
              title
              body
              ctaText
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
      }
    }
    peopleGallery: markdownRemark(frontmatter: { templateKey: { eq: "people-gallery" } }) {
      frontmatter {
        galleryBlocks {
          highlight {
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
          cards {
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
    }
  }
`
