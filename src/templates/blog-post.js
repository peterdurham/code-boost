import React from "react"
import { Link, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import _ from "lodash"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GiQuillInk } from "react-icons/gi"

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
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const { tocItems } = this.state

    return (
      <Layout location={this.props.location} title={siteTitle} pageType="Post">
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <article>
          <header id="BlogPost__header">
            <h1>{post.frontmatter.title}</h1>
            <p id="BlogPost__header--date">{post.frontmatter.date}</p>
            <div id="BlogPost__header--tags">
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
              className="BlogPost__image"
            ></BackgroundImage>
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
          </header>
          <section
            className="BlogPost__markdown"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        <nav id="BlogPost__footer">
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
        </nav>
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
        description
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
