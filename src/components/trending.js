import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

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
    <div className="Trending">
      <h2 className="Trending__header">Trending Topics</h2>
      <div className="Trending__topics">
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
    </div>
  )
}
export default Trending
