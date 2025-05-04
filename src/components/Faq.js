import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useState } from "react"


const Faq = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "faq"}}}) {
        edges {
          node {
            id
            frontmatter {
              title
              templateKey
              faq {
                answer
                question
              }
            }
          }
        }
      }
    }
  `)
 
  const faqItems = data.allMarkdownRemark.edges[0].node.frontmatter.faq;
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const openClose = () => {
 
   
  }
  return (
  
  <div className="has-background-warning">

<div>{faqItems.map((item, index) =>
   <div  className="faq-wrapper my-3 is-flex is-flex-direction-row" onClick={()=>setActiveId(index)} id={`question-${index}`}>
    <div style={{position:"absolute", top:"7px", left:"0"}} className={`question-${activeId}`===`question-${index}`?"active-triangle":"inactive-triangle triangle-right" } ></div>
   <div className="ml-3 has-text-weight-bold"> {item.question} 
   <div className={`question-${activeId}`===`question-${index}`?"faq-item-show mt-3 has-text-weight-normal":"faq-item-hide has-text-weight-normal" } dangerouslySetInnerHTML={{ __html: item.answer }}></div>
   </div>
   </div>
    )}
   
</div>

  </div>
  )
}

export default Faq