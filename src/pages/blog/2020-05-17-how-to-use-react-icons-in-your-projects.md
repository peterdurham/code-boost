---
templateKey: blog-post
title: How to use React Icons in Your Projects
datePublished: 2020-05-18T02:13:50.046Z
dateModified: 2020-05-18T02:13:50.111Z
category: React
description: Learn how to add icons to your project and update SVG icons with
  react-icons. React Addon Library for icons!
featuredpost: false
featuredimage: /img/media-icons.jpg
date: 2020-05-17T23:39:39.375Z
tags:
  - React
  - Icons
  - Tools
  - Libraries
---
There are plenty of occasions in web development to reach for icons. Installing an icon package lets you import icons as svg. Of all the icon libraries for React, [react-icons](https://www.npmjs.com/package/react-icons) is the best.

## React-icons

**React-icons** is a combination of 10 icon sets including:

- Font Awesome
- Ionicons
- Material Design
- Typicons
- Github Octicons
- Feather
- Game Icons
- Weather Icons
- Devicons
- Ant Design Icons

Here is a [full list](https://react-icons.netlify.com/#/) of available icons

This popular package for React can be installed with the command

```bash
npm install react-icons
```

## Import Syntax

Each icon in the package can be imported using the individual icon's name imported from the appropriate subfolder

```javascript
import { FaGithub } from "react-icons/fa";
import { GoZap } from "react-icons/go";
import { TiBeer } from "react-icons/ti";
```

## Usage in Markup

These icons can be added to your JSX by simply calling a self-enclosed element with the import name. Each of these custom elements will be replaced by `svg` of the chosen icon.

```jsx
<FaGithub />
<GoZap />
<TiBeer />
```

![icons black](./react_icons1.jpg)

## Icon Styling

By default, the `size` and `color` of your icons will be the same as your text. These attributes can be modified by changing the `font-size` and `color` properties respectively.

```css
svg {
  font-size: 24px;
  color: orangered;
}
```

![icons orange](./react_icons2.jpg)

If you are using other svgs, it makes more sense to add an icon class and/or id to your icons instead. Icons can be further customized like any other element.

```jsx
<FaGithub className="icon" id="icon-green" />
<GoZap className="icon" id="icon-gold" />
<TiBeer className="icon" />
```

and change add the following CSS

```css
.icon {
  font-size: 48px;
  margin: 8px;
}
#icon-green {
  color: green;
}
#icon-gold {
  color: gold;
}
```

![icons colors](./react_icons3.jpg)

React-icons really simplifies the process of acquiring and maintaining icons in a react project. With so many options available for icons, it's a very useful package to install. 