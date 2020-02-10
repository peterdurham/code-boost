import React, { Component } from "react"

const defaultState = {
  darkMode: false,
  notStored: false,
  toggleDarkMode: () => {},
}

const ThemeContext = React.createContext(defaultState)

class ThemeProvider extends Component {
  state = {
    darkMode: false,
    notStored: false,
  }

  componentDidMount() {
    const isDarkMode = JSON.parse(localStorage.getItem("codeboosttheme"))

    if (isDarkMode) {
      this.setState({ darkMode: isDarkMode })
    }
  }

  componentDidUpdate(prevState) {
    const { darkMode } = this.state

    if (prevState.darkMode !== darkMode) {
      localStorage.setItem("codeboosttheme", JSON.stringify(darkMode))
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
      <ThemeContext.Provider
        value={{
          darkMode,
          notStored,
          setStored: this.setStored,
          setNotStored: this.setNotStored,
          toggleDarkMode: this.toggleDarkMode,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext

export { ThemeProvider }
