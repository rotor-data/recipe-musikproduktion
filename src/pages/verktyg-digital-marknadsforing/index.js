import React from "react";

import Layout from "../../components/Layout";
import LargeCTA from "../../components/LargeCTA";
import { Link } from "gatsby";

import { StaticQuery, graphql } from "gatsby";
import SEO from "../../components/SEO";

function AvailableTools() {
  return (
    <StaticQuery
      query={graphql`
      query Tools {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "tools"}}}) {
          edges {
            node {
              frontmatter {
                templateKey
                title
                path
              }
            }
          }
        }
      }
      `}
      render={data => (
        <div className="is-flex is-flex-wrap-wrap is-justify-content-space-evenly">
             {data.allMarkdownRemark.edges.map ((tool,i) => 
      <Link className="" to={tool.node.frontmatter.path}>
     <h3 className="button mr-3 my-3 is-warning is-size-5-desktop is-size-6-mobile is-uppercase mb-1 has-text-white">{tool.node.frontmatter.title} </h3>

   
    </Link>

    )}
        </div>
      )}
    />
  )
}

const VerktygIndexTemplate = () => {
return (
 
<div className="section has-background-link mt-6">
<SEO title={`Våra verktyg för digital marknadsföring | Rotor Digitalbyrå`} description="Här hittar du några av de verktyg vi använder för att skapa leads och bearbeta dem ända till slutförd affär." slug="/verktyg-digital-marknadsforing" />
     <div className="columns">
      <div className="column is-8-desktop is-offset-2-desktop">
        <div className="has-text-centered">
         <h1 className="has-text-white has-tight-height is-ultralarge is-size-1-mobile has-text-weight-bold is-uppercase">Några av våra verktyg inom digital marknadsföring</h1>
        </div>
        <AvailableTools/>
        <div className="mt-3">
         
        </div>
      </div>
     </div>
     <LargeCTA/>
      </div>
      
)}

const VerktygPage = ({ data }) => {
 

  return (
    <Layout>
      <VerktygIndexTemplate
      
      />
    </Layout>
  );
};

export default VerktygPage

/* export default class BlogIndexPage extends React.Component {
    render() {
      return (
        <Layout>
          
        </Layout>
      );
    }
  } */