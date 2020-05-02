---
title: How to Setup a React Webpack Application
date: "2020-01-16 11:00:00"
category: "React"
description: "Basic tutorial to setup a React Application using Webpack bundler for assets. Configuration and setup for using Webpack."
featuredImage: "./webpack.jpg"
tags: ["React", "Webpack", "Setup"]
---

### What is Webpack

**Webpack** is a *static module bundler* that you can use to build JavaScript applications. This allows you to setup projects which can understand and run all sorts of files including

- js/jsx (JavaScript)
- html (Hypertext Markup Language)
- css (Cascading Style Sheets)
- png/jpg/svg (Image Files)
- woff/woff2/eot/ttf (Font Files)

Webpack is setup through its configuration file `webpack.config.js` which will include all of our settings. There are entries for `input` and `output` that specify where our code lives. There are also `loaders` that provide directions on what to do with different file types.

### React Applications

Webpack can be used to make applications with all sorts of libraries and frameworks. Many modern webpack applications use `React` so we will use it in this tutorial. Lot's of other React build tools such as **create-react-app**, **Gatsby**, and **Next** utilize `webpack` under the hood. There are also alternatives to webpack such as `Parcel` which can you learn to setup [here](https://code-boost.netlify.com/tools-parcel-setup/).

## Setup React

We will first need a project folder to setup our webpack application in. Create a new project folder and navigate into it. Feel free to name it whatever you like

```bash
mkdir webpack-starter
cd webpack-starter
```

You can now initialize a new **node** application with the following command

```bash
npm init -y
```

This command creates a `package.json` file in the root of your project which keeps track of `scripts`, `dependencies`, and other details of our application. We should also now add our `start` script now to the `package.json` file

```JSON
{
  ...
  "scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development"
  },
  ...
}
```

### Dependencies

Even a bare-bones webpack config requires installing around a dozen additional packages. We will now install everything needed for a basic setup. The table below describes what each dependency does or is related to.

```bash
npm install react react-dom
```

```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader file-loader react-hot-loader style-loader url-loader webpack webpack-cli webpack-dev-server
```

| Dependency          | Type        | Purpose                                      |
| ------------------- | ----------- | -------------------------------------------- |
| react               | normal      | **library for building interfaces**          |
| react-dom           | normal      | **allows react to work with the DOM**        |
| @babel/core         | development | **babel core compiler**                      |
| @babel/preset-env   | development | **babel presets for each environment**       |
| @babel/preset-react | development | **babel prset for react plugins**            |
| babel-loader        | development | **babel loader module**                      |
| css-loader          | development | **css loader module**                        |
| file-loader         | development | **file loader module**                       |
| react-hot-loader    | development | **allows hot module replacement in dev**     |
| style-loader        | development | **style loader module**                      |
| url-loader          | development | **url loader module**                        |
| webpack             | development | **bundles javascript and files for browser** |
| webpack-cli         | development | **webpack command line interface**           |
| webpack-dev-server  | development | **serves a webpack app in the browser**      |

### Files

Now that we have all our start script setup and dependencies installed, create the following folders and files in your project

```bash
dist/
-- index.html
-src/
-- App.js
-- index.js
-- style.css
.babelrc
webpack.config.js
```

Next copy the following boilerplate code into each of these files

&nbsp;

In `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Webpack starter setup</title>
  </head>
  <body>
    <div id="root">
    <script src="./bundle.js"></script>
  </body>
</html>
```

In `App.js`

```javascript
import React from 'react'
import './style.css'

const App = () => {
  return(
    <div>Webpack application setup</div>
  )
}
export default App
```

In `index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
module.hot.accept();
```

In `style.css`

```css
* {
  color: red;
}
```

In `.babelrc`

```JSON
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

and lastly in `webpack.config.js`

```javascript
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 4444,
    contentBase: './dist',
    hot: true,
    // historyApiFallback: true,
  }
}
```

### Run in development

So far we have a basic setup to run this application in our browser at the specified `port`. Start the application with 

```bash
npm start
```

This command will setup a `webpack-dev-server` in the browser using the provided `webpack.config.js` file. 

## Webpack Configurations

The `webpack.config.js` file above will bundle your source code and assets into a single `bundle.js` file that will run your application. Some of the main concepts included in this file are

- Entry
- Output
- Loaders
- Plugins

Webpack's various settings are properties in a `module.exports` object in your `webpack.cofig.js` file

```javascript
module.exports = {
  entry: "",
  module: {},
  resolve: {},
  output: {},
  plugins: [],
  devServer: {}
}
```

In this application so far we used the `entry`, `module`, `resolve`, `output`, `plugins`, and `devServer` settings

### entry

This specifies where your React application's entrypoint is. This is usually a `index.js` file in **React** applications. This is the file you render your application using **React-DOM** and a **div** from your `index.html` file.

### output

Here you specify a path where the bundled code should be output. In this case our `path` ends up being to the `dist` folder in the root of our app. We also need to specify a `filename` for the JavaScript file that gets generated by **webpack**.

### module (Loaders)

The `module` property contains and object with a `rules` propoerty. This contains an array of all the various **loader modules**. Each entry in this array is an object that contains a **test regex** and a specifies a **loader module**. In the regex you can include which asset types you wish to load such as .js for `babel-loader` or .png for `url-loader`. In our setup we have 3 rules setup: one for **javascript**, another for **css styles**, and a third for **assets** such as images and fonts.

### plugins

You can further configure webpack by installing various plugin dependencies and initializing them in the `plugins` array. In this setup we included the **hot module replacement** plugin.

### resolve

This property is simply an array of the javascript extensions that `webpack` should look for.

### devServer

This last property is where we specify the **port** that we want to run the dev server on along with some other settings. If you need to proxy `api` requests to another server you can specify the port here with the `proxy` property.

## Build for production

Now that we've built and run a basic **React** application in the browser, its time to prepare it for **production**. Learn more about that [here]([Production | webpack](https://webpack.js.org/guides/production/))