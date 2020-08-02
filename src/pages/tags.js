import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Card from "../components/card"
import { CardsLayout } from "../components/styles/CardsLayout"
import styled from "styled-components"

const TagsPageStyles = styled.div`
  .trendingTags {
    display: flex;
    flex-wrap: wrap;
    width: 96rem;

    @media (max-width: 1040px) {
      width: 100%;
    }
  }
`

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
      <TagsPageStyles>
        <SEO
          title="About Code-Boost"
          canonical={`https://www.code-boost.com/tags/`}
        />
        <div>
          <h1 style={{ marginBottom: "2rem" }}>Topics</h1>
          <div className="trendingTags">
            {group.map(tag => (
              <Link
                to={`/tag/${kebabCase(tag.fieldValue.toLowerCase())}/`}
                key={tag.fieldValue}
                className="Tag"
              >
                <span>
                  {tag.fieldValue} ({tag.totalCount})
                </span>
              </Link>
            ))}
          </div>
        </div>
      </TagsPageStyles>
      <div>
        <h2 style={{ margin: "4rem 0 2rem 0", fontSize: "2.4rem" }}>
          Top Posts
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
