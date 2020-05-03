import React from "react"

import { graphql } from "gatsby"
import Image from "gatsby-image"

import Card from "../components/card"
import Layout from "../components/layout"
import SEO from "../components/seo"

const TopicPageTemplate = ({ pageContext, data }) => {
  const { topic } = pageContext
  const { edges } = data.allMarkdownRemark

  const edgesWithTopic = edges.filter(({ node }) => {
    return node.frontmatter.tags.includes(topic)
  })

  const topicInfo = data.allTopicsJson.edges.filter(({ node }) => {
    return node.slug === topic.toLowerCase()
  })[0].node

  return (
    <Layout pageType="Topic">
      <SEO
        title={`${topic} tutorials`}
        canonical={`https://code-boost.com/${topic.toLowerCase()}/`}
      />
      <div className="TopicPage__header">
        <div>
          <h1>{topic}</h1>
        </div>
        <Image
          className="TopicPage__image"
          fluid={topicInfo.image.childImageSharp.fluid}
          alt={topicInfo.name}
        />{" "}
      </div>
      <div className="Cards-layout">
        {edgesWithTopic.map(({ node }) => {
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
      </div>

      <div style={{ marginTop: "8rem" }}>
        <h2 style={{ marginBottom: "2rem", fontSize: "2.4rem" }}>Top Posts</h2>
        <div className="Cards-layout">
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
        </div>
      </div>
    </Layout>
  )
}

export default TopicPageTemplate
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
    allTopicsJson {
      edges {
        node {
          name
          slug
          image {
            childImageSharp {
              fluid(maxWidth: 240, maxHeight: 240) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
