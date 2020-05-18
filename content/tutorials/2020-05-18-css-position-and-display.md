---
templateKey: blog-post
title: How To Use the Position and Display CSS Attributes
slug: css-position-and-display
date: 2020-04-17T18:00:00.000Z
dateModified: 2020-04-17T18:00:00.000Z
description: "CSS Properties Position and Display. Options: block, inline,
  flexbox, grid for Position and static, relative, absolute, and fixed for
  Display."
featuredPost: false
category: CSS
tags:
  - CSS
  - Properties
  - Basics
featuredImage: /img/css_position_and_display_basics.jpg
---
`Display` and `Position` are two of the most used CSS properties, each accepting a variety of arguments. Below are some of the most common applications of these properties.

## Display Property

The two main options here to understand are `block` and `inline`. 

### Block elements

An element with `display: block` will take up the *entire width* of the container or page. These elements will always take up their own line by default, even if they have sibling elements.

### Inline elements

An element with `display: inline` will be as wide as it's content by default, and can fit on the same line with many other elements that share this property. For an inline element, `margin` and `padding` values will only be respected if they are `left` or `right`. Since this element is "in line", any styles such as `margin-top` or `padding-bottom` styles will not be applied.

### Inline-block elements

An alternative option is `display: inline-block`, which is the same as `display: inline` except that left and right margins and paddings are also applied.

Each element on the page defaults to a certain `display` value depending on the browser. 

| Element     | Typical Default Value |
| ----------- | --------------------- |
| `<div>`     | **block**             |
| `<h1>`      | **block**             |
| `<p>`       | **block**             |
| `<input />` | **inline-block**      |
| `<image />` | **inline-block**      |
| `<a>`       | **inline**            |

### Flexbox and Grid

These properties were introduced to CSS more recently to solve layout problems and arrive at current best practices.

### Flex

An element with `display: flex` applied to it will be a `flexbox` container. This means that it's children elements will be lined out horizontally in a row as flexbox defaults to `flex-direction: row`. If this value is changed to `flex-direction: column`, its children will be lined out vertically in a column.

&nbsp;

This property is particularly useful if you want to have more than one element on a line, anywhere in the page.

&nbsp;

More details about Flexbox can be found [here](/css-flexbox)

### Grid

This property is similar to flex, as applying `display: grid` to an element will make it a `grid` container. With CSS Grid, we can specify the `number` and `size` of the `columns` and `rows` in our grid. We can also specify the row and column gaps, along with numerous other options to making complex grid structures.

## Position Property

The position property is useful if you plan to take an element out of the standard document flow, or make it an anchor for another element that is.

### Static

By default, html elements are included in the document according to box-model rules. The default position value for every element is `static`.

### Relative

An element with `position: relative` behaves the same as a static element, except that it's children may use it as a reference anchor. In order to use position `absolute` or `fixed` it is necessary that one of their parent (or ancestor) elements are `position: relative`.

### Absolute

An element with `position: absolute` is removed from the normal document flow. By applying at least one of the properties: `top`, `right`, `bottom`, or `left` with a certain length amount, the element will be placed relative to the first parent element having `position: relative`.

&nbsp;

This property is particularly useful for elements that are offset or "out of place", but still a certain distance away from a parent element. 

### Fixed

An element with `position: fixed` leaves the document flow like `absolute`, except that a fixed element will not moved when the user scrolls. This is especially useful for Navbar or Sidebar elements that should always be on the screen.

### Sticky

This is a hybrid element behaving like a `position: relative` element until the viewport reaches a certain specified `top` height where the element will become `position: fixed`. This position value can cause issues, however it is useful when you have content in the middle of your page that you would like to become fixed. `position: sticky` can be seen in the sidebar of many websites where content such as a newsletter signup or ad *sticks* to the screen. 

### Conclusion

There are still numerous other values for `display` and `position` which have not been covered here, however this combination of property values will be used in the vast majority of cases in web development.