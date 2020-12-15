---
templateKey: blog-post
title: How to Setup Dark Mode in React
slug: dark-mode-in-react
date: 2020-12-15T15:00:00.000Z
dateModified: 2020-12-15T15:00:00.000Z
description: Step by step tutorial on how to setup dark mode using React. Add this feature to your application using useState, useEffect, and localStorage.
featuredPost: true
category: React
tags:
  - Dark Mode
  - React
featuredImage: /img/react-dark-mode.jpg
---


In this tutorial we will be setting up a **dark mode** option using React. We can create a state variable for `darkMode` and apply different styles depending on whether this *boolean* is true or false.  
<br />
Setup a new project with [create-react-app](https://www.code-boost.com/create-react-app/) or any other build tool for React.


## Dark mode state hook (useState)

The first thing we'll need in our `App.js` component is a **useState** hook to track whether this feature is on. We should include this logic on the highest component in our application so that it gets checked on every page load.

```jsx
import React from "react";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <div>
      <h1>Header</h1>
    </div>
  );
};

export default App;
```
We can set the default value of `darkMode` to be false.
 
## Applying the dark class (useEffect)

Next, we will want to adjust the **classList** of our `body` element when this value is true. We can add a `dark` class to this element with the **useEffect** hook.  
<br />
We can also add a button to toggle our `darkMode` value and trigger this effect.
<br />

```jsx
import React from "react";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div>
      <h1>Header</h1>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
    </div>
  );
};

export default App;
```
This useEffect hook will get called every time our `darkMode` variable is changed. This will allow us to toggle dark mode using a button or multiple buttons.  



## Persisting dark mode (localStorage)
We can specify a **localStorage** item to check whether the user is currently in dark mode when the page loads. To do this we will create another **useEffect** hook with no options in our *options array*.  
<br />
If this information exists in **localStorage**, we will parse it into JavaScript and set the value of `darkMode` based on what was stored. If the boolean value for darkMode is changed, these changes will be converted into **JSON** and stored in localStorage.

```jsx
import React from "react";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const json = localStorage.getItem("site-dark-mode");
    const currentMode = JSON.parse(json);
    if (currentMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    const json = JSON.stringify(darkMode);
    localStorage.setItem("site-dark-mode", json);
  }, [darkMode]);

  return (
    <div>
      <h1>Header</h1>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
    </div>
  );
};

export default App;
```


In this example I am specifying the item to look for as `"site-dark-mode"`. This is a string specific to a **localStorage** location in the browser. Feel free to use any arbitrary value here, and consider changing it to your site name i.e. `"code-boost-dark-mode"` so it is unique and doesn't get overwritten.



## Styling dark mode (CSS)
When we've applied the `dark` class to the body of our document, we can start creating dark mode styles in our css like so:

```css
.dark {
  background: black;
}
.dark h1 {
  color: white;
}
```
By referencing the `.dark` class on our body element before each selector, we can make styles specific to dark mode.   
<br />
Any styles you create normally will apply to light mode.   
<br />
It is a good practice to separate your dark mode styles and prefix all the selectors with the `dark` class like above. This way any light styles you apply will get overwritten by dark mode styles.