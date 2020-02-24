---
title: How to Add Custom Fonts to you Websites
date: "2015-05-06T23:46:37.121Z"
category: "CSS"
description: "setup"
featuredImage: "./fonts.jpg"
tags: ["Fonts", "Basics"]
---

While different browsers come preloaded with various fonts, it often makes sense to include your own. Fonts can be added either using font files (TTF, OTF, WOFF, etc) or by including them using a CDN such as *Google Fonts*.

## Font File

If you have a font file already in your project (many are available free online), you can include them by adding a `font-face` to your CSS stylesheet.

```css
@font-face {
  font-family: fontNameHere;
  src: url(my_font.woff);
}
```

A `font-face` is a declaration of a font you would like to add to the available font-families in CSS. Here you name the font and point the `src` attribute to the location of the font file in your project (or web URL).

Now you can apply this font to your styling by simply calling it like a normal `font-family` attribute

```css
body {
  font-family: fontNameHere;
}
```

## Google Fonts

Adding a font using [Google Fonts](https://fonts.google.com/) is similar except here we will be including a CDN link in our markup or stylesheets. Select the font you wish to add to your site, and click on the toolbar at the bottom. This will open up options to embed or customize your font. 

Before you embed the font, choose `customize` and select all the font-weights you would like to include on your website. The `embed` section will now have options for either a `standard` or `@import` import. 
  
### Standard import

To include the `standard` import, add the link tag from Google Fonts anywhere in your site's head. (This can be found in the `public` folder if you are using *create-react-app*)


```html
  <head>
    <title>My Website</title>
    <link href="https://fonts.googleapis.com/css?family=Gelasio&display=swap" rel="stylesheet">
  </head>
```

### CSS import
  
Alternatively, you may include your fonts using the `@import` syntax in your CSS stylesheets. Copy the import statement, and include it at the top of your main stylesheet (or in your html head wrapped in style tags).

```css
@import url('https://fonts.googleapis.com/css?family=Gelasio&display=swap');
```

### Applying the font

Finally, if your font is imported correctly you can include it in your styles with the property

```css
  body {
    font-family: 'Gelasio', serif;
  }
```

In the example above there are two values for `font-family`. The second value is a fallback font in case our first font is not loaded properly. All browsers have `serif` and `sans-serif` fonts, so it makes sense to include either as the last argument. Multiple fonts can be included in a font-family, this is often called a **font stack**.
