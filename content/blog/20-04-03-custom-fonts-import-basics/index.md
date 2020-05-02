---
title: How to Add Custom Fonts to you Websites
date: "2020-04-03 11:00:00"
category: "CSS"
description: "Basic overview of how to add custom fonts to your webpage or application. Use font files with @fontface or the Google Fonts CDN."
featuredImage: "./fonts4.jpg"
tags: ["Fonts", "Basics"]
---

Most web browsers come with all of the basic fonts, however that's only a small fraction of the available fonts online (*free* and *premium*). Additional fonts can be added either using **font files** (*TTF*, *OTF*, *WOFF*, *WOFF2*,  etc) or by including them with a **CDN** such as *Google Fonts*.

## Declaring a Font File

If you have a font file already in your project (many are available free online), you can include it by adding a `@font-face` to your CSS stylesheet.

```css
@font-face {
  src: url("./assets/fonts/my_font.woff");
  font-family: "My Font";
  font-weight: normal;
}
```

A `font-face` is basically an import statement for a font to be loaded into CSS. The `font-family` attribute allows you to name the font, while the `src` attribute points to the location of the font file in your project (or a web URL). Create additional font-faces for different **font-weights**

```css
@font-face {
  src: url("./assets/fonts/my_font_bold.woff");
  font-family: "My Font";
  font-weight: bold;
}
```

You can now apply this font to your styles just like a normal font using the  `font-family` property with either *regular* or *bold*  `font-weight`. The following code will utilize both of our font imports above. For *font-weights*, `normal` is the same as `400` and `bold` the same as `700`.

```css
body {
  font-family: "My Font";
}
a {
  font-weight: bold;
}
```

### Using Multiple File Types

If you have mutiple font file types available, it makes sense to import them all in your `@fontface`. Ideally your declaration will include all the major types to support different browsers. Each import specifies a **url**, **format**, and are separated by commas except for the last import that ends with a `;`

```css
@font-face {
  src: url("./assets/fonts/my_font.woff") format("woff"),
       url("./assets/fonts/my_font.woff2") format("woff2"),
       url("./assets/fonts/my_font.ttf") format("truetype");
  font-family: "My Font";
  font-weight: normal;
}
```

## Importing Google Fonts

Adding a font using [Google Fonts](https://fonts.google.com/) is similar except here we will be including a CDN link in our markup *or* stylesheets. Select the font or fonts you wish to add to your site and customize the font-weights to include. Once you've selected the font-weights, the `embed` section will have options for either a standard **Link** import or **CSS** `@import` . 

### Link (Standard) Import

To include the `<Link />` import, add the tag from Google Fonts anywhere in your site's head. (This can be found in the `public` folder if you are using *create-react-app*)

```html
<head>
  <title>My Website</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet">
</head>
```

### CSS import

Alternatively, you may include your fonts using the `@import` syntax in your **CSS** stylesheets. Copy the import statement, and include it at the top of your *main* stylesheet.

```css
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");
```

### Applying the font

If your font is imported correctly you can include it in your styles with the property

```css
body {
  font-family: 'Noto Sans', sans-serif;
}
```

In the example above there are two values for `font-family`. The second value is a fallback font in case our first font is not loaded properly. All browsers have `serif` and `sans-serif` fonts, so it makes sense to include either as the last argument. Multiple fonts can be included in a font-family, this is often called a **font stack**.

## Using Font Stacks

When a user visits your site, their browser will attempt to load the font you used in your CSS. Sometimes this font *isn't available* or *doesn't work*, and your browser will fallback to a *secondary* font. This can happen multiple times, and it is common for websites to use a number of fonts in their font stack starting with their **main font** and those that look most similar to it. Here is an example font stack

```css
font-family: "Lucida Grande", "Lucida Sans", "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana, "Verdana Ref", sans-serif;
```

As you can see this would span multiple lines in a CSS file. Fortunately, most modern browsers are capable of loading fonts from CDNs or font-files readily, so it is often the case that the first font will load correctly.
