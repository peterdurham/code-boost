---
templateKey: blog-post
title: Responsive Development using CSS Media Queries
slug: css-responsive-media-queries
date: 2020-05-27T18:00:00.000Z
dateModified: 2020-05-27T18:00:00.000Z
description: How to style applications for various screen sizes using CSS media
  queries. Learn how to write mobile-first, desktop-first, and responsive code.
featuredPost: false
category: CSS
tags:
  - CSS
  - Responsive
  - Properties
  - Media Queries
featuredImage: /img/media_queries_two_devices.jpg
---
## What is a Media Query?
**Media queries** are a technique of applying CSS styles only on certain screen sizes. This is helpful, and in many cases necessary when developing for multiple device types and manufacturers.
&nbsp;
There are many options for media query arguments, and for this tutorial we will see how `min-width` and `max-width` allow us to develop responsive websites. If you want to follow along in the editor, create a `index.html` file now to test the code in browser

```html
<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Media Queries</title>
    <style>

    </style>
  </head>
  <body>
    
  </body>
</html>
```

## Media Query Syntax
To write a media query, simply wrap the code you want to change with the `@media` rule

```css
p {
  font-size: 20px;
}

@media (max-width: 1000px) {
  p {
    font-size: 14px;
  }
}
```

* Also add a paragraph element inside the page body and drop the `index.html` file in the browser to test it out. Shrink the screen below or above 1000px to see the font-size change.     
&nbsp;  
Here we are setting the paragraph font-size to 20px on all screens and then replacing that with 14px for all screens 600px and smaller. The value `600px` above is considered a **breakpoint**, or width when a @media rule is applied.

> Media queries must be written after general selectors instead of before like in the example above. If we switched the order of these selectors the media query would get overwritten by the original paragraph styles.

### Device Type
Media queries can also target device types such as `screen`, `print`, `speech`, and `all` with the following syntax

```css
@media only screen and (max-width: 900px) {
  .content {
    width: 80%;
  }
}

@media only print and (max-width: 900px) {
  .content {
    width: 100%;
  }
}
```

Since we will be primarily focused on writing code for screens, we can just use the **@media** rule without a media type specified (defaults to `all`).
&nbsp;
For the rest of this tutorial we will be focused on `min-width` and `max-width` media queries. There are a ton of other properties we can applying our styles to. Here are some for reference

- min-width      
- min-height        
- max-width             
- max-height     
- device-width         
- device-height         
- min-device-width 
- min-device-height 
- max-device-width 
- max-device-height 
- device-aspect-ratio

## Mobile First Setup
If you've been coding for any amount of time, you've probably heard the term "mobile-first". Considering what the mobile code will look like early on is often a great way to avoid adding unnecessary CSS styles.   
&nbsp;   
To setup **mobile-first** styles we will write our CSS for phones, and use media queries for larger devices. Here are the screen sizes we will want to cover with some typical pixel widths

| Device/s        | Min-width |
| --------------- | --------- |
| Phone           | N/A       |
| Tablet Tall     | 600px     |
| Tablet Wide     | 900px     |
| Laptop/Desktop  | 1200px    |
| Big Desktop     | 1500px    |

We can convert these values to media queries like so
```css
.container {
  width: 90%;
  margin: 0 auto;
  color: black;
}
@media (min-width: 600px) {
  .container {
    width: 500px;
    color: green;
  }
}
@media (min-width: 900px) {
  .container {
    width: 840px;
    color: yellow;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1120px;
    color: red;
  }
}
@media (min-width: 1500px) {
  .container {
    width: 1360px;
    color: blue;
  }
}
```

While this is surely a contrived example of how media queries work, you can test this code out by adding some lorem ipsum text into a `.container` element to see how the text resizes and changes colors at every breakpoint.
```html
<div class="container"></div>
``` 

In this example, each successize **@media** rule overwrites the previous one so it is important to write them in the appropriate order.  

## Desktop First Setup

While mobile-first is great for letting us only worry about bigger screen than phones, desktop first has its advantages as well. Writing code **desktop-first** can be preferable for people who prefer writing for *desktop web* or making *desktop apps*. The setup is roughly similar and we will use the following widths as breakpoints

| Device/s        | Width Specified |
| --------------- | --------- |
| Big Desktop     | min-width: 1200px;    |
| Laptop/Desktop  | N/A       |
| Tablet Wide     | max-width: 1200px;     |
| Tablet Tall     | max-width: 900px;     |
| Phone           | max-width: 600px;    |

```css
.container {
  width: 1000px;
  margin: 0 auto;
  color: black;
}
@media (max-width: 1200px) {
  .container {
    width: 840px;
    color: green;
  }
}
@media (max-width: 900px) {
  .container {
    width: 600px;
    color: yellow;
  }
}
@media (max-width: 600px) {
  .container {
    width: 90%;
    color: red;
  }
}
@media (min-width: 1500px) {
  .container {
    width: 1360px;
    color: blue;
  }
}
```

The **desktop-first** example is different as it utilizes both `max-width` and `min-width` properties to support large desktops. In this case our `max-width` media queries will overwrite the previous ones. As long as the `min-width` big-desktop query is after the general styles it will also overrwrite them appropriately.
&nbsp;
Chosing whether to build for desktop-first or mobile-first is often a contentious issue, and can come down to personal preference if not otherwise required. While technically the exact same designs can be implemented using both, it is helpful to consider the layout for all devices in the beginning.

## Responsive Development Tips
Responsive development has been a huge buzzword since media queries were introduced. This is not by chance, as media queries let us specify exact how we want to scale our content. **Responsive development** is about considering how your layout will scale across screen sizes.

### Absolute vs Relative units
In the earlier examples we used both absolute (pixels) and relative (percent, viewport) units for our container width. specifying **absolute** values such as width will make our pages responsive ONLY at our media query breakpoints. By specifying **relative** values such as percentage or viewport, the browser will resize our elements every time the width changes, not just at the breakpoints. For example we could make a 16:9 fixed image responsive on smaller screen sizes

```css
.responsive-img {
  width: 800px;
  height: 450px;
}
@media (max-width: 1200px) {
  .responsive-img {
    width: 80vw;
    height: 45vw;
  }
}
```
Drop in an image like this one to test it out
```html
<img 
  class="responsive-img" 
  src="https://cdn.pixabay.com/photo/2016/11/13/21/46/sheep-1822137_1280.jpg"
/>
```

### Conclusion
Media queries are one of the most foundational CSS techniques for development. Since users could be browsing on a huge variety of screen sizes, we can use them to ensure our layout always looks good.