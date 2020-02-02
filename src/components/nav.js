import React from "react"
import { Link } from "gatsby"

import { FiMenu } from "react-icons/fi"
import { IoMdSearch } from "react-icons/io"

const Nav = ({ switchTheme }) => {
  return (
    <nav className="Nav">
      <button className="Nav__menu--button">
        <FiMenu />
        <span>Menu</span>
      </button>
      <div className="Nav__logo">
        <Link to="/">
          <span>Code Boost Logo</span>
          <p>None of that nonsense, all of that good stuff</p>
        </Link>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={switchTheme}>Light/Dark</button>
        <button className="Nav__search--button">
          <IoMdSearch />
        </button>
      </div>
    </nav>
  )
}
export default Nav
