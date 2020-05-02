---
title: How To Use CSS Background Images
date: "2020-05-07 11:00:00"
category: "CSS"
description: "Setup background images in CSS with the background property and a URL, accepts JPG, PNG, SVG, GIF, or WEBP."
featuredImage: "./nature.jpg"
tags: [ "Background", "Images", "CSS", "Properties"]
---

The css `background` or `background-image` property is a handy alternative to the `<img />` tag for displaying images. To use this property, first create a div tag in your html

```html
<div id="bg-demo"></div>
```

Background image's accept a url string for the `background` property. Add a css selector for this div in your stylesheet

```css
#bg-demo {
  height: 300px;
  width: 450px;
  background: url("https://cdn.pixabay.com/photo/2017/05/31/18/38/sea-2361247_1280.jpg");
}
```

I also added height and width properties to this element. If the `div` you created above is empty, it will need both a height and width to display an image.  

### Background-image

The `background` or `background-image` properties are interchangeable and accept a URL string that links to an image file. You can use *JPG*, *PNG*, *SVG*, *GIF*, and *WEBP* files for background images.

### Background-size

Unless your image is the exact same size as your div element, you might have noticed that it is not properly fitted to the screen. The `background-size` property will adjust this for us, and takes the following arguments:

- **auto** : default setting, original image size. This will crop if image is bigger than the container and repeat if it is smaller.
- **length value**: accepts either one or two CSS length values. One argument determines the longer axis and two arguments the *width* and *height* of the image
- **cover**: will cover either 100% of the element *width* or *height* depending on which fits the image better
- **contain**: will fit the entire image inside the element

### Background-repeat

By default, background images will repeat if there is enough space in their containing element. While this is useful for creating patterns, you may turn it off using

```css
#bg-demo {
  ... 
  background-repeat: no-repeat;
}
```

### Background-position

Setting our sizing for `div` and `background-size` properties is great to get the image to be the right size, however it won't center or align our images. The `background-position` property allows us to specify this. To center an image in our div we can use the following

```css
#bg-demo {
  ... 
  background-position: 50% 50%;
}
```

This property accepts two arguments, one for the *horizontal* **(x)** value and one for the *vertical* **(y)** value. `background-position` is flexible and we can use

- **Percentages** : x% y% or the percent of the parent elements size (50% 50% being center, 50% 100% being the bottom)
- **Keywords** : left, right, center, bottom, and top can be used in place of 0% X, 100% X, 50% X or Y, 100% Y, and 0% Y respectively
- **Css units** : additionally you can use specific pixel values (or other units) to choose the position exactly

### Gradients

In addition to image files we can use `CSS gradients` in our background property. There are numerous ways to use gradients, though a basic implementation involves three arguments: the **direction** and **two colors**.

```css
#bg-demo {
  ... 
  background: linear-gradient(to bottom right, green, blue);
}
```

The first argument accepts a `direction` using the keyword **to**, followed by one or two keywords such as `left` or `bottom right` to indicate the direction that the gradient will be applied.

### Uses

CSS backgrounds can seem unnecessarily involved compared to using an `<img />` tag. In many cases using a background-image is not only easier, but the only way to achieve what you are trying to implement.