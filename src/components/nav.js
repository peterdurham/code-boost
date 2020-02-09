import React, { useState } from "react"
import { Link } from "gatsby"

import { FiMenu, FiSun } from "react-icons/fi"
import { IoMdSearch } from "react-icons/io"

import { FaFortAwesomeAlt, FaHotjar, FaCode, FaRegSun } from "react-icons/fa"
import { IoMdBonfire, IoMdRocket, IoIosMoon } from "react-icons/io"
import { MdWbSunny } from "react-icons/md"
import {
  WiDaySunny,
  WiMoonAltWaningCrescent5,
  WiMoonAltWaningGibbous2,
  WiMoonWaxingCrescent3,
} from "react-icons/wi"

import {
  GoCircuitBoard,
  GoDiffAdded,
  GoFileCode,
  GoSquirrel,
} from "react-icons/go"
import {
  GiHolyOak,
  Gi3DHammer,
  GiBearHead,
  GiConqueror,
  GiDrakkar,
  GiElephant,
  GiBookCover,
  GiSwordBrandish,
} from "react-icons/gi"
const Nav = ({ switchTheme, theme }) => {
  return (
    <nav className="Nav">
      <button className="Nav__menu--button">
        <FiMenu />
        <span>Menu</span>
      </button>
      <div className="Nav__logo">
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <span>
            <IoMdBonfire className="logo-icon" />
          </span>
          <span className="logo-text">Code Boost</span>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          width: "8.6rem",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {theme === "light" ? (
          <button className="Nav__mode" onClick={switchTheme}>
            <WiMoonAltWaningCrescent5 />
          </button>
        ) : (
          <button className="Nav__mode" onClick={switchTheme}>
            <MdWbSunny />
          </button>
        )}
        {/* 
        <button className="Nav__search--button">
          <IoMdSearch />
        </button> */}
      </div>
    </nav>
  )
}
export default Nav
