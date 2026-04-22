import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SeoHead from "../components/SeoHead"
import MarkdownRenderer from "../components/MarkdownRenderer"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage"
import { cropPositionToObjectPosition } from "../lib/imageCrop"
import { normalizeCmsFeaturedVideos } from "../lib/youtube"

export const IndexPageTemplate = ({
  content,
  peopleTeasers = [],
  featuredVideos = [],
  fallbackLogos = [],
}) => {
  const { hero, pageCopy = {}, solutions = {}, logoBanner = {} } = content
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
    .slice(0, 5)

  const curatedVideos = useMemo(
    () => normalizeCmsFeaturedVideos(featuredVideos || []).slice(0, 5),
    [featuredVideos]
  )

  const featuredWorkItems = useMemo(() => {
    if (curatedVideos.length) {
      return curatedVideos.map(video => ({
        id: video.videoId || video.youtubeUrl,
        title: video.title,
        subtitle: video.subtitle,
        thumbnail: video.thumbnail,
        cropPosition: video.cropPosition || "center",
        link: video.youtubeUrl,
        external: true,
      }))
    }

    return workItems.map((item, index) => ({
      id: `fallback-${index}`,
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      cropPosition: item.cropPosition || "center",
      link: item.link || "/work",
      external: false,
    }))
  }, [curatedVideos, workItems])

  const workHeadClass =
    workBlock.highlightPosition === "right"
      ? "rec-section__head rec-section__head--split rec-section__head--right"
      : "rec-section__head rec-section__head--split rec-section__head--left"
  const studioHeadClass =
    studioBlock.highlightPosition === "left"
      ? "rec-section__head rec-section__head--left"
      : "rec-section__head rec-section__head--right"
  const peopleHeadClass =
    peopleBlock.highlightPosition === "left"
      ? "rec-section__head rec-section__head--left"
      : "rec-section__head rec-section__head--right"
  const peopleActionsClass =
    peopleBlock.highlightPosition === "left"
      ? "rec-section__actions rec-section__actions--left"
      : "rec-section__actions rec-section__actions--right"

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
        <div className={workHeadClass}>
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
                  <img
                    src={item.thumbnail}
                    alt={item.title || "Project"}
                    style={{
                      objectPosition: cropPositionToObjectPosition(item.cropPosition),
                    }}
                  />
                ) : (
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: item.image,
                      alt: item.title || "Project",
                      imageStyle: { width: "100%", height: "100%" },
                      imgStyle: {
                        objectFit: "cover",
                        objectPosition: cropPositionToObjectPosition(item.cropPosition),
                      },
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
        <div className={studioHeadClass}>
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
                      imageStyle: { width: "100%", height: "100%" },
                      imgStyle: {
                        objectFit: "cover",
                        objectPosition: cropPositionToObjectPosition(card.cropPosition),
                      },
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
        <div className={peopleHeadClass}>
          <h2 className="rec-section__title">
            {peopleBlock.highlight?.pretitle || "People"}:
            <br />
            {peopleBlock.highlight?.title || "The studio"}
          </h2>
          {peopleBlock.highlight?.body && (
            <p className="rec-section__lead">{peopleBlock.highlight.body}</p>
          )}
          <div className={peopleActionsClass}>
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
              if (!item?.image) return null

              return (
                <a
                  href="/people"
                  className="rec-people-strip__item"
                  key={`${item.alt || "people"}-${index}`}
                  aria-label={`Open people gallery: ${item.alt || "image"}`}
                >
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: item.image,
                      alt: item.alt || "People teaser",
                      imageStyle: { width: "100%", height: "100%" },
                      imgStyle: {
                        objectFit: "cover",
                        objectPosition: cropPositionToObjectPosition(item.cropPosition),
                      },
                    }}
                  />
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
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      alt: PropTypes.string,
      cropPosition: PropTypes.string,
    })
  ),
  featuredVideos: PropTypes.arrayOf(PropTypes.object),
  fallbackLogos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.string,
      alt: PropTypes.string,
      href: PropTypes.string,
    })
  ),
}

const IndexPage = ({ data }) => {
  const content = data.markdownRemark.frontmatter
  const galleryImages = data.peopleGallery?.frontmatter?.galleryImages || []
  const featuredPeopleImages = data.peopleGallery?.frontmatter?.featuredImages || []
  const teaserSource = featuredPeopleImages.length ? featuredPeopleImages : galleryImages
  const fallbackLogos = (data.logoGallery?.edges || [])
    .map(({ node }) => ({
      id: node?.name || "",
      image: node?.publicURL || "",
      alt: node?.name || "Partner logo",
      href: "",
    }))
    .filter(item => item.image)

  const teaserSeen = new Set()
  const peopleTeasers = teaserSource
    .filter(image => image?.src)
    .filter(image => {
      const key = image?.src?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || image?.src
      if (!key || teaserSeen.has(key)) return false
      teaserSeen.add(key)
      return true
    })
    .map(image => ({
      image: image.src,
      alt: image.alt || image.title,
      cropPosition: image.cropPosition || "center",
      order: Number(image.order) || 0,
    }))
    .sort((a, b) => {
      const left = a.order || Number.MAX_SAFE_INTEGER
      const right = b.order || Number.MAX_SAFE_INTEGER
      return left - right
    })
    .slice(0, 5)

  const featuredVideos = data.workPage?.frontmatter?.featuredVideos || []

  return (
    <IndexPageTemplate
      content={content}
      peopleTeasers={peopleTeasers}
      featuredVideos={featuredVideos}
      fallbackLogos={fallbackLogos}
    />
  )
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
              cropPosition
              image {
                childImageSharp {
                  gatsbyImageData(
                    quality: 80
                    layout: CONSTRAINED
                    width: 800
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
              cropPosition
              image {
                childImageSharp {
                  gatsbyImageData(
                    quality: 90
                    layout: CONSTRAINED
                    width: 900
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
        featuredImages {
          order
          title
          alt
          cropPosition
          src {
            childImageSharp {
              gatsbyImageData(width: 520 quality: 82 placeholder: BLURRED layout: CONSTRAINED)
            }
          }
        }
        galleryImages {
          title
          alt
          cropPosition
          src {
            childImageSharp {
              gatsbyImageData(width: 520 quality: 82 placeholder: BLURRED layout: CONSTRAINED)
            }
          }
        }
      }
    }
    workPage: markdownRemark(frontmatter: { templateKey: { eq: "work-page" } }) {
      frontmatter {
        featuredVideos {
          order
          title
          subtitle
          youtubeUrl
          thumbnail
          cropPosition
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
