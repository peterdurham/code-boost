import React, { useEffect } from "react"
import { Link, useStaticQuery } from "gatsby"
import axios from "axios"
import styled from "styled-components"
import Image from "gatsby-image"

import Layout from "../components/layout"

const UnsubscribePageStyles = styled.div`
  width: 740px;
  margin: 0 auto;
  position: relative;
  margin-top: 24px;
  @media (max-width: 740px) {
    width: 100%;
  }
  & .italic {
    font-style: italic;
  }
  & .unsubscribe-image {
    filter: brightness(0.5);
  }
  & #unsubscribe-message {
    color: #fff;
    position: absolute;
    top: 42px;
    left: 42px;
    @media (max-width: 740px) {
      top: 12px;
      left: 0px;
      padding: 0 20px;
    }
  }
  & #unsubscribe-links-container {
    display: flex;
    margin: 0 auto;
    width: 100%;
    @media (max-width: 740px) {
      width: 280px;
    }
  }
  & #site-links-header {
    margin: 4rem 0 2rem 0;
    font-size: 2.4rem;
    @media (max-width: 740px) {
      text-align: center;
    }
  }
  & .unsubscribe-links-column {
    display: flex;
    flex-direction: column;
    width: 20%;
    @media (max-width: 740px) {
      width: 120px;
      margin: 0 20px;
      & a {
        margin-bottom: 10px;
      }
    }
  }
  & h1 {
    margin-bottom: 16px;
    @media (max-width: 740px) {
      font-size: 20px;
      margin-bottom: 4px;
    }
  }
  & p {
    font-size: 20px;
  }
  & a {
    font-size: 18px;
  }
  & a:hover {
    background: -webkit-linear-gradient(#01a692, #84cf00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

function Unsubscribe(props) {
  const data = useStaticQuery(graphql`
    {
      climber: file(absolutePath: { regex: "/unsubscribe.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 740) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  let climberImage = data.climber

  const { location } = props

  useEffect(() => {
    const postData = async () => {
      if (location.search.slice(3).length > 20) {
        const user = { _id: location.search.slice(3) }
        const res = await axios.post(
          "https://email.code-boost.com/api/users/unsubscribe",
          user
        )
      }
    }
    postData()
  })
  return (
    <Layout>
      <UnsubscribePageStyles>
        <Image
          fluid={climberImage.childImageSharp.fluid}
          className="unsubscribe-image"
        />
        <div id="unsubscribe-message">
          <h1>Email Unsubscribed.</h1>
          <p>Thank you and have a great day!</p>
        </div>

        <h2 id="site-links-header">Site Links:</h2>
        <div id="unsubscribe-links-container">
          <div className="unsubscribe-links-column">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/tags">Tags List</Link>
          </div>
          <div className="unsubscribe-links-column">
            <Link to="/javascript">JavaScript</Link>
            <Link to="/css">CSS</Link>
            <Link to="/react">React</Link>
            <Link to="/node">Node</Link>
            <Link to="/graphql">GraphQL</Link>
            <Link to="/tools">Tools</Link>
          </div>
        </div>
      </UnsubscribePageStyles>
    </Layout>
  )
}
export default Unsubscribe
