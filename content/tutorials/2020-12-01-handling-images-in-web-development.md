---
templateKey: blog-post
title: Tips for Handling Images in Web Development
slug: handling-images-in-web-development
date: 2020-12-01T15:00:00.000Z
dateModified: 2020-12-01T15:00:00.000Z
description: Basic tips for selecting, resizing, compressing, and displaying images in web development. Handling images can help your website performance and design.
featuredPost: true
category: HTML
tags:
  - Images
  - CSS
  - Performance
  - HTML
  - Basics
featuredImage: /img/tips-for-handling-images.jpg
---

Images are often the heaviest part of websites and applications. In many cases they can be as much as 90% or more of assets downloaded by weight.  
<br />
Here are some tips about how to handle your images effectively to speed up your website and make it look good on all screen sizes.

## JPG, PNG, or SVG?
There are 3 primary ways to serve image files on a website. Each offers unique benefits, and it is useful to know the best file type to use for each circumstance.

### JPG
**.jpg** or **.jpeg** (same thing) images files are most useful for serving lightweight, but full color images. While they can lose some quality compared to other file types when compressed, the amount is minimal compared to the benefits from having a smaller file size.  
<br />
Any images such as photography or illustration that take up the entire dimensions of the HTML element are ideal for using **.jpg**. 

### PNG
**.png** files, while slightly heavier than **.jpgs** are ideally used when there is some transparency in the image. PNG's retain transparency and lose less quality than JPG's when compressed.  
<br />
For full-sized images it is a good option to use **.png** if you need transparency in the image and **.jpg** otherwise.

### SVG
The third image type, **.svg** is *far smaller* than both .jpg and .png. **SVG** stands for *scalable vector graphics* and is ideal for using vector (line-based) imagery.  
<br />
Using **svg** for icons and logos is an excellent option (where possible) because the file size can be sometimes hundreds of times smaller than the alternatives. **svg** images are also scalable, so englargening them doesn't actually make them bigger.  
<br />
The main downside to **svg** is the vector lines have to be exactly specified, so it is not feasible to use this file type for photography and complex illustrations.

## Image or Background Image?
There are two ways to declare images in **HTML/CSS**, using the **img tag** and setting a **background image**. There are slight differences between the two options, each with their own benefits. Both options can achieve the same results visually with the right code.

### Image Tag
To create an image with the img tag, use the following syntax in your **HTML**:

```html
<img src="image-url-here" alt="alt-text-here">
```

Elements using the **img** tag will be loaded to the page with their default *height* and *width*. They can be styled using CSS or by adjusting the HTML style properties.  
<br />
**img** tags excel if the element is a standalone image, if you wish to include the **alt** attribute for accessibility, or to simplify your markup.

### Background Image 
To create a background image, use the following syntax:  
<br />
**HTML** Tag:
```html
<div id="my-background-id"></div>
```
**CSS** Styles:
```css
#my-background-id {
  background: url("image-url-here");
  width: 300px;
  height: 200px;
}
```
**Background images** are especially useful when an image is to be applied to an *entire section* of a webpage, or if you want to include other content *on top of* your image.  
<br />
**div** elements with a background style attribute have no height (if empty) by default and these will need to be applied in the styling. This can cause issues with images stretching if you do not include the exact *width* and *height*. This issue can be easily remedied by also adding the **background-size** attribute as either *cover* or *contain*.

## Resizing Images
If you are specifying the dimensions of your images in your code, larger images will be shrunk and smaller images will be enlarged to fit the screen. The original source files will still *have to be downloaded*, even if their display dimensions are much smaller than how they appear on the screen.  
<br />
One way to remedy this issue (and speed up your websites) is to make sure your images are only as large *as they need to be*. If your image is only 600 pixels wide on the screen, make sure the file is not much larger than 600 pixels (or 1200 pixels max for high quality). Even reducing a file's dimensions by half can *significantly improve* website performance.

## Lossless Image Compression
As mentioned above, images *can be heavy* elements on a webpage. One simple way to reduce load times on pages with many images is to use a **lossless image compression** tool. There are many available for free online. [Tiny PNG](https://tinypng.com/) is an excellent tool to shrink down the image size of your *jpgs* and *pngs* without losing much (if any) quality in your files.  
<br />
This tool, or similar ones, is a *must have* if you are including lots of large images on your website. Compressing your images can shrink your files by 1.5 - 5x their original size without noticeably impacting their quality.

## Maintaining Aspect Ratio
Sometimes you'll notice stretched or cut-off images when browsing the web. As a developer, it is easy to avoid this issue on your websites by paying attention to the image's **aspect ratio**. This ratio is the *width* of the image, compared to the *height*. Images on the web are generally **1.5:1**, **16:9**, or **1.91:1** ratios.  
<br />
While it is not necessary to have all your images be the same ratio, it is a great way to make your sites look uniform, and have their social media share links fit well on the screen.  

## Fixing Stretching, Crunching, or Cut-off Images
If you notice images stretching, crunching, or getting cut off on your site, there are some quick fixes to adjust this.

### Fixing Img tags
If you don't specify the height **AND** width of your image tags, they will load properly by default (although they might not be the right size).  
<br />
If you specify only the height **OR** width of an img tag, the other attribute will be calculated for you.  
<br />
Sometimes you will need the image to fit a certain height **AND** width. One solution here is to use the **object-fit** property and set it equal to either *cover* or *contain*. This can fix the immediate issue of stretching or crunching images.  
<br />
There are other values you can apply to this **object-fit** attribute which you can learn about with [How to use the Object-Fit Property in CSS](https://www.code-boost.com/how-to-use-object-fit-property/).

### Fixing Background Images
One way to prevent stretching, crunching, or cutting-off background images is to specify dimensions which correspond with the image file's aspect ratio. This can be a pain, especially if the dimensions need to change on different screen sizes.  
<br />
Another simpler way to fix this issue is to apply the *width* and *height* you want the container to be, and then use the **background-size** property with the value *cover* or *contain*. This property is similar to the object-fit property for image tags.

### Conclusion
While images can sometimes be a pain to work with, it is well worth the time and attention you give them.  
<br />
By using some of the tips outlined above you can improve your website's performance as well as the overall presentation.