---
title: JavaScript DOM Methods and Properties
date: "2015-05-06T23:46:37.121Z"
category: "JavaScript"
description: "setup"
featuredImage: "./cubes.jpg"
tags: ["JavaScript", "DOM", "Methods"]
---

In browsers that use JavaScript, we have access to a multitude of methods to affect what goes on the page. These methods will generally involve selecting and adjusting individual elements or accessing properties on the window. 

## Selector Methods
You can access elements on the DOM by using one of the selector methods on the **document** object. Each of these methods selects one or all elements of a given type.

### getElementById

This method selects an element on the DOM with a given id. Since id's are unique, this will only return a single element.

### getElementsByTagName / getElementsByClassName

These methods will select all elements on the DOM with a given parameter. These methods are outdated, and not particularly useful compared with **querySelector**.

### querySelector / querySelectorAll

These methods are the bread and butter of selecting elements using the DOM API. They both accept the same arguments, however `querySelector` will only ever return one (the first) HTML element of the given type.

**querySelector** and **querySelectorAll** accept a tag name, class name, or id as an argument.

```javascript
const paragraphElements = document.querySelectorAll('p')
const boldElements = document.querySelectorAll('.bold')
const headerElement = document.querySelector('#header')
```
### createElement
This method is not a selector *per se*, however it will create and select a new element that you can append to the DOM. Specify the type of element as the argument to this method.


The following example will create a new paragraph element using `createElement` and append it to the body of the page. Enter the following into the console on any webpage and it will update the HTML document.
```javascript
const targetContainer = document.querySelector('body')
const newParagraph = document.createElement('p')
newParagraph.innerText = "Hi i'm a paragraph"
targetContainer.appendChild(newParagraph)
```

## Element Properties
Once you've selected one or multiple elements, you can access and adjust their properties using a variety of methods. 

### element.innerText
This method will display the innerText of a node (element) on the DOM. You can also change the `innerText` of an element by setting this property

```HTML
<div>
  <p>Sample HTML</p>
</div>
```

```javascript
const paragraph = document.querySelector('p')
paragraph.innerText = "New Paragraph Text"
  
console.log(paragraph.innerText)
// "New Paragraph Text"
```

### element.innerHTML
This method is similar to `innerText` except it refers to the child HTML of a selected element. In the previous example we could select the `div` and change its innerHTML

```javascript
const divContainer = document.querySelector('div')
divContainer.innerHTML = "<h1>Actually a header</h1>"

console.log(divContainer.innerHTML)
// <h1>Actually a header</h1> 
```

This method is useful to adjust or replace elements nested within selected elements. 

### element.style
Each HTML element on the DOM has an associated style object which can be modified on selected elements. The syntax for updating the `style` object involves camel-cased properties and string values in quotations. This is the same as inline React styles.

```javascript
const paragraph = document.querySelector('p')
paragraph.style.fontSize = "24px"
paragraph.style.color = "green"
```

### element.setAttribute / element.getAttribute
These methods are a quick and reliable way to add or adjust an attribute to a DOM element. `setAttribute` takes two arguments, the name of the property and the value to set it to

```javascript
const newInput = document.createElement('input')
newInput.setAttribute('type', 'text')
newInput.getAttribute('type')
```
### element.id / element.classList
The **id** of an element can be set or retrieved with this method

```javascript

```

`classList` is an array of classes on a given element. This property has the methods `add() and remove()` available to add or remove specified classes.

```javascript

```


## Modifying Elements

## Window Properties
