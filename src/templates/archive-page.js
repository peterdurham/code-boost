import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa"
import { CardsLayout } from "../components/styles/CardsLayout"

const PageContainer = styled.div`
  display: flex;
  padding-top: 20px;
  .pageContent {
    max-width: 1040px;
    @media (max-width: 1200px) {
      max-width: 100%;
    }
  }

  & .paginationLinks {
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 600px) {
      width: 92%;
    }
  }

  & .paginationLinks a:hover {
    transform: translateY(2px);
  }
  & .paginationDetails {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.32), 0 0 0 1px hsla(0, 0%, 4%, 0.1);
    color: ${props => props.theme.dark};
    padding: 14px 22px;
    font-size: 17px;
    min-width: 154px;
    max-width: 197px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.1s all;
    @media (max-width: 600px) {
      width: 50%;
      min-width: 100px;
      max-width: 150px;
      margin-bottom: 20px;
    }
  }

  & .paginationDisabled {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.32), 0 0 0 1px hsla(0, 0%, 4%, 0.1);
    color: ${props => props.theme.mediumLight};
    padding: 14px 22px;
    font-size: 17px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    cursor: pointer;
    font-family: ${props => props.theme.fontHeader};
    & svg {
      font-size: 2.2rem;
    }
  }
  @media (min-width: 600px) {
    .icon-left {
      margin-right: 8px;
    }
    .icon-right {
      margin-left: 8px;
    }
  }
`

class Archive extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { numPages, numPosts, currentPage } = pageContext
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
            <h2>Tutorials</h2>
            <CardsLayout>
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <Card
                    key={node.fields.slug}
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
            <div className="paginationLinks">
              {currentPage === 1 && (
                <button disabled className="paginationDisabled">
                  <FaAngleDoubleLeft className="icon-left" />
                  <span className="mobile-hidden">Previous</span>
                </button>
              )}
              {currentPage === 2 && (
                <Link to="/archive" className="paginationLink">
                  <FaAngleDoubleLeft />
                  <span className="mobile-hidden">Previous</span>
                </Link>
              )}
              {currentPage > 2 && (
                <Link
                  to={`/archive/${currentPage - 1}`}
                  className="paginationLink"
                >
                  <FaAngleDoubleLeft />
                  <span className="mobile-hidden">Previous</span>
                </Link>
              )}
              {currentPage > 0 && (
                <div className="paginationDetails">
                  <span className="mobile-hidden">Page</span>&nbsp;
                  {currentPage} of {numPages}
                </div>
              )}
              {currentPage < numPages ? (
                <Link
                  to={`/archive/${currentPage + 1}`}
                  className="paginationLink"
                >
                  <span className="mobile-hidden">Next</span>
                  <FaAngleDoubleRight />
                </Link>
              ) : (
                <button disabled className="paginationDisabled">
                  <span className="mobile-hidden">Next</span>
                  <FaAngleDoubleRight className="icon-right" />
                </button>
              )}
            </div>
            {}
          </div>
          {/* <Sidebar /> */}
        </PageContainer>
      </Layout>
    )
  }
}

export default Archive

export const pageQuery = graphql`
  query archiveQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
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
  }
`
