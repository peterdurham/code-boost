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

    const rootPath = `${__PATH_PREFIX__}/`
    // let header

    // if (location.pathname === rootPath) {
    //   header = (
    //     <h1
    //       style={{
    //         marginTop: 0,
    //       }}
    //     >
    //       <Link
    //         style={{
    //           boxShadow: `none`,
    //           textDecoration: `none`,
    //           color: `inherit`,
    //         }}
    //         to={`/`}
    //       >
    //         {title}
    //       </Link>
    //     </h1>
    //   )
    // } else {
    //   header = (
    //     <h3
    //       style={{
    //         fontFamily: `Montserrat, sans-serif`,
    //         marginTop: 0,
    //       }}
    //     >
    //       <Link
    //         style={{
    //           boxShadow: `none`,
    //           textDecoration: `none`,
    //           color: `inherit`,
    //         }}
    //         to={`/`}
    //       >
    //         {title}
    //       </Link>
    //     </h3>
    //   )
    // }
    return (
      <div>
        <Helmet
          bodyAttributes={{
            class: `theme ${themeClass}`,
          }}
        ></Helmet>
        <div id="nav-container">
          <Nav />
        </div>
        <main id={location.pathname === rootPath ? "Home" : "BlogPost"}>
          {children}
        </main>

        {/* <header>{header}</header> */}
        <div id="footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Layout
