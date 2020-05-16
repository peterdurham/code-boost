import React, { Component } from "react"

const defaultState = {
  darkMode: false,
  notStored: false,
  toggleDarkMode: () => {},
}

const ModeContext = React.createContext(defaultState)

class ModeProvider extends Component {
  state = {
    darkMode: false,
    notStored: false,
  }

  componentDidMount() {
    const isDarkMode = JSON.parse(localStorage.getItem("codeboostmode"))

    if (isDarkMode) {
      this.setState({ darkMode: isDarkMode })
    }
  }

  componentDidUpdate(prevState) {
    const { darkMode } = this.state

    if (prevState.darkMode !== darkMode) {
      localStorage.setItem("codeboostmode", JSON.stringify(darkMode))
    }
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({ darkMode: !prevState.darkMode }))
  }

  setNotStored = () => {
    this.setState({ notStored: true })
  }

  setStored = () => {
    this.setState({ notStored: false })
  }

  render() {
    const { children } = this.props
    const { darkMode, notStored } = this.state

    return (
      <ModeContext.Provider
        value={{
          darkMode,
          notStored,
          setStored: this.setStored,
          setNotStored: this.setNotStored,
          toggleDarkMode: this.toggleDarkMode,
        }}
      >
        {children}
      </ModeContext.Provider>
    )
  }
}

export default ModeContext

export { ModeProvider }
