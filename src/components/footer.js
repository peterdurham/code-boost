import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
} from "react-icons/ti"

const PageFooter = styled.footer`
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 4rem;
  font-family: ${props => props.theme.fontHeader};
  color: #fff;

  @media (max-width: 600px) {
    padding: 0 2rem;
  }
  .footerLogo {
    font-size: 2.4rem;
    font-weight: 700;
    padding: 3rem 0 1rem 0;
    width: 100%;
    border-bottom: 1px solid grey;

    a {
      color: #fff;
    }
  }
  .footerContent {
    padding: 2rem 0;
    display: flex;
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .footerSocial {
    width: 50%;
    font-size: 1.8rem;
    font-weight: 700;
    @media (max-width: 600px) {
      margin-bottom: 4rem;
    }
    .footerSocialText {
      color: rgba(255, 255, 255, 0.5);
    }
    .footerSocialIcons {
      display: flex;
      margin-top: 10px;
      & a {
        color: #fff;
      }
    }
    .footerSocialIconContainer {
      border-radius: 50%;
      width: 38px;
      height: 38px;
      background-color: rgb(68, 66, 74);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
    }
    .footerSocialIcon {
      width: 26px;
      height: 26px;
      cursor: pointer;
    }
    #tw-icon:hover {
      background-color: #1da1f2;
      transition: all 0.3s;
    }
    #fb-icon:hover {
      background-color: #3b5999;
      transition: all 0.3s;
    }
    #yt-icon:hover {
      background-color: #ff0000;
      transition: all 0.3s;
    }
    #li-icon:hover {
      background-color: #0077b5;
      transition: all 0.3s;
    }
  }

  .footerLinks {
    display: grid;
    grid-template-columns: 150px 150px;
    grid-column-gap: 16px;
    grid-template-rows: 20px 20px 20px;
    grid-row-gap: 16px;
  }
  .footerLink {
    font-size: 1.6rem;
    font-weight: 700;
    transition: all 0.3s;
    cursor: pointer;
  }

  .footerCopyright {
    border-top: 1px solid grey;
    font-size: 1.4rem;
    padding: 2rem 0 3rem 0;
    padding-left: 50%;
  }
`
function Footer() {
  const data = useStaticQuery(graphql`
    {
      allTopicsJson {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `)
  let topics = data.allTopicsJson.edges
  return (
    <PageFooter>
      <div className="footerLogo">
        {" "}
        <Link to="/">Code-Boost</Link>
      </div>

      <div className="footerContent">
        <div className="footerSocial">
          <div className="footerSocialText">Follow Us</div>
          <div className="footerSocialIcons">
            <a
              target="_blank"
              href="https://twitter.com/BoostCode"
              rel="noopener noreferrer"
            >
              <span className="footerSocialIconContainer" id="tw-icon">
                <TiSocialTwitter className="footerSocialIcon" />
              </span>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/code-boost-7038341a7/"
              rel="noopener noreferrer"
            >
              <span className="footerSocialIconContainer" id="li-icon">
                <TiSocialLinkedin className="footerSocialIcon" />
              </span>
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/Code-Boost-102807441437727/"
              rel="noopener noreferrer"
            >
              <span className="footerSocialIconContainer" id="fb-icon">
                <TiSocialFacebook className="footerSocialIcon" />
              </span>
            </a>
            {/* <span className="Footer__social--icon-container" id="yt-icon">
                <TiSocialYoutube className="Footer__social--icon" />
              </span> */}
          </div>
        </div>
        <div className="footerLinks">
          {topics.map(({ node: item }) => {
            return (
              <Link to={`/${item.slug}`} key={item.name}>
                <div className="footerLink">{item.name}</div>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="footerCopyright">
        {" "}
        © {new Date().getFullYear()} Code-Boost
      </div>
    </PageFooter>
  )
}
export default Footer
