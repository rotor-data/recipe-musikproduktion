import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import SeoHead from "../components/SeoHead"
import VideoModal from "../components/VideoModal"
import HeroSection from "../components/sections/HeroSection"
import LogosSection from "../components/sections/LogosSection"
import WorkSection from "../components/sections/WorkSection"
import ServicesSection from "../components/sections/ServicesSection"
import PeopleSection from "../components/sections/PeopleSection"
import SolutionsSection from "../components/sections/SolutionsSection"
import CtaSection from "../components/sections/CtaSection"
import {
  fetchYoutubeVideos,
  normalizeCmsFeaturedVideos,
  selectStartPageVideos,
} from "../lib/youtube"

export const IndexPageTemplate = ({ content, peopleTeasers = [] }) => {
  const sections = content?.sections || []
  const workSection = sections.find(section => section?.type === "work") || {}

  const curatedVideos = useMemo(
    () => normalizeCmsFeaturedVideos(workSection.featuredVideos || []).slice(0, 5),
    [workSection.featuredVideos]
  )

  // The channel feed is the default source. A curated list in the CMS wins
  // when there is one, which lets an editor pin specific videos.
  const [channelVideos, setChannelVideos] = useState([])
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    if (curatedVideos.length) return undefined

    let cancelled = false
    fetchYoutubeVideos()
      .then(videos => {
        if (!cancelled) setChannelVideos(videos)
      })
      .catch(() => {
        if (!cancelled) setChannelVideos([])
      })

    return () => {
      cancelled = true
    }
  }, [curatedVideos.length])

  const workItems = useMemo(() => {
    const picked = selectStartPageVideos(curatedVideos, channelVideos, 5)

    if (picked.source === "cms") {
      return picked.videos.map(video => ({
        id: video.videoId || video.youtubeUrl,
        videoId: video.videoId,
        title: video.title,
        subtitle: video.subtitle,
        description: video.description,
        thumbnail: video.thumbnail,
        cropPosition: video.cropPosition || "center",
      }))
    }

    return picked.videos.map(video => ({
      id: video.id,
      videoId: video.id,
      title: video.title,
      subtitle: video.channelTitle,
      description: video.description,
      publishedAt: video.publishedAt,
      channelTitle: video.channelTitle,
      thumbnail: video.thumbnail,
      cropPosition: "center",
    }))
  }, [curatedVideos, channelVideos])

  const renderSection = (section, index) => {
    const key = `${section?.type || "section"}-${index}`

    switch (section?.type) {
      case "hero":
        return <HeroSection key={key} section={section} />
      case "logos":
        return <LogosSection key={key} section={section} />
      case "work":
        return (
          <WorkSection key={key} section={section} items={workItems} onPlay={setActiveVideo} />
        )
      case "services":
        return <ServicesSection key={key} section={section} />
      case "people":
        return <PeopleSection key={key} section={section} teasers={peopleTeasers} />
      case "solutions":
        return <SolutionsSection key={key} section={section} />
      case "cta":
        return <CtaSection key={key} section={section} />
      default:
        return null
    }
  }

  return (
    <main className="rec-page rec-start-page">
      {sections.map(renderSection)}

      {activeVideo && (
        <VideoModal
          video={{
            id: activeVideo.videoId,
            title: activeVideo.title,
            description: activeVideo.description,
            channelTitle: activeVideo.channelTitle,
            publishedAt: activeVideo.publishedAt,
          }}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </main>
  )
}

IndexPageTemplate.propTypes = {
  content: PropTypes.shape({ sections: PropTypes.array }),
  peopleTeasers: PropTypes.array,
}

const IndexPage = ({ data }) => {
  const content = data.markdownRemark.frontmatter
  const galleryImages = data.peopleGallery?.frontmatter?.galleryImages || []
  const featuredPeopleImages = galleryImages.filter(image => image?.featured)
  const teaserSource = featuredPeopleImages.length ? featuredPeopleImages : galleryImages

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
    }))
    .slice(0, 5)

  return (
    <IndexPageTemplate
      content={content}
      peopleTeasers={peopleTeasers}
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
        sections {
          type
          title
          h1title
          description
          kicker
          label
          pretitle
          body
          highlightPosition
          ctaText
          ctaLink
          secondaryCtaText
          secondaryCtaLink
          primaryText
          primaryHref
          secondaryText
          secondaryHref
          buttonText
          buttonHref
          image {
            childImageSharp {
              gatsbyImageData(
                width: 1920
                quality: 82
                placeholder: BLURRED
                layout: FULL_WIDTH
                transformOptions: { fit: COVER, cropFocus: CENTER }
              )
            }
          }
          logos {
            image {
              publicURL
            }
            alt
            href
          }
          cards {
            tagline
            title
            description
            cropPosition
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 900
                  quality: 82
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                )
              }
            }
          }
          featuredVideos {
            title
            subtitle
            category
            description
            youtubeUrl
            thumbnail
            cropPosition
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
          cropPosition
          featured
          src {
            childImageSharp {
              gatsbyImageData(width: 520 quality: 82 placeholder: BLURRED layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
