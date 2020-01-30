import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostPreview from "../components/postPreview"

import JavascriptLogo from "../../content/assets/topics/javascript.jpg"

class Javascript extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    console.log(posts)
    const javascriptPosts = posts.filter(
      post => post.node.frontmatter.category === "Javascript"
    )
    console.log(javascriptPosts)
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Javascript" />
        <img
          style={{ width: "200px" }}
          src={JavascriptLogo}
          alt="Javascript logo"
        />
        <h1 style={{ marginBottom: "4rem", textAlign: "center" }}>
          Javascript Posts
        </h1>
        <div className="PostPreviews">
          {javascriptPosts.map(({ node }) => {
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
      </Layout>
    )
  }
}

export default Javascript

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
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
