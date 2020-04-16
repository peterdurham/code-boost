---
title: How to use React Icons in Your Projects
date: "2015-05-06T23:46:37.121Z"
category: "React"
description: "Learn how to add icons to your project and update SVG icons with react-icons. React Addon Library for icons."
featuredImage: "./icons.jpg"
tags: ["React", "Icons", "Tools", "Libraries"]
---

There are plenty of occasions in web development to reach for icons. Installing an icon package lets you import icons as svg. Of all the icon libraries for React, `react-icons` is the best.

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

The full list of available icons can be found and referenced [here](https://react-icons.netlify.com/#/)

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

<img src="C:\Users\Peter\Desktop\websites\code-boost\content\blog\react-icons\react_icons1.jpg" title="" alt="icons" width="718">

## Icon Styling

By default, the `size` and `color` of your icons will be the same as your text. These attributes can be modified by changing the `font-size` and `color` properties respectively.

```css
svg {
  font-size: 24px;
  color: orangered;
}
```

![icons bigger and orange](C:\Users\Peter\Desktop\websites\code-boost\content\blog\react-icons\react_icons2.jpg)

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

![different colored icons](C:\Users\Peter\Desktop\websites\code-boost\content\blog\react-icons\react_icons3.jpg)

React-icons really simplifies the process of acquiring and maintaining icons in a react project. With so many options available for icons, it's a very useful package to install. 