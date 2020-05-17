---
title: Basics of the Document Object Model (DOM)
date: "2020-04-08 11:00:00"
category: "JavaScript"
description: "Learn how to interact with the Document Object Model or DOM. Render and interact with html pages using vanilla JavaScript."
featuredImage: "./tree-diagram.jpg"
tags: ["JavaScript", "DOM", "Configuration"]
---

The **DOM**, or *Document Object Mode*l is a programming interface for HTML documents. It is used by the browser to render webpages from HTML code. Each element in a document is part of a branched tree structure that includes parent and child nodes. The browser uses JavaScript to update various properties and elements in the document.

## DOM Terminology

### Window

The **window** is the outermost object of the Document Object Model. It stores information about the browser window such as the size, location, history, etc. Global properties and methods are stored on the window object.

### Document

The **document** is an object version of the html document. It is a property on the window and contains all the html of the page. It includes methods to select html elements and add event listeners. 

### HTML

`HTML` or **Hypertext Markup Language** is a markup language that displays webpages on the internet. It can contain text, images, videos, tables, links and various other elements. The `html` tag is the outermost tag of an document and contains a **head** and **body** tag.

### Head / Body

The `head` and `body` elements are sibling elements which sit in the `html` tag. The **head** contains information about the html document which isn't displayed in the window of the browser such as *metadata* and *imports*. The **body** of a document contains all the visible elements that are displayed in the page's browser such as *text* or *images*.

```html
<html>
  <head>
  <!-- meta tags, title, and links here -->
  </head>
  <body>
  <!-- visible elements here -->
  </body>
</html>
```

### Element / Node

An **element** is a component of an html document which represents a *node* on the document tree. Elements can have specific attributes and represent various things on the screen. The type of an element is represented by the *text* inside that elements *tag* 

Ex. for a paragraph

```html
<p>text goes here</p>
```

## Selecting Elements

The document object comes with a built in `querySelector` which can traverse the document tree to find specific elements. With the query selector you can search for elements with specific tags, classes, or ids.

```javascript
var buttonElement = document.querySelector("button");
var containerElement = document.querySelector(".container");
var rootElement = document.querySelector("#root");
```

> **Note:** `querySelector` will return the first element matching the selector and `querySelectorAll` will return an array of all matching elements.

## Modifying Attributes

Once a DOM element is selected and stored in a variable, it can also be modified. You can change the style, text, id, and various other properties once they are selected.

```javascript
buttonElement.style.backgroundColor = "green";
containerElement.innerText = "This is the new text";
rootElement.id = "app-container";
```

## Adding Event Listeners

The browser is able to listen for specified events that are occur using JavaScript. An event listener can be added to a DOM node, and triggers when a particular event occurs. Lots of events can be listened for including onClick, onScroll, onChange, onDrag, etc. 

```javascript
buttonElement.addEventListener("click", () => {
  console.log("Button Clicked!");
})
window.addEventListener(("scroll"), () => {
  console.log("Scroll height: ", window.scrollY);
})
```

There is plenty more to understanding the Document Object Model, and how to interface with it using JavaScript. To learn more, check out this [DOM Methods](/javascript-dom-methods) tutorial.