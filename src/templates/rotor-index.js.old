import React from "react";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import { IndexPageTemplate } from "./index-page";
import RotorButton from "../components/RotorButton"

export const RotorIndexTemplate = ({text, buttonText, buttonLink}) => {
    return (
  <div>
    <p dangerouslySetInnerHTML={{ __html: text }}></p>
    <RotorButton buttonText={buttonText} buttonLink={buttonLink} />
    </div>      
    )
}
const RotorIndex = ({data}) => {
    const { frontmatter } = data.markdownRemark;
    

    return (
        <Layout>
            <RotorIndexTemplate 
            text = {frontmatter.text}
            buttonText = {frontmatter.rotorButton.buttonText}
            buttonLink = {frontmatter.rotorButton.link}
            />
        </Layout>
    )
}
export default RotorIndex;

export const RotorIndexQuery = graphql`
query RotorIndexTemplate {
    markdownRemark(frontmatter: {templateKey: {eq: "rotor-index"}}) {
      frontmatter {
        text
        rotorButton {
          link
          buttonText
        }
      }
    }
  }
  `;