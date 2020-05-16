import React from "react"
import Helmet from "react-helmet"
import "./styles/main.scss"
import ModeContext from "../context/ModeContext"
import styled, { ThemeProvider } from "styled-components"
import Nav from "./nav"
import Footer from "./footer"
import Menu from "./menu"

const theme = {
  red: "red",
  // blue: "#009bff",
  // blue: "#0085db",
  // blue: "#0066cc",
  // blue: "#5183f5",
  // blue: "#0066cc",
  blue: "#3273dc",
  green: "rgb(35,140,44)",
  gold: "rgb(255,203,0)",
  yellow: "#fad000",
  black: "#393939",
  grey: "#3a3a3a",
  white: "#ffffff",
  lightgrey: "#e1e1e1",
  offWhite: "#ededed",
  maxWidth: "1240px",
  light: "#b3b9c5",
  lighter: "#cecece",
  lightest: "#f8f8f8",
  mediumDark: "rgb(62,62,62)",
  medium: "rgb(73, 73, 73)",
  mediumLight: "rgb(133, 133, 133)",
  dark: "rgb(48, 48, 48)",
  darker: "rgb(32, 32, 32)",
  darkest: "rgb(17, 17, 17)",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
  navHeight: "74px",
  fontHeader: "'Noto Sans', 'Arimo', sans-serif;",
  fontText: "'Jost', 'Nanum Gothic', sans-serif;",
  fontCode:
    "Monaco, 'Operator Mono', 'Source Code Pro', 'Fira Code', monospace;",
  widthSmall: "74rem",
  widthMedium: "96rem",
  widthLarge: "120rem",
}
const MainContent = styled.div`
  padding: 14rem 0 7rem 0;
  @media (max-width: 600px) {
    padding-top: 11rem;
  }
`
class Layout extends React.Component {
  static contextType = ModeContext
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
      <ThemeProvider theme={theme}>
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
          <MainContent
            id={isPost ? "BlogPost" : "Home"}
            className={this.state.menuOpen ? "" : undefined}
          >
            {children}
          </MainContent>
        )}
        {!this.state.menuOpen && (
          <div
            id="footer-container"
            className={this.state.menuOpen ? "bigger" : undefined}
          >
            <Footer isHome={isPost} />
          </div>
        )}
      </ThemeProvider>
    )
  }
}
Layout.defaultProps = {
  location: {},
}

export default Layout
