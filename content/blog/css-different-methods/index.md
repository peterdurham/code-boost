---
title: Overview of Different ways to use CSS
date: "2020-03-09"
category: "CSS"
description: "Learn all the methods to use stylesheets with CSS and variations such as SCSS and CSS-in-JS."
featuredImage: "./tiles.webp"
tags: ["CSS", "Setup"]
---

**CSS** or *Cascading Style Sheets* is a way to add styles to web documents. There are numerous methods of applying CSS to your webpage or application.

## Internal / Embeded CSS Styles

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

### HTML external stylesheets

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

### React external stylesheets

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

### HTML inline

```HTML
<body>
  <h1 style="color: green; font-size: 22px;">Page Header</h1>
  <img style="width: 300px; height: 200px;" />
</body>
```

In HTML, inline style properties are added in a string using normal css. Each property has to end with a semi-colon, and the code can be directly copied to a `.css` file, as it has the same syntax.

### React inline

In React however, this **style** property is a JavaScript *object*, and must use camel-cased CSS properties. This syntax is the JavaScript representation of CSS style properties.

```JSX
<div id="app">
  <h1 style={{ color: "blue", fontSize: "22px" }}>Page Header</h1>
  <img style={{ width: "300px", height: "200px" }} />
</div>
```

## SCSS Setup (node-sass)

SCSS is a method of used enhanced stylesheets that allow for **variables**, **nesting selectors**, **imports**, **mixins**, and more. To use `.scss` files in a `create-react-app` application, install the following `node-sass` package

```bash
npm install node-sass
```

 Learn more about setting up a SCSS project for both Vanilla JS and React [here](./scss-setup).

## React CSS-in-JS (styled-components)

Styled-Components is a library for **React** that allows you to make CSS-in-JS components using the standard CSS syntax. Install styled-components with the following command

```bash
npm install styled-components
```

Once the install completes you will be able to include, and setup styled components in whatever *React* components you write. Create a styled component using any html tag type you like and add it in your markup like so

```jsx
import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
`;
const PageText = styled.p`
  color: blue;
  text-decoration: none;
`;

const Header = () => {
  return (
    <div>
      <Title>Title Here</Title>
      <PageText>Information about the About Page here</PageText>
    </div>
  );
};

export default Header;
```

There are additional libraries for CSS-in-JS such as *Emotion* or *Radium* which can be used to style React components.