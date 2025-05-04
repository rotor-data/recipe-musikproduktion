import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import MarkdownRenderer from "../components/MarkdownRenderer";

const PrivacyPolicyPage = ({ data }) => {
  const privacyPolicy = data.allMarkdownRemark.edges[0]?.node;

  return (
    <Layout>
      <div className="top-spacing"></div>
      <div className="container my-6">
        <MarkdownRenderer markdown={privacyPolicy.rawMarkdownBody} customClass='privacy-policy'/>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "privacyPolicy" } } }) {
      edges {
        node {
          frontmatter {
            title
          }
          html
          rawMarkdownBody
        }
      }
    }
  }
`;

export default PrivacyPolicyPage;
