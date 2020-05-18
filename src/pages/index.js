import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Trending from "../components/trending"
import Topics from "../components/topics"
import Card from "../components/card"
import Sidebar from "../components/sidebar"
import { FaAngleDoubleRight } from "react-icons/fa"

const PageContainer = styled.div`
  display: flex;

  .pageContent {
    max-width: 1040px;

    @media (max-width: 1200px) {
      max-width: 100%;
    }
    .paginationLink {
      margin-left: auto;
    }
  }
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle} pageType="Home">
        <PageContainer>
          <div className="pageContent">
            <SEO
              title="Code-Boost Tutorials"
              canonical={`https://www.code-boost.com/`}
            />

            <Trending />
            <Topics />
            <div className="Cards-layout">
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <Card
                    key={node.fields.slug}
                    title={title}
                    slug={node.fields.slug}
                    datePublished={node.frontmatter.datePublished}
                    description={node.frontmatter.description}
                    excerpt={node.excerpt}
                    frontmatter={node.frontmatter}
                  />
                )
              })}
            </div>
            <Link to="/archive/2" className="paginationLink archiveLink">
              Archives
              <FaAngleDoubleRight />
            </Link>
          </div>
          {/* <Sidebar /> */}
        </PageContainer>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___datePublished], order: DESC }
      limit: 12
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            datePublished(formatString: "MMMM DD, YYYY")
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
