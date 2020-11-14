import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import { CardsLayout } from "../components/styles/CardsLayout"

const TopicsPage = ({
  data: {
    allMarkdownRemark: { group, edges },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  return (
    <Layout pageType="Topics">
      <SEO
        title="About Code-Boost"
        canonical={`https://www.code-boost.com/about/`}
      />
      <div>
        <h1 style={{ margin: "2rem 0 4rem 0", fontSize: "2.4rem" }}>
          Main Topics
        </h1>
        <div className="Trending__topics">
          {group.map(topic => (
            <Link
              to={`/${topic.fieldValue.toLowerCase()}/`}
              key={topic.fieldValue}
              className="Tag"
            >
              <span>
                {topic.fieldValue} ({topic.totalCount})
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h2 style={{ margin: "4rem 0 2rem 0", fontSize: "2.4rem" }}>
          Recent Posts
        </h2>
        <CardsLayout>
          {edges.map(({ node }, index) => {
            const title = node.frontmatter.title || node.fields.slug
            if (index < 6) {
              return (
                <Card
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
            return null
          })}
        </CardsLayout>
      </div>
    </Layout>
  )
}
TopicsPage.propTypes = {
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
export default TopicsPage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2000
      ) {
      group(field: frontmatter___category) {
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
            templateKey
            description
            tags
            category
            videoID
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
