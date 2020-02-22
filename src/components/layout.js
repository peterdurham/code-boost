import React from "react"
import Helmet from "react-helmet"
import "./styles/main.scss"
import ThemeContext from "../context/ThemeContext"
import Nav from "./nav"
import Footer from "./footer"

class Layout extends React.Component {
  static contextType = ThemeContext

  render() {
    const { location, children } = this.props

    const { darkMode, notStored } = this.context

    let themeClass = ""

    if (darkMode && !notStored) {
      themeClass = "dark"
    } else if (notStored) {
      themeClass = "not-stored"
    }

    // const rootPath = `${__PATH_PREFIX__}/`
    const isPost = this.props.pageType === "Post"

    return (
      <div>
        <Helmet
          bodyAttributes={{
            class: `theme ${themeClass}`,
          }}
        ></Helmet>
        <div id="nav-container">
          <Nav isHome={isPost} />
        </div>
        <main id={isPost ? "BlogPost" : "Home"}>{children}</main>
        <div id="footer-container">
          <Footer isHome={isPost} />
        </div>
      </div>
    )
  }
}
Layout.defaultProps = {
  location: {},
}

export default Layout
