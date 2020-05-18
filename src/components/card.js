import React from "react"
import { Link } from "gatsby"

import BackgroundImage from "gatsby-background-image"

const Card = ({ frontmatter, title, slug, date, description, excerpt }) => {
  return (
    <article className="Card" key={slug}>
      <Link style={{ boxShadow: `none` }} to={slug}>
        <BackgroundImage
          fluid={frontmatter.featuredImage.childImageSharp.fluid}
          className="Card__image"
        ></BackgroundImage>
        <div className="Card__title">
          <div className="Card__tag">{frontmatter.category}</div>
          <h3>{title}</h3>
        </div>
      </Link>
    </article>
  )
}
export default Card
