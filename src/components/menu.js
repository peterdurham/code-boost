import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Search from "./search"
import { IoIosSearch } from "react-icons/io"

const Menu = () => {
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
            }
          }
        }
      }
    }
  `)
  const tags = data.tagsGroup.group.map(tag => tag.fieldValue)
  const blogPosts = data.allMarkdownRemark.edges
  console.log(blogPosts)

  return (
    <div className="Menu">
      <div id={"menu-container"}>
        <div className="Menu__search">
          <input type="text" placeholder="Search" />
          <Search />
          <div className="Menu__search--icon">
            <IoIosSearch />
          </div>
        </div>
        <div className="Menu__top">
          <div className="Menu__top--left">
            <h2>Topics →</h2>
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
            <h2>Individual Topics →</h2>
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
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Subtmit</Link>
        </div>
      </div>
    </div>
  )
}
export default Menu
