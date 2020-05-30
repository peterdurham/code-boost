import React from "react"
import Helmet from "react-helmet"
import ModeContext from "../context/ModeContext"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
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
  grey01: "rgb(28, 27, 32)",
  grey02: "rgb(34, 33, 38)",
  grey03: "rgb(25, 26, 23)",
  grey04: "rgb(40, 39, 44)",
  grey05: "rgb(45, 44, 49)",
  grey06: "rgb(23, 24, 29)",
  grey07: "rgb(23, 22, 27)",
  grey08: "rgb(35, 36, 40)",
  grey09: "rgb(19, 19, 19)",
  grey10: "rgb(24, 24, 24)",
  grey11: "rgb(54, 54, 54)",
  grey12: "rgb(69, 69, 69)",
  grey13: "rgb(76, 76, 76)",
  grey14: "rgb(76, 76, 76)",
  grey15: "rgb(85, 85, 85)",
  grey16: "rgb(191, 191, 191)",
  grey17: "rgb(19, 24, 27)",
  grey18: "rgb(27, 36, 47)",
  grey19: "rgb(37, 41, 52)",
  grey20: "rgb(28, 30, 47)",
  grey21: "rgb(31, 31, 31)",
  grey22: "rgb(17, 17, 17)",
  grey23: "rgb(34, 40, 49)",
  grey24: "rgb(26, 29, 36)",
  grey25: "rgb(15, 20, 23)",
  grey26: "rgb(35, 44, 59)",
  grey27: "rgb(24, 33, 48)",
  grey28: "rgb(15, 25, 40)",
  grey29: "rgb(13, 19, 24)",
  grey30: "rgb(26, 29, 34)",
  grey31: "rgb(15, 17, 26)",
  blues: "linear-gradient(95deg, #31dccf, #244fe7)",
  blue: "#00bcda",
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

const GlobalStyle = createGlobalStyle`


*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
html {
  font-size: 62.5%;
  box-sizing: border-box;
}
body {
  font-family: ${theme.fontText}
}

a {
  font-family: ${theme.fontHeader};
  text-decoration: none;
}
p {
  font-size: 1.85rem;
  line-height: 2.8rem;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: ${theme.fontHeader};
}
h1 {
  font-size: 3.47rem;
  line-height: 4.4rem;
}
h2 {
  font-size: 2.97rem;
  line-height: 3.88rem;
  margin-bottom: 2rem;
}
h3 {
  font-size: 2.49rem;
  margin-bottom: 2rem;
}
h4 {
  font-size: 2.256rem;
  line-height: 2.97rem;
  margin-bottom: 2rem;
}
h5 {
  font-size: 1.88rem;
  line-height: 2.44rem;
  margin-bottom: 2rem;
}

button:focus {
  outline: 0;
}

#Home {
  /* WIDTH FOR ADDING SIDEBAR
  max-width: 1360px; */
  max-width: 1040px;
  margin: 0 auto;

  padding: 10.4rem 4rem 7rem 4rem;

  @media (max-width: 840px) {
    padding: 10.4rem 2rem 4rem 2rem;
  }
}
#footer-container {
  width: 100%;
  background-color: ${theme.darkest};
}

.hidden {
  display: none;
}
.mobile-hidden {
  @media (max-width: 600px) {
    display: none;
  }
}
#nav-container {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 42;
  transition: transform 0.3s;
}
.no-scroll {
  /* box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1); */
}
.scroll {
  transform: translateY(-74px);
}

.scrolled {
  transform: translateY(-60px);
}

blockquote {
  color: #111111;
  border: none;
  background: lighten(yellow, 34%);
  border-radius: 4px;
  margin: 2.4rem 0;
  padding: 2.4rem;

  &.conclusion {
    border: none;
    background: green;
  }

  p {
    padding: 0;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
.blogPostLinks {
  width: ${theme.widthMedium};
  margin: 0 auto;
  @media (max-width: 960px) {
    width: 72%;
  }
  & ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding-top: 20px;
    @media (max-width: 960px) {
      flex-direction: column;
      align-items: center;
    }
  }
  & li {
    display: inline;
    font-size: 2rem;
  }
  & li:not(:last-child) {
    margin-bottom: 24px;
  }
}

.paginationLink {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.32), 0 0 0 1px hsla(0, 0%, 4%, 0.1);
  color: ${theme.dark};
  padding: 14px 22px;
  font-size: 17px;
  min-width: 200px;
  max-width: 247px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s all;
  @media (max-width: 600px) {
    width: 50%;
    min-width: 100px;
    max-width: 150px;
    margin-bottom: 20px;
   
  }
  & svg {
    font-size: 2.2rem;
    color: ${theme.medium};
  }
  & svg:first-child {
    margin-right: 8px;
  }
  & svg:not(:first-child) {
    margin-left: 8px;
  }
}
.archiveLink {
  margin-top: 30px;
}
.archiveLink svg {
  margin-left: 8px;
}

.archiveLink:hover {
  transform: translateY(2px);
  color: ${theme.darkest};
}
.archiveLink:hover svg {
  color: ${theme.darker};
}

.CardSearch {
  width: 30rem;
  height: 10rem;
  margin-bottom: 4rem;
  margin-top: 2rem;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  @media (max-width: 1040px) {
    width: calc(50% - 30px);
  }
  @media (max-width: 600px) {
    width: 100%;
    margin-right: 0px;
  }
  &:not(:nth-child(3n)) {
    @media (min-width: 960px) {
      margin-right: 30px;
    }
  }
  &:not(:nth-child(2n)) {
    @media (min-width: 600px) and (max-width: 960px) {
      margin-right: 30px;
    }
  }
  &__tag {
    position: absolute;
    background-color: ${theme.yellow};
    color: #111;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 1px;
    font-family: ${theme.fontHeader};
    left: 16px;
    top: -10px;
    line-height: 16px;
    padding: 2px 5px;
  }
  &__title {
    height: 9.6rem;
    padding: 2.4rem 1.6rem;
    font-family: ${theme.fontHeader};
    font-weight: 400 !important;
    line-height: 2.8rem;
    position: relative;

    @media (max-width: 1040px) {
      height: calc(50vw / 3.75);
    }

    @media (max-width: 600px) {
      height: calc(100vw / 4.4);
    }

    & h3 {
      font-size: 19px;
      @media (max-width: 840px) {
        font-size: 15px;
        line-height: 21px;
      }
    }
    & a {
      font-size: 1.96rem;
    }
  }
}
.CardSearch:hover {
  @media (min-width: 600px) {
    transform: translate(4px, -4px);
  }
}
.searchLinkContainer {
  background: #fff;
  border: none;
  margin: 0 auto 60px auto;
}

.Tag {
  font-size: 1.6rem;
  font-weight: 600;
  padding: 6px 12px;
  margin-right: 7px;
  margin-bottom: 7px;
  background-color: #000;
  color: #fff;
  transition: all 0.3s;
  cursor: pointer;
  @media (min-width: 600px) {
    &:hover {
      background-color: ${theme.green};
      color: #fff;
    }
  }
}
.yellow-box-container {
  display: inline-block;
  position: relative;
}
.yellow-box {
  background: ${props => props.theme.yellow};
  height: 11px;
  width: 100%;
  position: absolute;
  bottom: 22px;
  z-index: -1;
  transform: rotate(-1deg);
}
/* COLORS HERE */
body {
  
  color: ${theme.darkest};

  & a {
    color: ${theme.darkest};
  }
  & #nav-container {
    background-color: ${theme.darkest};
  }
  & .logo-text {
    color: #ffffff;
  }
  & button {
    color: ${theme.light};
  }
  .Menu {
    background-color: #fff;
  }
  .footerLinks a {
    color: rgba(255, 255, 255, 0.5);
  }
  .footerLinks a:hover {
    color: ${theme.green};
  }
  .blogPostMarkdown .language-text {
    color: ${theme.dark};
    background: rgba(0, 0, 0, 0.06);
  }
  .blogPostLinks a {
    color: ${theme.dark};
    transition: all 0.2s;
  }
  .blogPostLinks a:hover {
    color: ${theme.yellow}
  }
}
/* DARK MODE */
.dark {
  background-color: ${theme.grey17};
  color: ${theme.light};

  & .Card {
    background-color: ${theme.grey30};
  }
  .blogPostMarkdown {
    & a {
      color: ${theme.blue};
    }
  }
  & p {
    color: ${theme.light};
  }

  & h1,
  h2,
  h3 {
    color: ${theme.lighter};
  }

  .blogPostMarkdown .language-text {
    color: ${theme.light};
    background: ${theme.dark};
  }
  .Menu {
    background-color: ${theme.darkest};
  }
  & .tagPageButton {
    border: 1px solid ${theme.light};
    color: #fff;
  }
  & .paginationLink {
    background: rgb(26, 29, 34);
    color: #fff;
  }
  blockquote {
    color: #fff;
    border: none;
    background: ${theme.dark};
    border-radius: 4px;
    font-size: 1.6rem;
    margin: 1.6rem 0;
    padding: 2.4rem;

    &.conclusion {
      border: none;
      background: green;
    }

    p {
      padding: 0;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .tableOfContents {
    border: 2px solid ${theme.yellow};
    background-color: ${theme.darkest};
    & a {
      color: ${theme.lightest};
      transition: all 0.3s;
    }
    & a:hover {
      color: ${theme.yellow};
    }
  }
  .blogPostLinks a {
    color: ${theme.light};
  }
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  display: block;
  margin: 4.8rem 0;
  font-size: 1.6rem;
}
thead {
  display: table-header-group;
}
tr {
  display: table-row;
}
.dark th {
  border-bottom: 2px solid ${theme.darkest};
}
tbody {
  display: table-row-group;
  vertical-align: middle;
}
tr {
  display: table-row;
}
th {
  padding: 1rem 2rem;
  text-align: left;
}
td {
  text-align: left;
  padding: 1rem 2rem !important;
  hyphens: auto;
  word-break: break-word;
}

tbody tr:nth-child(2n) {
  background-color: ${theme.lightest};
}
.dark tbody tr:nth-child(2n) {
  background-color: ${theme.dark};
}

.gatsby-highlight {
  font-size: 1.4rem;
  margin: 2.688rem 0;

  & pre {
    border-radius: 8px;
    box-shadow: 2px 4px 25px rgba(0, 0, 0, 0.15);
  }
}

pre.language-javascript {
  padding: 2.016rem;
  font-size: 1.6rem;
  border-radius: 0.4rem;
}
pre.language-terminal {
  background: ${theme.darkest};
  border-top: 18px solid ${theme.mediumLight};
  border-radius: 0px;
}



/* CODE STUFF */

code[class*="language-"],
pre[class*="language-"] {
  color: #a6accd;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;

  font-family: $font-code;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.5px;
  text-shadow: 0 1px #222245;

  @media (max-width: 600px) {
    font-size: 12px;
  }
}

pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection,
pre[class*="language-"]::selection,
pre[class*="language-"] ::selection,
code[class*="language-"]::selection,
code[class*="language-"] ::selection {
  color: #a6accd;
  background: #a599e9;
}

/* Code blocks. */
pre[class*="language-"] {
  padding: 2em;
  margin: 0.5em 0;
  overflow: auto;
  @media (max-width: 600px) {
    padding: 1rem;
  }
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: ${theme.grey31};
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: 2px 4px;
  border-radius: 0.3em;
}

.token {
  font-weight: 400;
}

.token.comment,
.token.prolog,
.token.cdata {
  color: rgb(130, 145, 153);
}

.token.keyword,
.token.delimiter,
.token.selector,
.token.important,
.token.atrule {
  color: #89ddff;
}

.token.operator,
.token.attr-name {
  color: #c792ea;
}

.token.boolean,
.token.number {
  color: #f78c6c;
}

.token.tag,
.token.tag .punctuation,
.token.doctype,
.token.builtin {
  color: #f07178;
}

.token.punctuation {
  color: #89ddff !important;
}

// .token.entity,
// .token.symbol {
//   color: #6897bb;
// }

.token.property,
.token.constant,
.token.variable {
  color: #ff628c;
}

.token.string,
.token.char {
  color: #c3e88d;
}

.token.attr-value,
.token.attr-value .punctuation {
  color: #c3e88d;
}

.token.attr-value .punctuation:first-child {
  color: #a9b7c6;
}

.token.url {
  color: #c3e88d;
  /* // text-decoration: underline; */
}

.token.function {
  color: #82aaff;
}

.token.regex {
  background: #364135;
}

.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.inserted {
  background: #00ff00;
}

.token.deleted {
  background: #ff000d;
}

code.language-css .token.property,
code.language-css .token.property + .token.punctuation {
  color: #a9b7c6;
}

code.language-css .token.id {
  color: #ffc66d;
}

code.language-css .token.selector > .token.class,
code.language-css .token.selector > .token.attribute,
code.language-css .token.selector > .token.pseudo-class,
code.language-css .token.selector > .token.pseudo-element {
  color: #ffc66d;
}

.token.class-name {
  color: #ffcb6b;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  background: none;
}

pre .line-highlight,
pre .line-highlight.line-highlight,
pre > code.line-highlight {
  margin-top: 36px;
  background: linear-gradient(to right, rgba(179, 98, 255, 0.17), transparent);
}

pre .line-highlight:before,
pre > code.line-highlight:before,
pre .line-highlight[data-end]:after,
pre > code.line-highlight[data-end]:after {
  content: "";
}

`

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
        <GlobalStyle />
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
          <Menu
            isPost={isPost}
            menuOpen={this.state.menuOpen}
            toggleMenu={this.toggleMenu}
          />
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
