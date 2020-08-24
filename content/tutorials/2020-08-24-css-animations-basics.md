---
templateKey: blog-post
title: How to use CSS Animations without a library
slug: css-animations-basics
date: 2020-08-24T14:52:29.203Z
dateModified: 2020-08-24T14:52:29.698Z
description: Comphrensive overview for using CSS Animations with best
  performance. Guide to understanding keyframes and animation properties with
  practical examples.
featuredPost: false
category: CSS
tags:
  - CSS
  - Animations
  - Keyframes
  - Properties
  - No Library
featuredImage: /img/css_animations_without_library.jpg
---
All visibile elements on a webpage can be animated using _CSS Animations_. Each CSS
`animation` is declared in an associated `@keyframes` block which describes the
properties that will be transformed during the animation. 
<br />  
Animated elements can be triggered in a variety of ways. They can be run immediately, with a delay, or
set off by `JavaScript` events.  
<br />
We can try out some animations by creating a `index.html` file to save and run our code. In this tutorial, we will go over the basics of animations along with 4 examples you can run in the browser for hands-on practice.

## First Example: Slide and fade in text

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS Animations: Slide/fade in text</title>
    <style>
      h1 {
        animation: slideFadeInRight 2s 1;
        text-align: center;
      }
      @keyframes slideFadeInRight {
        0% {
          opacity: 0;
          transform: translateX(100px);
        }
        100% {
          opacity: 1;
          transform: translateX(0px);
        }
      }
    </style>
  </head>
  <body>
    <h1>CSS Animations Slide and Fade in</h1>
  </body>
</html>
```
Save this file and open it in the browser. You can do this in most browsers by dragging and dropping the file into a new tab. This animation `slideFadeInRight` will _translateX_ in a header element while _fading-in_ it's
opacity.  
<br />   
 Each HTML element that uses the *animation* property references a keyframe with it's *animation-name*.

## Animation properties

In this example we set 3 animation properties: `animation-name`, `animation-duration`, and
`animation-iteration-count` to bring in our header.  
<br />  
There are other animation properties that can be changed as well, including

| Animation Property          | Description                        | Example Value                      |
| --------------------------- | ---------------------------------- | ---------------------------------- |
| `animation-name`            | **specifies name of keyframe**     | camelCase characters              |
| `animation-duration`         | **length of animation**            | 1s / 1000ms                        |
| `animation-delay`           | **length of delay**                | 1s / 1000ms                        |
| `animation-timing-function` | **type of timing function**        | ease-in, cubic-bezier(.5,.2,.3,.1) |
| `animation-iteration-count` | **number of animation iterations** | 1, 2, infinite                     |
| `animation-direction`       | **repeat or back-and-forth**       | normal, alternate                  |
| `animation-fill-mode`       | **sets before and after styles**   | forwards, backwards, both, none    |
| `animation-play-state`      | **allows for pause and resume**    | paused, running                    |

## Keyframes

Declare a keyframe with the `@keyframes name` syntax.  
<br />
Keyframes can either use the `from, to` syntax

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

or the percentage `%` syntax

```css
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(-270deg);
  }
}
```

Any animated properties are specified between at least two stages of a keyframe.  
<br />
In a keyframe `from` or `0%` indicate the beginning state of each animated property, while `to` or `100%` indicate the end states. Values in between states get interpolated based on where they are in the animation.

## Second Example: Grow and Shrink

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS Animations: All Properties</title>
    <style>
      h1 {
        animation-name: growShrink;
        animation-duration: 1.25s;
        animation-timing-function: linear;
        animation-delay: 25ms;
        animation-direction: alternate-reverse;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        animation-play-state: running;
        text-align: center;
      }
      @keyframes growShrink {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(2.5);
        }
      }
    </style>
  </head>
  <body>
    <h1>CSS Animations Grow and Shrink</h1>
  </body>
</html>
```

### Animation shorthand syntax

There are several shorthands that can be used for the `animation` property including

- animation: name | duration
- animation: duration | name | delay | iteration count
- animation: duration | name | delay | timing-function | iteration-count   
  
The syntax seems to be quite flexible as long as you specify the `duration` _before_ the `delay` and make sure to include a `animation-name` as well as only valid arguments.  
<br />  
Here is another example animation using the `animation` shorthand proerty


## Third Example: Shorthand syntax
```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS Animations: Shorthand syntax</title>
    <style>
      #object {
        width: 100px;
        height: 100px;
        color: green;
        border: 4px solid orange;
        border-radius: 50%;
        animation: movingColorBall 1.25s infinite ease-in-out;
      }
      @keyframes movingColorBall {
        0% {
          transform: scale(1) translate(100px, 0px);
          background-color: green;
        }
        100% {
          transform: scale(2.5) translate(300px, 200px);
          background-color: red;
        }
      }
    </style>
  </head>
  <body>
    <div id="object"></div>
  </body>
</html>
```

In this animation we have a growing ball which moves across the screen while changing
colors. This example has a keyframe with _multiple_ `transform` properties.  
### Multiple transformations
In CSS we can have two transformations occur by separating them with a space. Otherwise if you were to declare them separately, the latter one will overwrite the former (scale would overwrite translate) as seen below 

### **Incorrect example** 

```css
@keyframes badTransformExample {
  0% {
    transform: translate(50px, 250px);
    transform: scale(1);
  }
  100% {
    transform: translate(300px, 200px);
    transform: scale(2.5);
  }
}
```

### Animatable Properties

- opacity
- transform (translate, scale, rotate)
- color / background-color
- height / width

> There are actually hundreds of properties which can be animated in CSS. A full list can
> be found
> [here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

### Animation Performance

While color and height can be animated, it is generally _more performant_ to use only
`opacity` and `transform` animations where possible. Animating an element's `height` or `width` can
be improved in performance by instead using `transform: scale()`. .


## Fourth Example: Chaining animations
Multiple animations can be _chained_ together using **setTimeout** in JavaScript. This can
be done by adding _animation classes_ to elements on the DOM.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS Animations: chaining multiple animations</title>
    <style>
      h1 {
        text-align: center;
      }
      .opacity-none {
        opacity: 0;
      }
      .slide-in-left {
        animation: slideInLeft 1s 1;
      }
      @keyframes slideInLeft {
        from {
          transform: translateY(-200px);
        }
        to {
          transform: translateY(0px);
        }
      }
      .fade-in {
        animation: fadeIn 1s 1;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    </style>
  </head>
  <body>
    <div style="background-color: gold;">
      <h1 class="opacity-none">CSS Animation Example</h1>
    </div>
    <script>
      var containerEl = document.querySelector('div')
      var headerEl = document.querySelector('h1')
      containerEl.classList.add('slide-in-left')

      setTimeout(function () {
        headerEl.classList.add('fade-in')
        headerEl.classList.remove('opacity-none')
      }, 1000)
    </script>
  </body>
</html>
```

In this example we set a timer after the gold box drops down. Once the first animation is
over, the text `fade-in` animation begins. You can set as many `setTimeout` functions as
you need to chain together complex animations. Elements can be accessed from the DOM via
`querySelector` and have their `classList` property adjusted.  

### Conclusion

There is a tremendous amount you can accomplish with just a few simple `keyframes` and
some `setTimeout` functions.  
<br />   
While animations can get quite complex and sometimes a library seems simpler, it is always useful to understand techniques for solving problems in plain CSS / JS.