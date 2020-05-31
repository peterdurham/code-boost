import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

import Card from "../components/card"
import SEO from "../components/seo"
import { CardsLayout } from "../components/styles/CardsLayout"

const TagPageStyles = styled.div`
  .tagPageHeader {
    margin: 4.2rem 0;
    font-size: 3.2rem;
  }
  .tagPageButton {
    font-size: 1.4rem;
    line-height: 2.6rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid ${props => props.theme.darkest};
    padding: 4px 16px;
    margin-top: 3rem;
    margin-bottom: 6rem;
    display: inline-block;
    transition: all 0.3s;
    cursor: pointer;
  }
  .tagPageButton:hover {
    background: ${props => props.theme.gradient02};
    border: 1px solid #fff;
  }
  .tagPageButton:hover span {
    color: #fff;
  }
`

const TagPageTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  const edgesWithTag = edges.filter(({ node }) => {
    return node.frontmatter.tags.includes(tag)
  })

  const tagHeader = `${edgesWithTag.length} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  return (
    <Layout pageType="Tag">
      <SEO
        title={`${tag} tutorials`}
        canonical={`https://code-boost.com/tag/${tag
          .split(" ")
          .join("-")
          .split("/")
          .join("-")
          .toLowerCase()}/`}
      />
      <TagPageStyles>
        <h2 className="tagPageHeader">{tagHeader}</h2>

        <CardsLayout>
          {edgesWithTag.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
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
          })}
        </CardsLayout>
        <Link to="/tags" className="tagPageButton">
          <span>See all tags</span>
        </Link>

        <div>
          <h2 style={{ marginBottom: "2rem", fontSize: "2.4rem" }}>
            Top Posts
          </h2>
          <CardsLayout>
            {edges.map(({ node }, index) => {
              const title = node.frontmatter.title || node.fields.slug
              if (index < 3) {
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
      </TagPageStyles>
    </Layout>
  )
}

export default TagPageTemplate
export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
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
