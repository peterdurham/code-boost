import React, { useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import ModeContext from "../context/ModeContext"
import styled from "styled-components"

const TopicLinkStyles = styled.div`
  display: grid;
  grid-template-columns: 120px 120px 120px 120px 120px 120px;
  grid-column-gap: 48px;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 1040px) {
    grid-template-columns: 15% 15% 15% 15% 15% 15%;
    grid-column-gap: 2%;
  }
  @media (max-width: 840px) {
    grid-template-columns: 30% 30% 30%;
    grid-column-gap: 5%;
    grid-row-gap: 20px;
  }

  .topicLinkImage {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 1rem auto 0.4rem auto;
    transition: all 0.3s;
    @media (max-width: 1040px) {
      width: 105px;
      height: 105px;
    }
    @media (max-width: 600px) {
      width: 90px;
      height: 90px;
    }
  }
  .topicLinkName {
    text-align: center;
    font-size: 1.8rem;
    line-height: 2.47rem;
    letter-spacing: 1.2px;
    font-family: $font-header;
    transition: all 0.3s;
  }
  .topicLink:hover .topicLinkImage {
    transform: scale(1.14);
  }
`

const TopicLinks = () => {
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
    <TopicLinkStyles>
      {topics.map(({ node: item }) => (
        <Link to={`/${item.slug}`} key={item.name}>
          <div className="topicLink">
            {item.darkMode ? (
              <Image
                className="topicLinkImage"
                fluid={item.darkImage.childImageSharp.fluid}
                alt={item.name}
              />
            ) : (
              <Image
                className="topicLinkImage"
                fluid={item.lightImage.childImageSharp.fluid}
                alt={item.name}
              />
            )}

            <h3 className="topicLinkName">{item.name}</h3>
          </div>
        </Link>
      ))}
    </TopicLinkStyles>
  )
}

export default TopicLinks
