import React from "react"
import TemplateWrapper from "./src/components/Layout"

export const wrapPageElement = ({ element }) => {
  return <TemplateWrapper>{element}</TemplateWrapper>
}
