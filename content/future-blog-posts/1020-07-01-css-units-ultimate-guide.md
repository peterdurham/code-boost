---

title: Ultimate Guide to CSS Units
date: "2020-07-01 11:00:00"
category: "JavaScript"
description: "Overview of the different units for measuring length in CSS. Basics for styling with absolute and relative units."
featuredImage: /img/css_units_ultimate_guide.jpg
tags: [ "CSS", "Units", "Basics", "Properties"]

---

In CSS, properties are often expressed in terms of a length value. Such properties include width, height, margin, padding, font-size, line-height, among others.

## Absolute Units (Pixels)

Absolute units in CSS are units that denote a specific length, regardless of screen size or parent element size. Pixels are by far the most common of these.

### Pixels

A pixel is approximately equivalent to 1/96th of 1inch. Since all screens and devices are different, it is more practical to think of a pixel relative to how big the screen is. The size of a pixel on the screen also depends on the current screen resolution. The following is an estimate of the width of each common web device

| Device        | Width (px)   | Height (px) |
| ------------- | ------------ | ----------- |
| Phone         | 320 - 480    | 600 - 900   |
| Tablet (tall) | 600 - 1200   | 800 - 1300  |
| Laptop        | 1200 - 1920  | 700 - 1080  |
| Desktop       | 1500 - 4000  | 1000 - 2500 |

> These sizes are rough approximations since there are so many different devices available. While it's not important to memorize these numbers, it is useful for instance to know that the iPhone 5 is the least wide screen at 320px.

Pixels are often used because so many developers and designers have a good sense of their size. It is useful to get comfortable recognizing different lengths as it will speed up your development.
&nbsp;
The main downside to pixels however, is that they are uniform across screen sizes so they will require writing more media queries for different screen sizes. 
&nbsp;
There are other absolute units such as **cm**, **mm**, **in**, and others that can be used instead of pixels.

## Relative Units
Relative CSS units determine their size relative to the viewport size or the parent element size. Relative units allow for responsive development since they let elements scale on various screen sizes. The following is a list of relative units with explanations for the more useful ones.

| Unit    | Relative to              |
| ------- | ------------------------ |
| %       | parent size              |
| em      | current font size        |
| rem     | html font size           |
| ex      | 1x width of 0            |
| ch      | 1x height of x           |
| vw      | 1/100x screen width      |
| vh      | 1/100x screen height     |
| vmin    | 1/100x smaller dimension |
| vmax    | 1/100x larger dimension  |

### Percentage %
This unit is useful when you have an element inside a fixed container that takes up a specific portion of that container. For example, if you have a 500px wide parent element that you want to split in half you could do the following
```css
.parent-element {
  width: 500px;
}
.first-child, .second-child {
  width: 50%;
}
```

### Em
This unit is equivalent to **1x** of the current element's font size. Since most elements generally inherit their font sizes from a parent element, this unit allows you set a font size on a container and style its children relative to it.

```css
.parent-element {
  font-size: 14px;
}
.header-element {
  font-size: 2em;   // 28px
}
```

### Rem
This unit is similar to **em**, except it is relative to the font size of the root **html** element. Rems are great for standardizing your font size across a project. A common practice is to set the default size to 10px and use rems instead of pixels.

```css
html {
  font-size: 10px;
}
p {
  font-size: 1.6rem;  // 16px
}
```

### Vw / vh
These units represent 1/100th of the current viewport size. This can be useful when you need an element to take up a specific fraction, or all of a screen. You can even use **vh** for width and **vw** for height if you wanted. These units are exceptionally useful and there are plenty of opportunities to use them in development.
&nbsp;
The following example will take up the top 80% of the page
```css
.header-section {
  width: 100vw;
  height: 80vh;
}
```

Understanding which unit to reach for can take practice, and over time you will develop new tricks and tools for various situations! 🔥