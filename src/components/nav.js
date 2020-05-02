import React from "react"
import { Link } from "gatsby"
import ThemeContext from "../context/ThemeContext"

import { FiMenu } from "react-icons/fi"
import { IoMdBonfire } from "react-icons/io"
import { MdWbSunny, MdClose } from "react-icons/md"
import { WiMoonAltWaningCrescent5 } from "react-icons/wi"

class Nav extends React.Component {
  static contextType = ThemeContext
  render() {
    // const { switchTheme, theme } = this.props
    const theme = this.context

    return (
      <nav className="Nav">
        <button
          className="Nav__menu--button"
          onClick={this.props.toggleMenu}
          aria-label="Toggle Menu."
        >
          {this.props.menuOpen ? (
            <div>
              <MdClose />
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FiMenu />
              <span className="Nav__menu--button-text">Menu</span>
            </div>
          )}
        </button>
        <div className="Nav__logo">
          <button
            onClick={() => {
              if (this.props.menuOpen) {
                this.props.toggleMenu()
              }
            }}
          >
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <span>
                <IoMdBonfire className="logo-icon" />
              </span>
              <span className="logo-text">Code-Boost</span>
            </Link>
          </button>
        </div>
        <div className="Nav__right">
          <button
            className="Nav__mode"
            onClick={theme.toggleDarkMode}
            aria-label="Toggle Dark Mode."
            title="Toggle Dark Mode"
          >
            {theme.darkMode ? <MdWbSunny /> : <WiMoonAltWaningCrescent5 />}
          </button>
        </div>
      </nav>
    )
  }
}
export default Nav
