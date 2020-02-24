---
title: How to setup SCSS in your web projects
date: "2015-05-06T23:46:37.121Z"
category: "Tools"
description: "setup"
featuredImage: "./scotland.webp"
tags: ["Tools", "Setup", "CSS"]
---

SCSS is a preprocessor for CSS that lets you use additional features in your CSS stylesheets. It automatically compiles your .**scss** files into **.css** files for the browser to read. 

### Why use SCSS?
SCSS allows for use of **variables**, **nesting selectors**, **imports**, **mixins**, and other features that are not yet available in CSS. While it takes some practice to get proficient, it is also still possible to write CSS directly in your SCSS files. 

## Quick Setup

It is possible to compile SCSS yourself, however most web application bundlers easily utilize third party libraries to do this for you. In this tutorial we will setup SCSS with a Vanilla JS **Parcel** project as well as a React application using **Create-React-App**.

## HTML / SCSS Setup (Parcel)
Parcel is a web application bundler similar to Webpack, but with less (zero) configuration. You can find a tutorial for setting up and hosting simple Parcel applications [here](http://localhost:8000/tools-parcel-setup/) or simply follow along below. 

```bash
mkdir parcel-project
npm init -y
npm install --save-dev sass
```
Here we are making a new project in the `parcel-project` folder and initializing a new **node** application. Next we installed the javascript module `sass` which will compile our `.scss` stylesheets for us. 

** Note: **Sass** was the original name and package for the more popular **SCSS**

```bash
touch index.html
touch styles.scss
```
Next we will create files for our **html** and **css**. In `index.html` add the following

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Parcel Setup</title>
    <link rel="stylesheet" href="./styles.scss" />
  </head>
  <body>
    <div class="container">
      <h1>Title goes here</h1>
      <p class="container__text">and text here</p>
    </div>
  </body>
</html>
```
Parcel takes care of all our assets and compiling the scss for us, so all we need to do is import `./styles.scss` like a normal stylesheet.

In `styles.scss` add the following

```CSS
.container {
  & h1 {
    color: green;
  }
  &__text {
    color: blue;
  }
}
```
This `.scss` file is using nested selectors to simplify css styles. The `&` symbol refers to the name of the current selector, so this code compiles down the following CSS

```CSS
.container h1 {
  color: green;
}
.container__text {
  color: blue;
}
```
You can test it out yourself in the browser with the following terminal command

```bash
parcel index.html
```

## React Setup (create-react-app)
Scss can be used in a **create-react-app** project by simply 
- 1. installing the dev-dependency `node-sass`  
- 2. importing `.scss` files into your components

To setup and configure a new SCSS React project enter the following in the command line

```bash
npx create-react-app react-scss
npm install --save-dev node-sass
```

**create-react-app** will build a React application with a `.css` stylesheet that we can simply change to `.scss`.

Make sure to also change the `import` statement in the `app.js` file.
```javascript
import './app.scss'
```
Since we can always write css inside our scss files, start the application to begin using **SCSS**.

```bash
npm start
```

You can test the application out by adding the following *SCSS* to `app.scss`

```CSS
$color-blue: blue;
$font-xlarge: "60px";

p {
    color: $color-blue;
    font-size: $font-xlarge;
}
```
Here we are making use of `SCSS` variables by declaring them after the `$` sign. Variables can be set once and used in multiple selectors (and files) to allow for quick large scale changes.

More information about how `create-react-app` works can be found [here](http://localhost:8000/create-react-app/)

## SCSS Features
To learn more about the full list of SCSS features, check out this comprehensive overview.
