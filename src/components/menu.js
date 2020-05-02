import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Card from "./card"
import { IoIosSearch } from "react-icons/io"

const Menu = ({ menuOpen }) => {
  const data = useStaticQuery(graphql`
    {
      tagsGroup: allMarkdownRemark(limit: 100) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      allMarkdownRemark {
        edges {
          node {
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
  `)

  const [searchTerm, setSearchTerm] = useState("")

  const tags = data.tagsGroup.group.map(tag => tag.fieldValue)
  const blogPosts = data.allMarkdownRemark.edges

  const filteredPosts = blogPosts.filter(({ node }) => {
    const { frontmatter } = node

    const titleMatch = frontmatter.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const topicMatch = frontmatter.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const tagsMatch = frontmatter.tags
      .map(tag => tag.toLowerCase())
      .some(tag => tag.includes(searchTerm.toLowerCase()))
    const descriptionMatch = frontmatter.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    return titleMatch || topicMatch || tagsMatch || descriptionMatch
  })

  return (
    <div className="Menu">
      <div id={"menu-container"}>
        <div className="Menu__search">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="Menu__search--icon">
            <IoIosSearch />
          </div>
        </div>
        {searchTerm ? (
          <>
            <h3>
              Search Results for "<strong>{searchTerm}</strong>"
            </h3>
            <div className="Cards-layout Menu__search--result">
              {filteredPosts.map(({ node }) => (
                <Card
                  key={node.frontmatter.title}
                  title={node.frontmatter.title}
                  slug={node.fields.slug}
                  date={node.frontmatter.date}
                  description={node.frontmatter.description}
                  frontmatter={node.frontmatter}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="Menu__top">
              <div className="Menu__top--left">
                <h3>Categories →</h3>
                <div className="Menu__topics">
                  <Link to="/javascript">JavaScript</Link>
                  <Link to="/css">CSS</Link>
                  <Link to="/react">React</Link>
                  <Link to="/node">Node</Link>
                  <Link to="/graphql">GraphQL</Link>
                  <Link to="/tools">Tools</Link>
                </div>
              </div>
              <div className="Menu__top--right">
                <h3>Individual Topics →</h3>
                <div className="Menu__tags">
                  {tags.map((tag, index) => {
                    if (index < 24) {
                      return (
                        <Link
                          key={tag}
                          className="Tag"
                          to={`/tag/${tag
                            .split(" ")
                            .join("-")
                            .split("/")
                            .join("-")
                            .toLowerCase()}`}
                        >
                          {tag}
                        </Link>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            </div>
            <div className="Menu__bottom">
              <Link to="/about">About</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default Menu
