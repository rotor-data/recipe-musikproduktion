import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import ProgressBar from "../components/ProgressBar";



// eslint-disable-next-line
export const LandingPageSpecificTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
    <ProgressBar/>
    <section className="section">
       <Helmet>
      <meta name={`robots`} content={`noindex, nofollow`} />
    </Helmet>
      {helmet || ""}
    
      <div className="container content landing-specific">
        <div className="columns pt-4">
          <div className="column is-8 is-offset-2">
            <h1 className="title is-size-1-desktop is-size-2-touch has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p className="description">{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

LandingPageSpecificTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const LandingPageSpecific = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      
      <LandingPageSpecificTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

LandingPageSpecific.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default LandingPageSpecific;

export const pageQuery = graphql`
  query LandingPageSpecificByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;