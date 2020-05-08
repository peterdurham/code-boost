---
title: How to Setup React in a HTML File
date: "2020-06-26 11:00:00"
category: "React"
description: "How to set up a boilerplate React project in a HTML page using React and Babel."
featuredImage: "./solarpanels.jpg"
tags: [ "Setup", "React"]
---

React is a frontend library for building applications and websites. Most people create their React application with a build tool such as **webpack**, **create-react-app**, **parcel**, **Next**, **Gatsby**, etc. An alternative to this is to load React via a CDN into an index.html file which can be easily hosted on Netlify or AWS.

Loading React into your html greatly simplifies the process of rapid development for simple standalone webpages. Since everything is contained in a single file, rather than folder with a package list, packages, and source code. This file can be built out in vanilla script tags, using React Babel script tags, or a combination of both. The React that we are loading is really just one DOM node on the HTML document.


## React CDN Link
React is a lightweight library that can be loaded in via script tags when the page loads. It's version changes over time and you can find recent links [here](https://reactjs.org/docs/cdn-links.html). For a basic setup we will include the **React**, **React-DOM**, and **Babel** links

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

Each script retrieves some external code and includes it in our webpage.

## HTML File Setup

First create a `index.html` file with the following boilerplate code

```HTML
<!DOCTYPE>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>React import demo</title>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  
    <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      class App extends React.Component {
        render() {
          
          return (<div>
            <h1>React Setup</h1>
          </div>);
        }
      }
      ReactDOM.render(
        <App />,
        document.getElementById('root')
      );
    </script>
  </body>
</html>
```

Here we have a barebones React setup. At the top, in our head we have our 3 CDN links along with a **style** tag we can use for writing CSS. In the body tag we have our **root** react div which `ReactDOM` will render the app inside. We can write more components inside the babel script to extends out the application. 
&nbsp;
This setup can be a double-edged sword as all the code is on one page. It is helpful for organization and often lightweight, however all the code on one page can add complexity.

## Production Mode
The included CDN links above are meant for development mode only. Also make sure to swap them out for the following when you push to production
```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```
 
 ### Conclusion
 Setting up **React** in a single HTML page is an uncommon, yet interesting way to quickly setup an application. Installing packages for a boilerplate **create-react-app** alone can be over 200mb, while you can fit a small project in a few kb.