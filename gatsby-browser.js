// custom typefaces
// import "typeface-montserrat"
// import "typeface-merriweather"

// import "prismjs/themes/prism.css"

import React from "react"
import { ThemeProvider } from "./src/context/ThemeContext"
// require("prismjs/themes/prism-tomorrow.css")

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)
