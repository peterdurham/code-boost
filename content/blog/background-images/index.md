---
title: How To Use CSS Background Images
date: "2015-05-06T23:46:37.121Z"
category: "CSS"
description: "setup"
featuredImage: "./fire-landscape.jpg"
tags: [ "Background", "Images"]
---

The css `background-image` property is a handy alternative to using `<img />` tags to display images.

To use this property, first create a div tag in your html

```html
<div id="bg-demo"></div>
```

and a css selector in your stylesheet

```css
#bg-demo {
  height: 300px;
  width: 450px;
  background: url("https://cdn.trendhunterstatic.com/thumbs/ink-drawings.jpeg");
}
```

### background-image

I added a height (and width) property to this element since background images don't have a default height like image tags do. The `background` or `background-image` properties are interchangeable and accept a URL string for your image file. You can use JPG, PNG, SVG, GIF, and WEBP files for background images.

### background-size

Unless your image is the exact same size as your div element, you might have noticed that it is not properly fitted to the screen. The `background-size` property will adjust this for us, and takes the following arguments:

- **auto** : default setting, original image size (will crop if bigger than the container)
- **length** : accepts two arguments: width and height for the image
- **percentage**: accepts two arguments: width % and height % of the container element
- **cover**: will cover either 100% of the element width or height depending on which fits better
- **contain**: will fit the entire image in the element

### background-repeat

By default, background images will repeat if there is enough space in their containing element. While this is useful for creating patterns, you may turn it off using

```css
#bg-demo {
  ... 
  background-repeat: no-repeat;
}
```

### background-position

Setting our sizing for `div` and `background-size` properties is great to get the image to be the right size, however it won't center or align our images. The `background-position` property allows us to specify this. To center an image in our div we can use the following

```css
#bg-demo {
  ... 
  background-size: cover;
  background-position: 50% 50%;
}
```

This property accepts two arguments, one for the horizontal (x) value and one for the vertical (y) value. `background-position` is flexible and we can use

- **percentages** : x% y% or the percent of the parent elements size (50% 50% being center, 50% 100% being the bottom)
- **keywords** : left, right, center, bottom, and top can be used in place of 0% X, 100% X, 50% X or Y, 100% Y, and 0% Y respectively
- **css units** : additionally you can use specific pixel values (or other units) to choose the position exactly

### Gradients

In addition to image files we can use CSS gradients in our `background` property. There are numerous ways to use gradients though a basic implementation involves three arguments: the direction and two colors.

```css
#bg-demo {
  ... 
  background: linear-gradient(to bottom right, green, blue);
}
```

The first (direction) argument uses the keyword `to` followed by one or two keywords such as `left` or `bottom right` to indicate how the gradient will be applied. The direction is use from the first color `to` the second color.

### Uses
  
CSS backgrounds can seem unnecessarily involved compared to using an `<img />` tag. In many cases using a background-image is not only easier, but the only way to achieve what you are trying to implement.