import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Trending = () => {
  const data = useStaticQuery(graphql`
    {
      tagsGroup: allMarkdownRemark(limit: 10) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  const tags = data.tagsGroup.group.map(tag => tag.fieldValue)

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
              className="Trending__topic"
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
