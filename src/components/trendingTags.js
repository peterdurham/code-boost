import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

const TrendingTagStyles = styled.div`
  margin-top: 12px;
  width: $width-medium;

  @media (max-width: 1040px) {
    width: 100%;
  }
  .trendingTagsHeader {
    font-family: $font-header;
    font-size: 2.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
    display: inline-block;
  }

  .trendingTags {
    display: flex;
    flex-wrap: wrap;
    width: 96rem;

    @media (max-width: 1040px) {
      width: 100%;
    }
  }
`

const Trending = () => {
  const data = useStaticQuery(graphql`
    {
      tagsGroup: allMarkdownRemark(limit: 4) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  const tags = data.tagsGroup.group
    // .filter(tag => tag.totalCount > 1)
    .map(tag => {
      return tag.fieldValue
    })

  return (
    <TrendingTagStyles>
      <div className="yellow-box-container">
        <div className="yellow-box"></div>
        <h2 className="trendingTagsHeader">Trending Topics</h2>
      </div>
      <div className="trendingTags">
        {tags.map(tag => {
          return (
            <Link
              to={`/tag/${tag
                .split(" ")
                .join("-")
                .split("/")
                .join("-")
                .toLowerCase()}`}
              className="Tag"
              key={tag}
            >
              {tag}
            </Link>
          )
        })}
      </div>
    </TrendingTagStyles>
  )
}
export default Trending
