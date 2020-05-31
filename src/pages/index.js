import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TrendingTags from "../components/trendingTags"
import TopicLinks from "../components/topicLinks"
import FeaturedCard from "../components/featuredCard"
import Card from "../components/card"
import Sidebar from "../components/sidebar"
import { FaAngleDoubleRight } from "react-icons/fa"
import { CardsLayout } from "../components/styles/CardsLayout"

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

    .tutorialsHeader {
      font-family: $font-header;
      font-size: 2.1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
      display: inline-block;
    }
    .featuredCards {
      display: flex;
      @media (max-width: 840px) {
        flex-direction: column;
      }
    }
  }
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    const featuredPost1 = posts[0].node
    const featuredTopicLogo1 = data.allTopicsJson.edges.filter(
      edge => edge.node.name === featuredPost1.frontmatter.category
    )[0]
    const featuredPost2 = posts[1].node
    const featuredTopicLogo2 = data.allTopicsJson.edges.filter(
      edge => edge.node.name === featuredPost2.frontmatter.category
    )[0]

    return (
      <Layout location={this.props.location} title={siteTitle} pageType="Home">
        <PageContainer>
          <div className="pageContent">
            <SEO
              title="Code-Boost Tutorials"
              canonical={`https://www.code-boost.com/`}
            />
            <TrendingTags />
            <TopicLinks />
            <div className="yellow-box-container">
              <div className="yellow-box"></div>
              <h2 className="tutorialsHeader">Tutorials</h2>
            </div>
            <div className="featuredCards">
              <FeaturedCard
                title={featuredPost1.frontmatter.title}
                slug={featuredPost1.fields.slug}
                date={featuredPost1.frontmatter.date}
                description={featuredPost1.frontmatter.description}
                frontmatter={featuredPost1.frontmatter}
                topic={featuredTopicLogo1}
              />
              <FeaturedCard
                title={featuredPost2.frontmatter.title}
                slug={featuredPost2.fields.slug}
                date={featuredPost2.frontmatter.date}
                description={featuredPost2.frontmatter.description}
                frontmatter={featuredPost2.frontmatter}
                topic={featuredTopicLogo2}
              />
            </div>
            <CardsLayout>
              {posts.map(({ node }, index) => {
                const title = node.frontmatter.title || node.fields.slug
                const topicLogo = data.allTopicsJson.edges.filter(
                  edge => edge.node.name === node.frontmatter.category
                )[0]

                if (index > 1) {
                  return (
                    <Card
                      key={node.fields.slug}
                      title={title}
                      slug={node.fields.slug}
                      date={node.frontmatter.date}
                      description={node.frontmatter.description}
                      frontmatter={node.frontmatter}
                      topic={topicLogo.node}
                    />
                  )
                }
                return
              })}
            </CardsLayout>
            <Link to="/archive/2" className="paginationLink archiveLink">
              📚 Tutorial Archives
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
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 14
    ) {
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
    allTopicsJson {
      edges {
        node {
          name
          slug
          lightImage {
            childImageSharp {
              fluid(maxWidth: 240, maxHeight: 240) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          darkImage {
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
