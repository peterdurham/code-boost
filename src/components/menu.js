import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

import CardSearch from "./cardSearch"
import { IoIosSearch } from "react-icons/io"
import { CardsLayout } from "./styles/CardsLayout"

const MenuStyles = styled.div`
  padding-top: 104px;
  min-height: 100vh;
  position: fixed;
  width: 100%;
  z-index: 1;

  & h3 {
    margin-bottom: 24px;
  }

  .menuContainer {
    width: ${props => props.theme.widthMedium};
    margin: 0 auto;
    text-align: center;

    @media (max-width: 1040px) {
      width: 90%;
      margin: 0 5%;
    }
  }
  .menuSearch {
    position: relative;
    width: 50%;
    margin: 30px auto 60px auto;
    @media (max-width: 1040px) {
      width: 100%;
    }
    & input {
      width: 100%;
      border: 2px solid rgba(37, 37, 37, 0.15);
      padding: 12px 16px 12px 32px;
      font-size: 16px;
      outline: 0;
    }
  }
  .menuSearchIcon {
    position: absolute;
    top: 12px;
    left: 8px;
    font-size: 2rem;
  }
  .menuSearchResult {
    padding-bottom: 60px;

    & .Card {
      margin-bottom: 30px;
    }
  }
  .menuTopics {
    display: flex;
    flex-direction: column;

    @media (max-width: 1040px) {
      margin-bottom: 20px;
    }
    & a {
      font-size: 2rem;
      margin-bottom: 0.7rem;
      font-weight: 700;
      transition: all 0.3s;
    }
    @media (min-width: 600px) {
      & a:hover {
        background: -webkit-linear-gradient(#01a692, #84cf00);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .menuTags {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 1040px) {
      width: 100%;
    }
  }
  .menuTop {
    display: flex;
    height: 60vh;
    text-align: left;

    @media (max-width: 1040px) {
      flex-direction: column;
    }
    @media (max-width: 600px) {
      height: auto;
    }
  }
  .menuTopLeft {
    width: 25%;

    @media (max-width: 1040px) {
      width: 100%;
    }
  }
  .menuTopRight {
    width: 75%;
    @media (max-width: 1040px) {
      width: 100%;
    }
  }
  .menuBottom {
    width: 50px;
    margin: 0 auto;
    margin-top: 40px;
    & a {
      margin: 0 10px;
      font-size: 1.6rem;
      transition: all 0.3s;
    }
    @media (min-width: 600px) {
      & a:hover {
        background: -webkit-linear-gradient(#01a692, #84cf00);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    @media (max-width: 600px) {
      margin-bottom: 50px;
    }
  }
`

const Menu = ({ menuOpen, toggleMenu }) => {
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
    <MenuStyles className="Menu">
      <div className="menuContainer">
        <div className="menuSearch">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="menuSearchIcon">
            <IoIosSearch />
          </div>
        </div>
        {searchTerm ? (
          <>
            <h3>
              Search Results for "<strong>{searchTerm}</strong>"
            </h3>
            <CardsLayout className="menuSearchResult">
              {filteredPosts.map(({ node }) => (
                <CardSearch
                  key={node.frontmatter.title}
                  title={node.frontmatter.title}
                  slug={node.fields.slug}
                  date={node.frontmatter.date}
                  description={node.frontmatter.description}
                  frontmatter={node.frontmatter}
                />
              ))}
            </CardsLayout>
            <button
              className="searchLinkContainer"
              onClick={() => {
                if (menuOpen) {
                  toggleMenu()
                }
              }}
            >
              <Link to="/" className="paginationLink searchLink">
                Home
              </Link>
            </button>
          </>
        ) : (
          <>
            <div className="menuTop">
              <div className="menuTopLeft">
                <h3>Categories →</h3>
                <div className="menuTopics">
                  <Link to="/javascript">JavaScript</Link>
                  <Link to="/css">CSS</Link>
                  <Link to="/react">React</Link>
                  <Link to="/node">Node</Link>
                  <Link to="/graphql">GraphQL</Link>
                  <Link to="/tools">Tools</Link>
                </div>
              </div>
              <div className="menuTopRight">
                <h3>Individual Topics →</h3>
                <div className="menuTags">
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
            <div className="menuBottom">
              <Link to="/about">About</Link>
            </div>
          </>
        )}
      </div>
    </MenuStyles>
  )
}
export default Menu
