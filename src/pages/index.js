import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import axios from "axios"
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

const RegisterStyles = styled.div`
  width: 100%;
  height: 256px;
  margin-bottom: 40px;
  background: ${props => props.theme.darkest};
  color: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1040px) {
    height: auto;
  }
  @media (max-width: 740px) {
    padding: 18px;
    min-height: 252px;
    height: auto;
  }
  .normal {
    font-weight: 400;
  }
  & h2 {
    margin-bottom: 12px;
    @media (max-width: 740px) {
      font-size: 24px;
    }
  }
  & p {
    width: 65%;
    font-size: 20px;
    line-height: 28px;
    margin: 0;
    @media (max-width: 740px) {
      width: 100%;
      font-size: 13.5px;
      line-height: 20px;
    }
  }
  & p {
    margin-bottom: 12px;
  }
  & .italic {
    font-style: italic;
  }
  & form {
    align-self: flex-start;

    display: flex;
    align-items: center;
    margin-top: 12px;
    @media (max-width: 740px) {
      flex-direction: column;
      margin: 0 auto;
    }
  }
  & input[type="email"] {
    padding: 0 16px;
    border: 1px solid #fff;
    width: 240px;
    height: 36px;
    font-family: ${props => props.theme.fontHeader};
    font-size: 14px;
    transform-origin: 0% 50%;
    @media (max-width: 740px) {
      width: 100%;
      margin-bottom: 18px;
      height: 24px;
    }
  }
  & input[type="submit"] {
    padding: 0 16px;
    cursor: pointer;
    height: 36px;
    background: #0075ea;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    font-family: ${props => props.theme.fontHeader};
    border: none;
    @media (max-width: 740px) {
      line-height: 28px;
    }
  }
  & input[type="submit"]:hover {
    background: #0066cc;
  }
  & .signup-text {
    margin-left: 36px;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.5s;
    @media (max-width: 740px) {
      margin-top: 20px;
      width: 100%;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

function BlogIndex(props) {
  const [message, setMessage] = useState("")

  const onSubscribe = async e => {
    e.preventDefault()

    const newUser = {
      email: e.target.email.value,
    }

    const res = await axios.post(
      "https://email.code-boost.com/api/users/register",
      newUser
    )

    if (res.data.message === "email already exists") {
      setMessage("already-registered")
    } else if (res.data._id) {
      setMessage("confirmation-success")
    }
  }

  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const featured = data.featuredRemark.edges
  const articles = data.articlesRemark.edges
  const videos = data.videoRemark.edges

  return (
    <Layout location={props.location} title={siteTitle} pageType="Home">
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
            <h2 className="tutorialsHeader">Featured</h2>
          </div>
          <div className="featuredCards">
            {featured.map(({ node }, index) => {
              if (index < 2) {
                return (
                  <FeaturedCard
                    key={node.fields.slug}
                    title={node.frontmatter.title}
                    slug={node.fields.slug}
                    date={node.frontmatter.date}
                    description={node.frontmatter.description}
                    frontmatter={node.frontmatter}
                  />
                )
              }
              return null
            })}
          </div>
          <div className="yellow-box-container">
            <div className="yellow-box"></div>
            <h2 className="tutorialsHeader">Videos</h2>
          </div>
          <CardsLayout>
            {videos.map(({ node }, index) => {
              const title = node.frontmatter.title || node.fields.slug

              if (index < 3) {
                return (
                  <Card
                    key={node.fields.slug}
                    title={title}
                    slug={node.fields.slug}
                    date={node.frontmatter.date}
                    description={node.frontmatter.description}
                    frontmatter={node.frontmatter}
                  />
                )
              }
              return null
            })}
          </CardsLayout>
          <div className="yellow-box-container">
            <div className="yellow-box"></div>
            <h2 className="tutorialsHeader">Articles</h2>
          </div>
          <CardsLayout>
            {articles.map(({ node }, index) => {
              const title = node.frontmatter.title || node.fields.slug

              if (index < 6) {
                return (
                  <Card
                    key={node.fields.slug}
                    title={title}
                    slug={node.fields.slug}
                    date={node.frontmatter.date}
                    description={node.frontmatter.description}
                    frontmatter={node.frontmatter}
                  />
                )
              }
              return null
            })}
          </CardsLayout>

          <RegisterStyles>
            <h2>
              <span className="normal">Code Boost</span> Newsletter
            </h2>
            <p>
              Are you looking for <span className="italic">modern</span> web
              development tutorials about{" "}
              <span className="italic">JavaScript</span>,{" "}
              <span className="italic">React</span>,{" "}
              <span className="italic">Node</span>,{" "}
              <span className="italic">CSS</span>,{" "}
              <span className="italic">GraphQL</span>, and more? 🔥
            </p>
            <p>If so, stay current with our weekly update! 📫</p>
            <form onSubmit={onSubscribe}>
              <input type="email" id="email" />
              <input type="submit" id="submit" value="Subscribe" />
              {message === "confirmation-success" && (
                <div className="signup-text">
                  <span>
                    <strong className="italic">Thank you</strong> for signing up
                    for the Code-Boost Newsletter!
                  </span>
                </div>
              )}
              {message === "already-registered" && (
                <div className="error-message signup-text">
                  <span>This email address is already registered.</span>
                </div>
              )}
            </form>
          </RegisterStyles>

          <CardsLayout>
            {articles.map(({ node }, index) => {
              const title = node.frontmatter.title || node.fields.slug

              if (index >= 6 && index < 12) {
                return (
                  <Card
                    key={node.fields.slug}
                    title={title}
                    slug={node.fields.slug}
                    date={node.frontmatter.date}
                    description={node.frontmatter.description}
                    frontmatter={node.frontmatter}
                  />
                )
              }
              return null
            })}
          </CardsLayout>
          <Link to="/archive/2" className="paginationLink archiveLink">
            📚 More Articles
            <FaAngleDoubleRight />
          </Link>
        </div>
        {/* <Sidebar /> */}
      </PageContainer>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    featuredRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { featuredPost: { eq: true } } }
      limit: 2
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            templateKey
            title
            description
            tags
            featuredPost
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
    articlesRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          featuredPost: { eq: false }
        }
      }
      limit: 12
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            templateKey
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
    videoRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          templateKey: { eq: "video-post" }
          featuredPost: { eq: false }
        }
      }
      limit: 6
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            category
            videoID
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
