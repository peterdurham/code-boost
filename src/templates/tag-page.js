import React from "react"
import Layout from "../components/layout"
import PropTypes from "prop-types"
// Components
import { Link, graphql } from "gatsby"

const TagPageTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  // TODO: REPLACE THIS WITH SLICKER GQL QUERY IN FUTURE
  const edgesWithTag = edges.filter(({ node }) => {
    return node.frontmatter.tags.includes(tag)
  })

  const tagHeader = `${edgesWithTag.length} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  return (
    <Layout>
      <h1>{tagHeader}</h1>
      <ul>
        {edgesWithTag.map(({ node }) => {
          const { title } = node.frontmatter
          return (
            <li>
              <Link key={title} to={"/"}>
                {title}
              </Link>
            </li>
          )
        })}
      </ul>

      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

export default TagPageTemplate
export const pageQuery = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`
