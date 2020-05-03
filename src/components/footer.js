import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
} from "react-icons/ti"

const Footer = () => {
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
    <footer className="Footer">
      <div className="Footer__logo">
        {" "}
        <Link to="/">Code-Boost</Link>
      </div>

      <div className="Footer__content">
        <div className="Footer__social">
          <div className="Footer__social--text">Follow Us</div>
          <div className="Footer__social--icons">
            <a
              target="_blank"
              href="https://twitter.com/BoostCode"
              rel="noopener noreferrer"
            >
              <span className="Footer__social--icon-container" id="tw-icon">
                <TiSocialTwitter className="Footer__social--icon" />
              </span>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/code-boost-7038341a7/"
              rel="noopener noreferrer"
            >
              <span className="Footer__social--icon-container" id="li-icon">
                <TiSocialLinkedin className="Footer__social--icon" />
              </span>
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/peter.durham.98031"
              rel="noopener noreferrer"
            >
              <span className="Footer__social--icon-container" id="fb-icon">
                <TiSocialFacebook className="Footer__social--icon" />
              </span>
            </a>
            {/* <span className="Footer__social--icon-container" id="yt-icon">
                <TiSocialYoutube className="Footer__social--icon" />
              </span> */}
          </div>
        </div>
        <div className="Footer__links">
          {topics.map(({ node: item }) => {
            return (
              <Link to={`/${item.slug}`} key={item.name}>
                <div className="Footer__link">{item.name}</div>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="Footer__copyright">
        {" "}
        © {new Date().getFullYear()} Code-Boost
      </div>
    </footer>
  )
}
export default Footer
