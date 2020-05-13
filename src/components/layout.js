import React from "react"
import Helmet from "react-helmet"
import "./styles/main.scss"
import ThemeContext from "../context/ThemeContext"
import Nav from "./nav"
import NavBig from "./navBig"
import Footer from "./footer"
import Menu from "./menu"

class Layout extends React.Component {
  static contextType = ThemeContext
  state = {
    scrolled: false,
    menuOpen: false,
  }

  componentDidMount() {
    if (this.props.pageType === "Post") {
      window.addEventListener("scroll", this.navOnScroll)
    }
  }

  componentWillUnmount() {
    if (this.props.pageType === "Post") {
      window.removeEventListener("scroll", this.navOnScroll)
    }
  }

  navOnScroll = () => {
    if (window.scrollY > 24) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  }
  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    const { children } = this.props

    const { darkMode, notStored } = this.context

    let themeClass = ""

    if (darkMode && !notStored) {
      themeClass = "dark"
    } else if (notStored) {
      themeClass = "not-stored"
    }
    const isPost = this.props.pageType === "Post"

    return (
      <div>
        <Helmet
          bodyAttributes={{
            class: `theme ${themeClass}`,
          }}
        ></Helmet>
        <div
          id="nav-container"
          className={this.state.scrolled ? "scroll" : "no-scroll"}
        >
          <Nav
            isHome={isPost}
            toggleMenu={this.toggleMenu}
            menuOpen={this.state.menuOpen}
          />
        </div>
        {this.state.menuOpen ? (
          <Menu isPost={isPost} menuOpen={this.state.menuOpen} />
        ) : (
          <main
            id={isPost ? "BlogPost" : "Home"}
            className={this.state.menuOpen ? "" : undefined}
          >
            {children}
          </main>
        )}
        {!this.state.menuOpen && (
          <div
            id="footer-container"
            className={this.state.menuOpen ? "bigger" : undefined}
          >
            <Footer isHome={isPost} />
          </div>
        )}
      </div>
    )
  }
}
Layout.defaultProps = {
  location: {},
}

export default Layout
