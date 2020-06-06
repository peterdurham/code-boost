import React, { useEffect } from "react"
import { Link, useStaticQuery } from "gatsby"
import axios from "axios"
import styled from "styled-components"
import Image from "gatsby-image"

import Layout from "../components/layout"

const ConfirmPageStyles = styled.div`
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
  & .confirm-image {
    filter: brightness(0.5);
  }
  & #confirm-message {
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
  & #confirm-links-container {
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
  & .confirm-links-column {
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

function Confirm(props) {
  const data = useStaticQuery(graphql`
    {
      climber: file(absolutePath: { regex: "/climb.jpg/" }) {
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
          "https://email.code-boost.com/api/users/confirm",
          user
        )
        console.log(res, user)
      }
    }
    postData()
  })
  return (
    <Layout>
      <ConfirmPageStyles>
        <Image
          fluid={climberImage.childImageSharp.fluid}
          className="confirm-image"
        />
        <div id="confirm-message">
          <h1>Email Confirmed!</h1>
          <p>
            Keep a lookout for weekly <span className="italic">articles</span>{" "}
            and <span className="italic">tutorials</span>.
          </p>
        </div>

        <h2 id="site-links-header">Site Links:</h2>
        <div id="confirm-links-container">
          <div className="confirm-links-column">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/tags">Tags List</Link>
          </div>
          <div className="confirm-links-column">
            <Link to="/javascript">JavaScript</Link>
            <Link to="/css">CSS</Link>
            <Link to="/react">React</Link>
            <Link to="/node">Node</Link>
            <Link to="/graphql">GraphQL</Link>
            <Link to="/tools">Tools</Link>
          </div>
        </div>
      </ConfirmPageStyles>
    </Layout>
  )
}
export default Confirm
