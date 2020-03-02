---
title: How To Build a React App using Create React App
date: "2015-05-06T23:46:37.121Z"
category: "React"
description: "setup"
featuredImage: "./tree.jpg"
tags: ["React", "create-react-app"]
---

Create React App is a command line tool to build and deploy single-page React applications.

To Start:

```bash
npx create-react-app project-name
```

npx is an npm package runner that installs the latest version of create-react-app for us. Select a `project-name` here which will be the folder your application is stored in.

To run the application change directory into your project folder then run the start script:

```bash
cd project-name
```

```bash
npm start
```

This command will start our web application up on `http://localhost:3000/`

Create React App set up a folder structure for us with the following files:

```
project-name
  - README.md
  - node_modules
  - package.json
  - .gitignore
  - public
    - favico.ico
    - index.html
    - manifest.json
  - src
    - App.css
    - App.js
    - App.test.js
    - index.css
    - index.js
    - logo.svg
    - serviceWorker.js
```

## File Breakdown

1. README.md- Markdown file for project readme, displayed on github repo
2. node_modules- Required modules for dependencies, don't modify code
3. package.json- Project info including dependencies and scripts
4. .gitignore- List of files for git to ignore
5. favico.ico- Browser tab icon
6. index.html- Entrypoint for your React application
7. manifest.json- Browser information for Progressive Web Applications
8. App.css- stylesheet for the app
9. App.js- This is our React Application
10. App.test.js- File for testing with Jest
11. index.js- renders the React application in the div from index.html
12. logo.svg- additional image, can delete/replace this
13. serviceWorker.js- setup a serviceworker for offline caching

Most of the files here are already configured so that we won't have to change them again. App.js is the main file and component for the application. Separate component files can be created for larger applications.

Let's remove some of the excess code so we can start from scratch. Take out the logo import, and everything in the App div. Then, add a header with our project name to make sure its projects.

In App.js:

```javascript
import React, { Component } from "react"

import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>New-Project</h1>
      </div>
    )
  }
}

export default App
```

![scratch](./cra2.png)