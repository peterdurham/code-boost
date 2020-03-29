import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundImage from "gatsby-background-image"

class BlogPostTemplate extends React.Component {
  // componentDidMount() {
  //   var nav = document.querySelector("#nav-container")

  //   var scrollPos = 0

  //   window.addEventListener("scroll", function() {
  //     var scrollTop = document.body.getBoundingClientRect().top

  //     if (scrollTop < -210) {
  //       if (scrollTop > scrollPos) {
  //         nav.classList.remove("slide-out")
  //         nav.classList.add("slide-in")

  //         setTimeout(() => {
  //           nav.classList.remove("translated-out")
  //           nav.classList.add("translated-in")
  //         }, 400)
  //       } else {
  //         nav.classList.remove("slide-in")
  //         nav.classList.add("slide-out")
  //         setTimeout(() => {
  //           nav.classList.remove("translated-in")
  //           nav.classList.add("translated-out")
  //         }, 400)
  //       }
  //     }
  //     scrollPos = scrollTop
  //   })
  // }
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
            <p>{post.frontmatter.date}</p>
            <div id="BlogPost__header--tags">
              {post.frontmatter.tags.map(tag => (
                <Link
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
          <hr />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
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
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
