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
    const theme = this.context

    return (
      <>
        <nav className="Nav">
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
          <button
            className="Nav__menu--button"
            style={{ width: "36px" }}
            onClick={this.props.toggleMenu}
            aria-label="Toggle Menu."
          >
            {this.props.menuOpen ? (
              <div>
                <MdClose />
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="Nav__menu--button-text">Menu</span>
                <FiMenu style={{ marginLeft: "4px" }} />
              </div>
            )}
          </button>
        </nav>
        <div>HIII MORE STUFF</div>
      </>
    )
  }
}
export default Nav
