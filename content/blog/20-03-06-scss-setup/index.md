---
title: How to Setup SCSS in Your Web Projects
date: "2020-03-06 11:00:00"
category: "Tools"
description: "Learn to setup SCSS projects (aka SASS) for vanilla JavaScript or React with parcel and create-react-app."
featuredImage: "./fall-leaves.jpg"
tags: ["Tools", "Setup", "CSS"]
---

SCSS is a preprocessor for CSS that lets you use additional features in your CSS stylesheets. It automatically compiles your .**scss** files into **.css** files for the browser to read. 

### Why use SCSS?

SCSS allows for use of **variables**, **nesting selectors**, **imports**, **mixins**, and other features that are not yet available in CSS. While it takes some practice to get proficient, you can write CSS directly in your SCSS files. 

### Quick Setup

It is possible to compile SCSS yourself, however most web application bundlers easily utilize third party libraries to do this for you. In this tutorial we will setup SCSS with a Vanilla JS **Parcel** project as well as a React application using **Create-React-App**.

## HTML / SCSS Setup (Parcel)

Parcel is a web application bundler similar to Webpack, but with less (zero) configuration. You can find a tutorial for setting up and hosting simple Parcel applications [here](http://localhost:8000/tools-parcel-setup/) or simply follow along below. 

```bash
mkdir parcel-project
npm init -y
npm install --save-dev sass
```

Here we are making a new project in the `parcel-project` folder and initializing a new **node** application. Next we installed the javascript module `sass` which will compile our `.scss` stylesheets for us. 

>  **Note:** **Sass** was the original name and package for the more popular **SCSS**

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

&nbsp;

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

To setup a new SCSS React project enter the following commands (separately)

```bash
npx create-react-app react-scss
npm install --save-dev node-sass
```

**create-react-app** will build a React application with a `.css` stylesheet that we can simply change to `.scss`.

&nbsp;

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

&nbsp;

More information about how `create-react-app` works can be found [here](http://localhost:8000/create-react-app/)

## SCSS Folder Setup

SCSS also allows for the import of `.scss` files in other .scss files. This allows us to create a `main.scss` file which imports all of our individual .scss files. We will create several different `.scss` files to handle certain functionalities or features on our page. This setup allows us to scale up our application while still making our stylesheets readable and accessible. Add the following folders and files to your application now

```bash
styles/
 - components/
 -- nav.scss
 -- footer.scss
 - animations.scss
 - base.scss
 - mixins.scss
 - variables.scss
main.scss
```

In the following **SCSS** folder setup, we will use `main.scss` as our primary stylesheet and import it in our React application (in either app.js or index.js). Add the following imports to `main.scss` now

```css
@import "./mixins.scss";
@import "./variables.scss";
@import "./base.scss";
@import "./animations.scss";

@import "./components/footer";
@import "./components/nav";
```

As you create new features or components, add additional imports at the bottom of this page. Each file is imported in order, so we will make sure to import `mixins.scss` and `variables.scss` first.

### Media Query Mixins

We can simplify our media queries to be specific devices as an example **mixin**. Add the following to `mixins.scss`

```css
@mixin respond($breakpoint) {
  @if $breakpoint == phone {
    @media (max-width: 600px) {
      @content;
    }
  }
  @if $breakpoint == tab-port {
    @media (max-width: 840px) {
      @content;
    }
  }
  @if $breakpoint == tab-land {
    @media (max-width: 1040px) {
      @content;
    }
  }
  @if $breakpoint == big-desktop {
    @media (min-width: 1500px) {
      @content;
    }
  }
}
```

Now, we have access to **phone**, **tab-port**, **tab-land**, and **big-desktop** media queries if we want to develop specifically for outside 1040px-1500px (in this case). Feel free to change these values for whatever breakpoints make the most sense for you. It is also possible to add additional breakpoints using the same pattern.

&nbsp;

To use these breakpoint mixins, inside any CSS selector, add the following

```css
.example-class {
  @include respond(phone) {
    font-size: 14px;
  }
}
```

This syntax, `@include respond(device) { }` can be used with the above mixins. Add this reference to the media queries we setup in `.mixins.scss`.

### Variables List

The `variables.scss` stylesheet will include all of our **variables** for *colors*, *fonts*, and *sizes*. For example include the following code in your `variables.scss` file

```css
$width-small: 600px;
$width-medium: 1000px;
$width-large: 1600px;

$font-header: "Montserrat", sans-serif;
$font-text: "Merriwether", sans-serif;

$color-green: rgb(35, 140, 44);
$color-yellow: #fad000;
```

Each variable you include here will be available in the stylesheets loaded after it (everything except `mixins.scss`). By including these variables frst, we can setup a single location to store color, size and font values. This allows us to adjust the look and feel of our site quickly and completely by simply changing variables that are referenced all over the page.

### Base Styles

Call this file what you like, here we will include the global styles we want to include on our page. Add the following to `base.scss`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  font-size: 36px;
}
a {
  text-decoration: none;
}
```

### Animation Styles

Lastly, in the `animation.scss` file we can include any keyframe animations we wish to use.

```css
.fade-in {
  animation: fadeIn 1s 1 ease-in;
}
@keyframe fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}


.fade-out {
  animation: fadeOut 1s 1 ease-out;
}
@keyframe fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

### Additional Components

In this example, we also setup `nav.scss` and `footer.scss` files. Use these files (and syntax) to add feature-specific stylesheets as you create them. By separating as many core functionalities as possible, SCSS manages to simplify setting up and maintaining styles.
