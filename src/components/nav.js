import React from "react"
import { Link } from "gatsby"

const Nav = () => {
  return (
    <nav>
      <div>Menu Button</div>
      <div>
        <Link to="/">Code Boost Logo</Link>
        <p>None of that nonsense, all of that good stuff</p>
      </div>
      <div>Search</div>
    </nav>
  )
}
export default Nav
