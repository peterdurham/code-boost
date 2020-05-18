import React from "react"
import { Link } from "gatsby"

const CardSearch = ({
  frontmatter,
  title,
  slug,
  date,
  description,
  excerpt,
}) => {
  return (
    <article className="CardSearch" key={slug}>
      <Link style={{ boxShadow: `none` }} to={slug}>
        <div className="CardSearch__title">
          <div className="CardSearch__tag">{frontmatter.category}</div>
          <h3>{title}</h3>
        </div>
      </Link>
    </article>
  )
}
export default CardSearch
