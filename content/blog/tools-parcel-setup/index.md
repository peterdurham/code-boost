---
title: Parcel Basic Setup For Vanilla JS and React
date: "2020-03-17"
category: "Tools"
description: "Learn how to setup a Parcel JavaScript project. Simple build tool for React and Vanilla applications."
featuredImage: "./package.jpg"
tags: ["Tools", "Parcel", "Setup", "React", "JavaScript"]
---

**Parcel** is an easy to use build tool for *bundling* web applications. It is a simpler alternative to *Webpack*, requiring little to no configuration. In this tutorial, we will be setting up a *Vanilla JavaScript* app, converting into a *React app*, then deploying it live to **Netlify**.  

## Parcel Basic Setup

To get started, create a new directory and **node** project in the terminal using

```bash
mkdir parcel-setup
cd parcel-setup
npm init -y
```

To install parcel, use the command

```bash
npm install --save-dev parcel-bundler
```

This will add `parcel-bundler` to our application for both development and production purposes. 

### Optional Global Install

Alternatively, you can install parcel globally with the command

```bash
npm install -g parcel-bundler
```

This will allow you to run `parcel` commands without adding `parcel-bundler` to your project. Since we also deploying this application to the web, instead I would recommend just adding `parcel-bundler` directly in your project.

### Application Entrypoint

The `parcel` command will package your application into a `dist` folder. Specifying a html or js file after this command will tell parcel where to look for the build. Let's create both of these files to setup a basic working application.

```bash
touch index.html
touch index.js
```

In the `index.html` file add a basic html setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" 
        content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Parcel Setup</title>
</head>
<body>
  <div id="root"></div>
  <script src="./index.js"></script>
</body>
</html>
```

Also add the following to `index.js` 

```javascript
document.getElementById("root").innerText = "Parcel Basic Setup!";
```

### Run the app

We now have a basic working web application and can run it locally with the following command

```bash
parcel index.html
```

This will spin up a development server on `http://localhost:1234/` by default. **Parcel** comes with built-in *hot module replacement*, so any saved changes in our code will immediately be reflected in the browser.

&nbsp;

Currently our project folder should look something like this

```bash
parcel-setup/
- .cache
- dist
- node_modules
- index.html
- index.js
- package-lock.json
- package.json
```

The `.cache` and `dist` folders get built when we run any `parcel` command, and the `node_modules` folder includes our installed dependencies. We can deploy this application by adding and running a `build` command to the `package.json` file, however let's first setup React and some additional files. 

>  Deploy this **Vanilla JavaScript** application directly by skipping down to the **Adding Scripts** section below.

## Adding React to Parcel

Firstly, we will need some to add some additional packages to our project to setup and parse our React. Enter the following commands in your terminal

```bash
npm install react react-dom
```

```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
```

### Babel Setup

Babel will transpile our React code so that the browser can read it properly. Add a `.babelrc` file to the root of your project where we can specify which `presets` and `plugins` to use. 

```JSON
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### Reorganizing files

Let's create a `src/` folder in the root level of our application to get organized. Move the `index.html` and `index.js` files to this folder and make additional `app.js` and `app.css` files.

&nbsp;

The `index.html` file will be the entrypoint to our page, calling the `index.js` file which will bring in our **React** code. Let's change `index.js` now

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(<App />, document.getElementById("root"));
```

This file will render our React application in the **html** file we built earlier. We also imported `"./app"` which we can fill out now in `app.js`

```jsx
import React from "react";
import "./app.css";

const App = () => {
  return (
    <div>
      <h1>React Parcel Setup</h1>
    </div>
  );
};
export default App;
```

Here we imported a `./app.css` file which we already created. Add the following code (or whatever you like) to `app.css` to make sure its working properly

```css
h1 {
  color: green;
}
```

With this we should now have a working React application. Test it out in the browser with the command

```bash
parcel src/index.html
```

### Adding Scripts

We can simplify the development and build processes by adding scripts to our `package.json` file

```JSON
"scripts": {
  "start": "parcel src/index.html",
  "build": "parcel build src/index.html"
},
```

Both scripts will build our application into the `dist` folder. The `start` script will also setup a development server in the browser. We will need the `build` command specifically to *deploy* this application into **production**.

### Adding .gitignore

We will also need to setup a `.gitignore` file before we deploy, add one now to the *root* of your project folder now, including at least the following folders

```bash
node_modules
dist
.cache
```

## Deploy a Parcel App

There are plenty of locations on the internet to host our application. In this tutorial we will use [Netlify](https://www.netlify.com/), since it easy to setup and comes with a lot of features. If you haven't already, deploy your application to github and signup for / login to Netlify.

&nbsp;

Building our app in production is as simple as clicking  `New site from Git` and selecting your github (or other) repository. We now just need to specify our **Build command** and **Publish directory**.

For **Build command** enter

```bash
npm run build
```

and for **Publish directory** enter

```bash
dist
```

Next click `Deploy site` and Netlify will build out the application, hosting it on their servers.

### Conclusion

Parcel is a great alternative to `Webpack` if you are not in need of all the extra configuration. Since Parcel comes pre-packaged with hot module replacement, babel support, and will bundle all of your assets by default, it is a great tool for building a new application.
