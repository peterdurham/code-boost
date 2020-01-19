import React from "react"

const Footer = () => {
  return (
    <footer>
      <div>Code Boost</div>
      <div>
        <div>social here</div>
        <div>Links here</div>
      </div>
      <div>
        {" "}
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
    </footer>
  )
}
export default Footer
