---
templateKey: blog-post
title: Beginner's Guide to Using SCSS
slug: beginners-guide-to-scss
date: 2020-06-24T16:50:39.144Z
dateModified: 2020-06-24T16:50:38.616Z
description: A complete beginner's guide and overview to using SCSS features
  like nested selectors, variables, imports, and mixins.
featuredPost: false
category: CSS
tags:
  - SCSS
  - Basics
  - CSS
featuredImage: /img/beginners_guide_to_scss.jpg
---
**SCSS** is a popular preprocessor too for CSS that provides additional highly useful
features. The syntax originally was derived from **SASS** which is a similar tool. In
addition to its useful features, SCSS has seen wide adoption because `.scss` files work
with _CSS_ styles too.   
<br />
This tutorial will provide examples for each of the major
features in **SCSS**. Feel free to just read along or check out [how to set up SCSS](https://www.code-boost.com/scss-setup/) for JavaScript and React projects to try out the features yourself.

## Nested Selectors

Oftentimes in css some of our styles may be extends versions of others. For example

```css
.header {
  width: 50%;
  margin: 0 auto;
}
.header-link {
  color: blue;
}
```

SCSS allows us to nest selectors that repeat the same root text like the example above. We
can rewrite it for SCSS by using a **nested selector**

```css
.header {
  width: 50%;
  margin: 0 auto;

  &-link {
    color: blue;
  }
}
```

SCSS is a preprocessor, meaning that it will read the second example and compile it into
the first example. The `&` symbol gets replaced with the name of the current selector. We
can even nest selectors as deep as needed, though 3 levels is usually enough.

> Nested selectors work really well with the Block Element Method (BEM) for writing
> classnames since that technique uses lots of repetition to ensure high specificity.

This technique is a big change from normal `.css` selectors, however using nesting can
greatly simplify the development process and volume of text on the screen.

## Variables

In `.scss` files we can set **CSS** values to variables like we would in strings
JavaScript. The SCSS syntax for variables is

```css
$width-container: 1000px;
$font-text: 'Noto Sans', 'Open Sans', sans-serif;
$color-green: #29a634;
```

Variables in SCSS are defined outside of any selectors. We can call the variables above in
our `.scss` styles like so

```css
.container {
  width: $width-container;
  font-family: $font-text;
  color: $color-green;
}
```

The main benefit to using variables in your project is that you can change every selector
that uses them at once by adjusting their value. In CSS, those values are often scattered
across multiple stylesheets and selectors so creating a seperate stylesheet for
**variables** is helpful.

> It is important to make sure that all variables used are defined when they are called.
> The next feature, **@import** will let us load our variables before our styles that use
> them.

## Stylesheet @ Imports

A common pattern for **SCSS** is to create a `main.scss` file which will import each of
the other `.scss` files. For example, we could import the following two stylesheets in our
`main.scss` file

```css
@import './variables.scss';
@import './styles.scss';
```

Our files get imported in order so any variables used in `styles.scss` will already be
loaded. Its useful to keep the order of imports in mind when setting up your projects.

## Mixins

**Mixins** allow us to declare multiple **CSS** styles that we wish to reuse. For example,
we could create a mixin that centers everything in a flexbox

```css
@mixin center-content() {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

We could then call this mixin wherever we like in our `.scss` files

```css
.centered-container {
  @include center-content();
}
.centered-container-green {
  @include center-content();
  background: $color-green;
}
```

It also makes sense to include our **mixins** before any other stylesheets besides
**variables**, which we will need.

```css
@import './variables.scss';
@import './mixins.scss';
@import './styles.scss';
```

### Mixins with arguments

We can also use variables and input values in our mixins

```css
@mixin box($height, $width) {
  height: $height;
  width: $width;
}

.aspect-image {
  @include box(90px, 160px);
}
```

### Conclusion

SCSS allows us to use mixins, variables, and imports together to compose reusable styles
in an organized way. Practicing **SCSS** will help you develop specific naming patterns,
as well as adding an element of reusability to your code.
