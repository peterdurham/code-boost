import React from "react"
import { Link } from "gatsby"

import BackgroundImage from "gatsby-background-image"

const PostPreview = ({
  frontmatter,
  title,
  slug,
  date,
  description,
  excerpt,
}) => {
  return (
    <article className="PostPreview" key={slug}>
      <Link style={{ boxShadow: `none` }} to={slug}>
        <BackgroundImage
          fluid={frontmatter.featuredImage.childImageSharp.fluid}
          className="PostPreview__image"
        ></BackgroundImage>
        <div className="PostPreview__tag">{frontmatter.category}</div>
        <div className="PostPreview__title">
          <h3>{title}</h3>
        </div>
      </Link>
      {/* <small>{date}</small> */}

      {/* <section>
        <p
          dangerouslySetInnerHTML={{
            __html: description || excerpt,
          }}
        />
      </section> */}
    </article>
  )
}
export default PostPreview
