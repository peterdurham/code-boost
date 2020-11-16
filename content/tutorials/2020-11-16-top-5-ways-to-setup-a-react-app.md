---
templateKey: blog-post
title: Top 5 Ways to Setup a React Application
slug: top-5-ways-to-setup-a-react-app
date: 2020-11-16T15:00:00.000Z
dateModified: 2020-11-16T15:00:00.000Z
description: Overview of the top 5 ways to build a React application with explainations for each. Includes create-react-app, Gatsby, Next.js, Parcel, CodeSandbox, and other notable mentions.
featuredPost: true
category: React
tags:
  - Tools
  - React
  - Setup
featuredImage: /img/top-5-ways-to-setup-a-react-app.jpg
---

React is a JavaScript library for creating user interfaces in web applications and websites. In the last few years it has dominated the web development industry, becoming the most frequently used option for companies and individuals building websites.  
<br />
The following are some of the most popular ways to setup a React application if you're planning on building a new project.

> Note: Each option below will use the placeholder name `project-name` which can be replaced with your own project's name. Installing **Node JS** on your computer is required for the first four options.

## 1. Create React App
This tool is by far the best place to start for developers learning React. **Create React App** requires zero configuration and can be quickly prepared for hosting.  
<br />
To setup a new application using `create-react-app`, navigate to a folder of your choice in the command line and enter the following:

```bash
npx create-react-app project-name
cd project-name
npm start
```

The above commands will
- Build a new React application with the latest version of `create-react-app`
- Navigate into the specified folder
- Spin up your project in the browser at `http://localhost:3000/`
   
If you navigate to the `src/` folder of your new project, you will see a file called `App.js`. This is the main component for your application, and where you can begin building.  
<br />
Create React App is excellent for learning how React works, building portfolio projects, and trying out various ideas in React.  
<br />
This tool is **client-side rendered** by default so it will be very fast, but not optimized for SEO and social media sharing.  
<br /> 
Learn more about **create-react-app** with [Create React App Setup Explained](https://www.code-boost.com/create-react-app/).

## 2. Gatsby
This tool is another site generator similar to *create-react-app* except it allows for server-side rendering by default. If you are looking to build a website or web application that is also optimized for SEO and social sharing Gatsby can be an excellent option.  
<br />
Gatsby is especially easy and useful for building personal websites, blogs, and even online stores. Additionally it is very fast and comes with useful features like *image optimization*, *page routing*, and a [vast plugin library](https://www.gatsbyjs.com/plugins).  
<br />
There are numerous ways to setup a new project with **Gatsby**, all of which require globally installing the `gatsby-cli` tool. To set this up, enter the command:

```bash
npm install -g gatsby-cli
```

From here you can decide whether you want to begin with the basic boilerplate (similar to create-react-app) or if you want to use a starter from the [Gatsby Starter Library](https://www.gatsbyjs.com/starters/).  
<br />
Both options can work well, although if you are new to **Gatsby** I recommend exploring some of the starters to learn how the tool works and what you can do with it.  
<br />
To create a basic Gatsby project, enter the command:
```bash
gatsby new project-name
```
Alternatively, if you want to use a starter, select it from the library linked above. Each starter will have an install command available with the syntax looking like this:
```bash
gatsby new project-name https://github.com/gatsbyjs/gatsby-starter-default
```
To use a starter, simply add the URL for the starter's github repo after the project name you've specified.  
<br />
Either way, once the project is built, navigate into the newly created folder and start it up in the browser with the commands:
```bash
cd project-name
gatsby develop
```
The command `gatsby develop` will launch your application in the browser at `http://localhost:8000/` by default.  
<br />
The home page will be available in the `pages/` folder in the `index.js` file.
<br />
Learn more about the Gatsby project structure with [How to Set up a Gatsby JS Project](https://www.code-boost.com/gatsby-basics/)

## 3. Next.js
This tool is another great option for building fast websites with options for both static site generation and server-side rendering. **Next.js** is quickly becoming the go to option for large commercial websites because of it's versatility and ease of use.  
<br />
**Next.js** particularly shines if you are looking to dynamically host server-side rendered webpages. Unlike Gatsby, which builds your entire project on deploy, Next.js can dynamically serve pages as they are requested.   
<br />
Additionally, Next.js comes with support for *page routing*, *CSS-in-js* out of the box, easy to configure *SEO*, and more.  
<br />
To create a new project with this tool and run it in the browser, enter the commands:

```bash
npx create-next-app project-name
cd project-name
npm run dev
```

These commands are nearly identical to *create-react-app* and your project will be available in the browser at `http://localhost:8000/`.  
<br />
You can begin working on your application in the `pages/` folder in the `index.js` file. Here there are plenty of examples for best practices on the way to do things in Next.js.  
<br />
This tool might be the most versatile and useful way to setup a React application. That being said, the lack of starters and resources for beginners makes this tool slighly less accessible when starting out.  
<br />
If you want to learn more about the project setup and how Next.js works, check out [Build Server-side rendered React apps with NextJS](https://www.code-boost.com/next-js-basics-and-setup/).

## 4. Parcel
Unlike the previous three build tools, **Parcel** is actually a package bundler which can be used with other libraries besides React. Parcel is excellent in that it requires zero configuration compared with a competitor such as *Webpack*. Parcel is also exceptionally lightweight and easy to setup.  
<br />
This tool is excellent if you want to build your project from scratch instead of using a pre-built tool.  
<br />
To get started, create a new project folder and initialize a new application with the following commands:

```bash
mkdir project-name
cd project-name
npm init -y
```
Next, install the following *dev-dependecies* to your project:
```bash
npm install --save-dev parcel-bundler @babel/core @babel/preset-env @babel/preset-react
```
Also, install *React* and *React-DOM* with the command:
```bash
npm install react react-dom
```
Now that our dependecies are added, create a `.babelrc` file in the root level of the project with the following presets:
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
Also add a `src/` folder to the root of your project that contains three files: `index.html`, `index.js`, and `App.js`.  
<br />
In these three files we will include the following code:  
<br />
In `index.html`

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
In `index.js`
```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```
In `App.js`
```jsx
import React from "react";

const App = () => {
  return (
    <div>
      <h1>React Parcel Setup</h1>
    </div>
  );
};
export default App;
```
Lastly, include the following *start* and *build* scripts to your `package.json` file: 
```json
"scripts": {
  "start": "parcel src/index.html",
  "build": "parcel build src/index.html"
},
```
We can now start our project in the browser with the command:
```bash
npm start
```
This will startup your project by default at the address `http://localhost:1234/`  
<br />
Parcel is an exceptionally lightweight and easy to use tool. You can learn more about it and how to setup vanilla JS projects with [Parcel Basic Setup for Vanilla JS and React](https://www.code-boost.com/tools-parcel-setup/).

## 5. Code Sandbox
This tool is without a doubt, the fastest way to quickly get started coding a React project. Visit [Code Sanbox](https://codesandbox.io/) to quickly one-click build an application.  
<br /> 

**Code Sandbox** is excellent for quickly trying out new ideas when developing in React. The all-in-one browser's display, code editor, and command line allows the developer to create projects in a single window and save the code for later.  
<br />
This tool is different from the others as it does not store the code locally on your computer, but rather on **Code Sandbox's** servers. This can be a blessing or curse depending on your application's needs.  
<br />
While this is likely not the best tool for hosting websites or applications on custom domains, it is very useful for quickly working out different concepts and sharing them with others. There are also dozens of pre-built templates which you can use to explore different boilerplate project setups. You can even import projects from github into a new sandbox.

## Other Notable Mentions

### Webpack
This tool is the most commonly used package bundler for **React** applications because it is used under the hood for the first three build tools on this list. Learning **Webpack** can be very beneficial to understanding how applications are bundled, but it can also be a nightmare to configure and maintain which is why I haven't included it in the top 5. This tool is still one of the more useful ones to learn if you are interested and have the time.  <br />  
### React in HTML
This setup is slightly different from the rest of the options here and involves loading the **React**, **React-DOM**, and **Babel** libraries directly into an HTML file via a CDN. This can be a very handy solution if you are trying to include React on a single page of your website, or if you want to create a lightweight template to quickly build React components.  
<br />
Learn more about this option with [How to Set up React in a HTML File](https://www.code-boost.com/react-in-html-file-setup/).

### Codepen
This tool is very similar to and was a predecessor *CodeSandbox*. I've heard various developers prefer one over the other, but fortunately they are both free so you can try them each out and see which one you prefer. Each of these tools is great for googling code snippets because you can view large amounts of working projects quickly. 
<br />

