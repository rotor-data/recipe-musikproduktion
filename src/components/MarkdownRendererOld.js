import React from "react";
import remark from "remark";
import remarkHTML from "remark-html";

const MarkdownRenderer = ({ markdown, customClass, Tag = "div" }) => {
  const processedMarkdown = remark().use(remarkHTML).processSync(markdown).toString();

  // Optional: Process links
  const processHTMLLinks = (html) => {
    return html.replace(
      /<a href="http(s?):\/\/([^"]+)">([^<]+)<\/a>/g,
      `<a href="http$1://$2" target="_blank" rel="noopener noreferrer">$3</a>`
    );
  };

  const finalHTML = processHTMLLinks(processedMarkdown);

  return (
    <Tag
      className={`common-text ${customClass || ""}`}
      dangerouslySetInnerHTML={{ __html: finalHTML }}
    />
  );
};

export default MarkdownRenderer;
