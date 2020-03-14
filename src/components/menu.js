import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Menu = () => {
  const data = useStaticQuery(graphql`
    {
      tagsGroup: allMarkdownRemark(limit: 100) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  const tags = data.tagsGroup.group.map(tag => tag.fieldValue)
  console.log(tags)
  return (
    <div className="Menu">
      <div id={"menu-container"}>
        <div>
          <input />
          Search
        </div>
        <div className="Menu__top">
          <div className="Menu__top--left">
            <h2>Topics</h2>
            <div>
              <div>JavaScript</div>
              <div>CSS</div>
              <div>React</div>
              <div>Node</div>
              <div>GraphQL</div>
              <div>Tools</div>
            </div>
          </div>
          <div className="Menu__top--right">
            <h2>Tags</h2>
            <div>
              {tags.map(tag => (
                <div>{tag}</div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div>About</div>
          <div>Contact</div>
          <div>Subtmit</div>
        </div>
      </div>
    </div>
  )
}
export default Menu
