// src/components/MarkdownRenderer.js

import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import rehypeRaw from "rehype-raw"
import rehypeExternalLinks from "rehype-external-links"

// 🔹 Replace [[shy]] with Unicode soft hyphen character
const preprocessMarkdown = (markdown) => {
  return markdown.replace(/\[shy\]/g, "\u00AD")
}

const MarkdownRenderer = ({ 
  markdown, 
  inline = false, 
  headingClassName = "", 
  textClassName = "" 
}) => {
  const processedMarkdown = preprocessMarkdown(markdown)

  const remarkPlugins = inline ? [remarkGfm] : [remarkGfm, remarkBreaks]
  const rehypePlugins = inline
    ? []
    : [
        rehypeRaw,
        [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
      ]

  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      urlTransform={(url) => {
        if (url.startsWith("tel:") || url.startsWith("mailto:")) return url
        try {
          return new URL(url).href
        } catch {
          return ""
        }
      }}
      components={{
        // Paragraphs
        p: ({ node, ...props }) =>
          inline ? (
            <>{props.children}</>
          ) : (
            <p className={`content ${textClassName}`} {...props}>
              {props.children}
            </p>
          ),

        // Emphasis and Strong
        em: ({ node, ...props }) => <em className={`has-text-italic ${textClassName}`} {...props} />,
        strong: ({ node, ...props }) => <strong className={`has-text-weight-bold ${textClassName}`} {...props} />,

        // Links
        a: ({ href = "", children }) => {
          const isExternal = href.startsWith("http://") || href.startsWith("https://")
          const isMail = href.startsWith("mailto:")
          const isTel = href.startsWith("tel:")
          return (
            <a
              href={href}
              className={`has-text-link ${textClassName}`}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={isTel ? { whiteSpace: "nowrap" } : {}}
            >
              {children}
            </a>
          )
        },

        // Line Breaks
        br: () => <br />,

        // Block Code
        pre: ({ node, children, ...props }) => (
          <p className={`${textClassName}`} {...props}>
            {children}
          </p>
        ),

        // Inline Code
        code: ({ node, inline, children, ...props }) =>
          inline ? (
            <span className={`${textClassName}`} {...props}>
              {children}
            </span>
          ) : (
            <>{children}</> // no additional wrapping for block code (already handled)
          ),

        // Headings with dynamic className
        h1: ({ node, ...props }) => (
          <h1 className={`title is-1 ${headingClassName}`} {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className={`title is-2 ${headingClassName}`} {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className={`title is-3 ${headingClassName}`} {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className={`title is-4 ${headingClassName}`} {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className={`title is-5 ${headingClassName}`} {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className={`title is-6 ${headingClassName}`} {...props} />
        ),
      }}
    >
      {processedMarkdown}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer
