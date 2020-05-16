import React from "react"
import { ModeProvider } from "./src/context/ModeContext"

export const wrapRootElement = ({ element }) => (
  <ModeProvider>{element}</ModeProvider>
)
