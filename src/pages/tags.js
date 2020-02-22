import React from "react"
import PropTypes from "prop-types"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import PostPreview from "../components/postPreview"
const TagsPage = ({
  data: {
    allMarkdownRemark: { group, edges },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  return (
    <Layout pageType="Tags">
      <div>
        <Helmet title={title} />
        <div>
          <h1 style={{ marginBottom: "2rem" }}>Tags</h1>
          <div className="Trending__topics">
            {group.map(tag => (
              <Link
                to={`/tag/${kebabCase(tag.fieldValue)}/`}
                key={tag.fieldValue}
                className="Trending__topic"
              >
                <span>
                  {tag.fieldValue} ({tag.totalCount})
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 style={{ margin: "4rem 0 2rem 0", fontSize: "2.4rem" }}>
          Top Posts
        </h2>
        <div className="PostPreviews">
          {edges.map(({ node }, index) => {
            const title = node.frontmatter.title || node.fields.slug
            if (index < 6) {
              return (
                <PostPreview
                  key={title}
                  title={title}
                  slug={node.fields.slug}
                  date={node.frontmatter.date}
                  description={node.frontmatter.description}
                  excerpt={node.excerpt}
                  frontmatter={node.frontmatter}
                />
              )
            }
          })}
        </div>
      </div>
    </Layout>
  )
}
TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}
export default TagsPage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            category
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
