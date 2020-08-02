import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
import { CardsLayout } from "./styles/CardsLayout"
import CardSearch from "./cardSearch"

const SearchResultsStyles = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: 16rem 4rem;
`

function SearchResults({ searchTerm, resetSearchTerm }) {
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
    <SearchResultsStyles>
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
          if (searchTerm) {
            resetSearchTerm()
          }
        }}
      >
        <Link to="/" className="paginationLink searchLink">
          Home
        </Link>
      </button>
    </SearchResultsStyles>
  )
}
export default SearchResults
