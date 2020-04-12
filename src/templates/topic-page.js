import React from "react"

import { graphql } from "gatsby"
import Image from "gatsby-image"
import PostPreview from "../components/postPreview"

import Layout from "../components/layout"

const TopicPageTemplate = ({ pageContext, data }) => {
  const { topic } = pageContext
  const { edges } = data.allMarkdownRemark

  const edgesWithTopic = edges.filter(({ node }) => {
    return node.frontmatter.category === topic
  })

  const topicInfo = data.allTopicsJson.edges.filter(({ node }) => {
    return node.slug === topic.toLowerCase()
  })[0].node

  return (
    <Layout pageType="Topic">
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
      <div className="PostPreviews">
        {edgesWithTopic.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
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
        })}
      </div>

      <div style={{ marginTop: "8rem" }}>
        <h2 style={{ marginBottom: "2rem", fontSize: "2.4rem" }}>Top Posts</h2>
        <div className="PostPreviews">
          {edges.map(({ node }, index) => {
            const title = node.frontmatter.title || node.fields.slug
            if (index < 3) {
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
// export const pageQuery = graphql`
//   query($topic: String) {
//     allMarkdownRemark(
//       limit: 2000
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: { frontmatter: { category: { in: [$topic] } } }
//     ) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `
