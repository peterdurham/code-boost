import React from "react"
import { ModeProvider } from "./src/context/ModeContext"

export const wrapPageElement = ({ element }) => (
  <ModeProvider>{element}</ModeProvider>
)
// exports.onClientEntry = () => {
//   window.addEventListener("load", () => {
//     document.body.className = document.body.className.replace(/\bno-js\b/, "")
//   })
// }
