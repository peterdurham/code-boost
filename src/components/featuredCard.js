import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import styled from "styled-components"

const FeaturedCardStyles = styled.article`
  width: 465px;

  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  margin-bottom: 40px;
  &:hover {
    transform: translate(4px, -4px);
  }
  @media (max-width: 1040px) {
    width: calc(50% - 10px);
  }
  @media (max-width: 840px) {
    width: 100%;
  }
  @media (min-width: 1040px) {
    &:not(:nth-child(2n)) {
      margin-right: 3rem;
    }
  }
  @media (max-width: 1040px) and (min-width: 600px) {
    &:not(:nth-child(2n)) {
      margin-right: 2rem;
    }
  }

  & .cardImage {
    height: 24.3rem;
    width: 100%;
    background-size: cover;
    background-position: 50% 100%;
    @media (max-width: 1040px) {
      height: calc(50vw / 2);
    }
    @media (max-width: 840px) {
      height: calc(100vw / 2.5);
    }
    @media (max-width: 600px) {
      height: calc(100vw / 2.5);
    }
  }
  & .cardTag {
    position: absolute;
    background: ${props => props.theme.gradient02};
    color: #fff;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 1px;
    font-family: ${props => props.theme.fontHeader};
    left: 16px;
    top: -12px;
    line-height: 16px;
    padding: 4px 7px;
  }
  & .cardTopicLogo {
    position: absolute;
    left: 10px;
    top: -64px;
    width: 52px;
    height: 52px;
  }

  & .cardTitle {
    height: 9.6rem;
    padding: 2.4rem 1.6rem;
    font-family: ${props => props.theme.fontHeader};
    font-weight: 400 !important;
    line-height: 2.8rem;
    position: relative;

    @media (max-width: 1040px) {
      height: calc(50vw / 3.75);
    }

    @media (max-width: 600px) {
      height: calc(100vw / 4.4);
    }

    & h3 {
      font-size: 19px;
      @media (max-width: 840px) {
        font-size: 15px;
        line-height: 21px;
      }
    }
    & a {
      font-size: 1.96rem;
    }
  }
`

const FeaturedCard = ({
  frontmatter,
  title,
  slug,
  date,
  description,
  excerpt,
  topic,
}) => {
  return (
    <FeaturedCardStyles key={slug}>
      <Link style={{ boxShadow: `none` }} to={slug}>
        <BackgroundImage
          fluid={frontmatter.featuredImage.childImageSharp.fluid}
          className="cardImage"
        ></BackgroundImage>
        <div className="cardTitle">
          {/* <div className="cardTopicLogo">
            <Image fluid={topic.darkImage.childImageSharp.fluid} />
          </div> */}
          <div className="cardTag">{frontmatter.category}</div>
          <h3>{title}</h3>
        </div>
      </Link>
    </FeaturedCardStyles>
  )
}
export default FeaturedCard
