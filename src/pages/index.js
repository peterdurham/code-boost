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
    @media (max-width: 740px) {
      margin-top: 10px;
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
    console.log(res.data)
    if (res.data.message === "email already exists") {
      setMessage("already-registered")
    } else if (res.data._id) {
      setMessage("confirmation-success")
    }
  }

  const { data } = props
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

              if (index > 1 && index < 8) {
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
                    <strong className="italic">Thank you</strong> for signing
                    up!
                  </span>
                  <span>
                    Please <span className="italic">check your email</span> for
                    confirmation 💻
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
            {posts.map(({ node }, index) => {
              const title = node.frontmatter.title || node.fields.slug
              const topicLogo = data.allTopicsJson.edges.filter(
                edge => edge.node.name === node.frontmatter.category
              )[0]

              if (index > 7) {
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
              return null
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
