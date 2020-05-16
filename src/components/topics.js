import React, { useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import ModeContext from "../context/ModeContext"

const Topics = () => {
  const data = useStaticQuery(graphql`
    {
      allTopicsJson {
        edges {
          node {
            name
            slug
            lightImage {
              childImageSharp {
                fluid(maxWidth: 240, maxHeight: 240) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            darkImage {
              childImageSharp {
                fluid(maxWidth: 240, maxHeight: 240) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)
  let topics = data.allTopicsJson.edges
  const mode = useContext(ModeContext)
  return (
    <div className="TopicPreviews">
      {topics.map(({ node: item }) => (
        <Topic
          key={item.name}
          name={item.name}
          slug={item.slug}
          image={item.image}
          lightImage={item.lightImage}
          darkImage={item.darkImage}
          darkMode={mode.darkMode}
        />
      ))}
    </div>
  )
}
const Topic = ({ name, slug, lightImage, darkImage, darkMode }) => {
  return (
    <Link to={`/${slug}`}>
      <div className="TopicPreview">
        {darkMode ? (
          <Image
            className="TopicPreview__image"
            fluid={darkImage.childImageSharp.fluid}
            alt={name}
          />
        ) : (
          <Image
            className="TopicPreview__image"
            fluid={lightImage.childImageSharp.fluid}
            alt={name}
          />
        )}

        <h3 className="TopicPreview__name">{name}</h3>
      </div>
    </Link>
  )
}
export default Topics
