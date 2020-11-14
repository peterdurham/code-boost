import React from "react"
import { Link, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import axios from "axios"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { GiQuillInk } from "react-icons/gi"
import Card from "../components/card"
import Sidebar from "../components/sidebar"
import styled from "styled-components"

const PageContent = styled.main`
  display: flex;
  /* FOR BLOG POST WITH SIDEBAR */
  /* width: 1060px; */

  width: ${props => props.theme.widthSmall};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 900px) {
    width: 92%;
  }
`
const BlogPost = styled.article`
  width: 100%;

  header {
    & h1 {
      font-weight: 400;
    }
    & .blogPostDate {
      font-size: 1.42rem;
      line-height: 2.2rem;
      margin-top: 0.4rem;
    }
    & .blogPostTags {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    & .blogPostImage {
      height: 38.743rem;
      margin: 2.5rem 0 3.2rem 0;
      background-size: cover;
      background-position: 50% 100%;
      @media (max-width: 600px) {
        height: 24rem;
      }
    }
  }
  .tableOfContents {
    padding: 20px 20px;
    border-radius: 4px;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 26.88px;
    box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.1), 0 0 0 1px hsla(0, 0%, 4%, 0.1);

    & a {
      color: $color-black;
      transition: all 0.3s;
    }
    & a:not(:last-child) {
      margin-bottom: 12px;
    }
    & a:hover {
      color: ${props => props.theme.yellow};
    }

    & svg {
      margin-right: 8px;
      font-size: 1.8rem;
    }
  }
`

const BlogPostMarkdown = styled.section`
  width: ${props => props.theme.widthSmall};
  margin: 0 auto;
  & a {
    color: ${props => props.theme.blue};
  }
  & a:hover {
    text-decoration: underline;
  }
  & h2 {
    margin-top: 6rem;
  }
  & h3 {
    margin-top: 6rem;
  }
  & ul {
    margin: 2.7rem 2rem;
  }
  & li {
    margin-left: 2rem;
    margin-bottom: 0.4rem;
    font-size: 1.75rem;
    line-height: 2.8rem;
  }
  & img {
    margin: 36px 0;
    width: 100%;
  }
  @media (max-width: 740px) {
    & img {
      width: 100%;
    }
  }
  .gatsby-resp-image-wrapper {
    margin: 6rem 0;
    box-shadow: 0 7px 12px 0 rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 780px) {
    width: 100%;
  }
`

const BlogPostSimilar = styled.div`
  width: 100%;
  margin: 60px auto;

  section {
    display: flex;
    flex-wrap: wrap;
    & .Card {
      margin-right: 40px;
    }
    & .Card:not(:last-child) {
      margin-bottom: 24px;
    }
    @media (max-width: 900px) {
      flex-direction: column;
    }
  }

  @media (max-width: 780px) {
    width: 100%;
  }
`

const RegisterStyles = styled.div`
  width: 100%;
  margin: 60px auto 20px auto;
  height: 286px;

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
    width: 100%;
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

class BlogPostTemplate extends React.Component {
  state = {
    tocItems: [],
    message: "",
  }

  componentDidMount() {
    const headerEls = document.querySelectorAll("h2")
    const headerData = []

    headerEls.forEach(el => {
      el.id = `${_.kebabCase(el.textContent)}`
      const tocItem = {
        text: el.textContent,
        id: el.id,
      }
      headerData.push(tocItem)
    })
    this.setState({ tocItems: headerData })
  }

  onSubscribe = async e => {
    e.preventDefault()

    const newUser = {
      email: e.target.email.value,
    }

    const res = await axios.post(
      "https://email.code-boost.com/api/users/register",
      newUser
    )

    if (res.data.message === "email already exists") {
      this.setMessage("already-registered")
    } else if (res.data._id) {
      this.setMessage("confirmation-success")
    }
  }

  setMessage = msg => {
    this.setState({ message: msg })
  }

  render() {
    const { data, pageContext, location } = this.props
    const post = data.markdownRemark
    const siteTitle = data.site.siteMetadata.title
    const { previous, next, topic } = pageContext
    const { tocItems } = this.state
    const similarPosts = data.allMarkdownRemark.edges
      .filter(item => {
        return (
          item.node.frontmatter.title !== post.frontmatter.title &&
          (item.node.frontmatter.tags.includes(topic) ||
            item.node.frontmatter.category === topic)
        )
      })
      .filter((item, index) => {
        return index < 2
      })

    return (
      <Layout location={location} title={siteTitle} pageType="Post">
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          slug={pageContext.slug}
          frontmatter={post.frontmatter}
          isBlogPost={true}
          canonical={`https://code-boost.com${pageContext.slug}`}
        />
        <PageContent>
          <BlogPost>
            <header>
              <h1>{post.frontmatter.title}</h1>
              <p className="blogPostDate">{post.frontmatter.date}</p>
              <div className="blogPostTags">
                {post.frontmatter.tags.map(tag => (
                  <Link
                    className="Tag"
                    key={tag}
                    to={`/tag/${tag
                      .split(" ")
                      .join("-")
                      .split("/")
                      .join("-")
                      .toLowerCase()}`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <BackgroundImage
                fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
                className="blogPostImage"
              ></BackgroundImage>
              {tocItems.length > 0 && (
                <div className="tableOfContents">
                  <h4>Table of Contents</h4>
                  {tocItems.map(item => {
                    return (
                      <a key={item.id} href={`./#${item.id}`}>
                        <GiQuillInk />
                        <span>{item.text}</span>
                      </a>
                    )
                  })}
                </div>
              )}
            </header>
            <BlogPostMarkdown
              className="blogPostMarkdown"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <RegisterStyles>
              <h3>
                <span className="normal">Code Boost</span> Newsletter
              </h3>
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
              <form onSubmit={this.onSubscribe}>
                <input type="email" id="email" />
                <input type="submit" id="submit" value="Subscribe" />
                {this.state.message === "confirmation-success" && (
                  <div className="signup-text">
                    <span>
                      <strong className="italic">Thank you</strong> for signing
                      up for the Code-Boost Newsletter!
                    </span>
                  </div>
                )}
                {this.state.message === "already-registered" && (
                  <div className="error-message signup-text">
                    <span>This email address is already registered.</span>
                  </div>
                )}
              </form>
            </RegisterStyles>
            <BlogPostSimilar>
              <h3>Other {this.props.pageContext.topic} Tutorials</h3>
              <section>
                {similarPosts.map(({ node }) => {
                  return (
                    <Card
                      key={node.fields.slug}
                      title={node.frontmatter.title}
                      slug={node.fields.slug}
                      date={node.frontmatter.date}
                      description={node.frontmatter.description}
                      excerpt={node.excerpt}
                      frontmatter={node.frontmatter}
                    />
                  )
                })}
              </section>
            </BlogPostSimilar>
          </BlogPost>
          {/* <Sidebar /> */}
        </PageContent>

        <footer className="blogPostLinks">
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </footer>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        dateModified(formatString: "MMMM DD, YYYY")
        description
        tags
        category
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            tags
            category
            videoID
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
