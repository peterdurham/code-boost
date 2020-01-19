import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"
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
      <div className="PostPreview__image">
        <Image fluid={frontmatter.featuredImage.childImageSharp.fluid} />
      </div>
      <div className="PostPreview__title">
        <h3>
          <Link style={{ boxShadow: `none` }} to={slug}>
            {title}
          </Link>
        </h3>
      </div>
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
