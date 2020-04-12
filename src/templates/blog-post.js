import React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundImage from "gatsby-background-image"

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    const headerEls = document.querySelectorAll("h2")
    const headerEl = document.querySelector("header")
    const tableOfContents = document.createElement("div")
    const tocLabel = document.createElement("h3")
    headerEls.forEach((el, index) => (el.id = `header-${index + 1}`))
    tableOfContents.classList.add("tableOfContents")
    tocLabel.innerText = "Table of Contents"
    tocLabel.style.color = "#fad000"
    tocLabel.style.marginBottom = "10px"
    tableOfContents.appendChild(tocLabel)

    headerEls.forEach((el, index) => {
      const tableLink = document.createElement("a")
      tableLink.innerText = el.innerText
      tableLink.href = `#${el.id}`
      tableOfContents.appendChild(tableLink)
    })

    if (headerEls.length > 0) {
      headerEl.appendChild(tableOfContents)
    }
  }

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

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
          </header>
          <section
            id="BlogPost__markdown"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* <footer>
            <Bio />
          </footer> */}
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
