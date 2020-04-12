import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

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
        />
      ))}
    </div>
  )
}
const Topic = ({ name, slug, lightImage, darkImage, darkMode }) => {
  console.log(darkMode, "DARKMODE")
  return (
    <Link to={`/${slug}`} className="TopicPreview">
      <div>
        {/* <BackgroundImage
            fluid={image.childImageSharp.fluid}
            className="Topic__image"
            alt={name}
          ></BackgroundImage> */}

        <Image
          className="TopicPreview__image"
          fluid={darkImage.childImageSharp.fluid}
          alt={name}
        />

        <Image
          className="TopicPreview__image"
          fluid={lightImage.childImageSharp.fluid}
          alt={name}
        />

        <h3 className="TopicPreview__name">{name}</h3>
      </div>
    </Link>
  )
}
export default Topics
