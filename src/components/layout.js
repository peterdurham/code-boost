import React from "react"
import "./styles/main.scss"

import Nav from "./nav"
import Footer from "./footer"

const Layout = ({ location, children }) => {
  const [theme, setTheme] = React.useState("light")

  const switchTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
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
    <div className={theme === "light" ? "theme-light" : "theme-dark"}>
      <div
        id="nav-container"
        className={theme === "light" ? "nav-light" : "nav-dark"}
      >
        <Nav switchTheme={switchTheme} />
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

export default Layout
