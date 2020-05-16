import React from "react"
import { Link } from "gatsby"
import ThemeContext from "../context/ThemeContext"
import styled from 'styled-components'

import { FiMenu } from "react-icons/fi"
import { IoMdBonfire } from "react-icons/io"
import { MdWbSunny, MdClose } from "react-icons/md"
import { WiMoonAltWaningCrescent5 } from "react-icons/wi"


const MainNavStyles = styled.div`
  height: ${(props) => props.theme.navHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${(props) => props.theme.fontHeader};
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 4rem;
  & button {
    font-family: ${(props) => props.theme.fontHeader}
  }
  & button:hover {
    color: ${props => props.theme.yellow}
  }
  @media (max-width: 600px){
    padding: 0 2rem;
  }
  .navLogo {
    .navLinkHome {
      display: flex;
      align-items: center;
    }
    & button {
      background: none;
      border: none;
    }
    @media (max-width: 600px) {
      transform: translateX(-10px);
    }
    .navLogoIcon {
      color: ${props => props.theme.yellow};
      font-size: 4.2rem;
      transform: translateY(2px);
      @media (max-width:600px) {
        font-size: 3.6rem;
      }
    }
    .navLogoText {
      margin-left: 9px;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 2.4rem;
      color: ${props => props.theme.white};
      @media (max-width:600px) {
        font-size: 2rem;
      }
    
      font-family: ${props => props.theme.fontHeader}
    }
  }
  .navMode {
    width: 86px;
    display: flex;
    justify-content: flex-end;
    @media (max-width: 600px) {
      width: 36px;
    }
    & button {
      background: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s;

      & svg {
        font-size: 3.2rem;
      }
    }
    
  }
`

const NavButton = styled.button`
  width: 8.6rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  @media (max-width:600px) {
    font-size: 1rem;
    width: 36px;
  }
  .navButtonText {
    @media (max-width: 600px) {
      display: none;
    }
  }
  & div {
    display: flex; 
    align-items: center;
  }
  & svg {
    font-size: 3.2rem;
    @media (max-width: 600px) {
      font-size: 2.4rem;
    }
  }
  & span {
    font-size: 1.4rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-left: 0.8rem;
  }
`
const SubNavStyles = styled.div`
  background: ${props => props.theme.light};
  height: 40px;
  align-items: center;
  font-family: ${(props) => props.theme.fontHeader};
  color: ${props => props.theme.dark};
  font-size: 1.4rem;
  
  .subNavContent {
    max-width: 1040px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4rem;
    @media (max-width: 600px){
      padding: 0 2rem;
    }
    & nav {
      display: flex;
      & ul {
        list-style: none;
      }
      & li {
        margin-right: 2rem;
        cursor: pointer;
      }
    }
  }
`

class Nav extends React.Component {
  static contextType = ThemeContext
  render() {
    const theme = this.context

    return (
      <>
        <MainNavStyles>
          <NavButton
            onClick={this.props.toggleMenu}
            aria-label="Toggle Menu."
          >
            {this.props.menuOpen ? (
                <MdClose />
            ) : (
              <div>
                <FiMenu />
                <span className="navButtonText">Menu</span>
              </div>
            )}
          </NavButton>
          <div className="navLogo">
            <button
              onClick={() => {
                if (this.props.menuOpen) {
                  this.props.toggleMenu()
                }
              }}
            >
              <Link to="/" className="navLinkHome">
                <span>
                  <IoMdBonfire className="navLogoIcon" />
                </span>
                <span className="navLogoText">Code-Boost</span>
              </Link>
            </button>
          </div>
          <div className="navMode">
            <button
              onClick={theme.toggleDarkMode}
              aria-label="Toggle Dark Mode."
              title="Toggle Dark Mode"
            >
              {theme.darkMode ? <MdWbSunny /> :   <WiMoonAltWaningCrescent5 />}
            </button>
          </div>
        </MainNavStyles>
        {/* <SubNavStyles>
            <div className="subNavContent">
              <nav>
                <ul>
                  <li>Tutorials</li>
                </ul>
                <ul>
                  <li>Articles</li>
                </ul>
                <ul>
                  <li>Videos</li>
                </ul>
              </nav>
              
              <div>
                <input type="text" />
              </div>
            </div>
        </SubNavStyles> */}
      </>
    )
  }
}
export default Nav


