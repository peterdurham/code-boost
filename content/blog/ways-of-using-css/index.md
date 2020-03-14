---
title: Different ways to use CSS in your web app
date: "2015-05-06T23:46:37.121Z"
category: "CSS"
description: "setup"
featuredImage: "./tiles.webp"
tags: ["CSS", "Setup"]
---

CSS or Cascading Style Sheets is a way to add styles to web documents. There are numerous methods of applying CSS to your webpage or application.

## Internal / Embededd CSS
The most straightforward way to quickly include lots of CSS on your html document is to use `style` tags. The browser will parse everything between two style tags as valid CSS. Style tags can be included in either the **head** or **body** of an html document.

```HTML
<style>
  * {
    box-sizing: border-box;
  }
  .container {
    width: 960px;
  }
  #element {
    font-size: 16px;
  }
</style>
```

## External Style Sheets
Another method of CSS involves separating your `css` from your `html` files. This is often the default way webpages and React applications are set up. 

### HTML
In the *head* of your html file include a link tag to reference an external `css` file.
```html
<head>
  <link rel="stylesheet" type="text/css" href="./styles.css">
  <title>External Style Sheets Example</title>
</head>
```
Here we are telling the browser to import `styles.css` which lives in the same folder as the html file
```css
body {
  font-family: Helvetica;
}
p {
  background-color: orangered;
  color: white;
}
```
### React
In React we can reference the exact same `css` file as in HTML using an import statement in our components

```jsx
import React from 'react'
import './styles.css'

const App = () => {
  return (
    <div>Styled React Application</div>
    )
}
export default App;
```


## Inline CSS
This quick and dirty way of adding CSS to your webpages involves including style properties on the html tags themselves. This can be done using the `style` property in both **html** and **React**.

### HTML
```HTML
<body>
  <h1 style="color: green; font-size: 22px;">Page Header</h1>
  <img style="width: 300px; height: 200px;" />
</body>
```
In HTML, inline style properties are added in a string using normal css. Each property has to end with a semi-colon, and the code can be directly copied to a `.css` file, as it has the same syntax.

### React
In React however, this **style** property is a JavaScript *object*, and must use camel-cased CSS properties. This syntax is the JavaScript representation of CSS style properties.
```JSX
<div id="app">
  <h1 style={{color: "green", fontSize: "22px"}}>Page Header</h1>
  <img style={{width: "300px", height: "200px"}} />
</div>
```

## SCSS

## CSS in JS Libraries
Styled-Components