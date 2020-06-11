import React from "react"
import { Link, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
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

class BlogPostTemplate extends React.Component {
  state = {
    tocItems: [],
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

  render() {
    const { data, pageContext, location } = this.props
    const post = data.markdownRemark
    const siteTitle = data.site.siteMetadata.title
    const { previous, next, topic } = pageContext
    const { tocItems } = this.state
    const similarPosts = data.allMarkdownRemark.edges
      .filter(item => {
        return (
          item.node.frontmatter.category === topic &&
          item.node.frontmatter.title !== post.frontmatter.title
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
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
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
