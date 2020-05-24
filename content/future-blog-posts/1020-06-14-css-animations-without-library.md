---
title: How to use CSS Animations
date: "2020-06-14"
category: "CSS"
description: "Comphrensive overview for using CSS Animations with best performance. Guide to understand keyframes and animation properties."
featuredImage: /img/css_animations_without_library.jpg
tags: ["CSS", "Animations", "Keyframes", "Properties", "No Library"]
---

On any webpage you can animate all elements on the DOM using **CSS animations**. Animations can be configured with `CSS` and chained together using `JavaScript`. Each CSS `animation` has an associated `keyframe` which describes when which properties will be transformed along the animations duration.

Animations are very simple in `CSS` and we can start by creating a simple `index.html` file to write our code. 

```html
<!DOCTYPE html>
<html>
  <head>
    <title>How-to Guide, CSS Animations</title>
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

This is a basic animation which *translates* in a header element while *fading-in* the opacity. Each animation requires an associated keyframe `animation-name`.

## Animation properties
In this example we set 3 animation properties: `animation-name`, `animation-duration`, and `animation-iteration-count` to bring in our header. There are other animation properties as well, including

| Animation Property          | Description                        | Example Value                      |
| --------------------------- | ---------------------------------- | ---------------------------------- |
| `animation-name`            | **specifies name of keyframe**     | camcelCase characters              |
| `animation-duation`         | **length of animation**            | 1s / 1000ms                        |
| `animation-delay`           | **length of delay**                | 1s / 1000ms                        |
| `animation-timing-function` | **type of timing function**        | ease-in, cubic-bezier(.5,.2,.3,.1) |
| `animation-iteration-count` | **number of animation iterations** | 1, 2, infinite                     |
| `animation-direction`       | **repeat or back-and-forth**       | normal, alternate                  |
| `animation-fill-mode`       | **sets before and after styles**   | forwards, backwards, both, none    |
| `animation-play-state`      | **allows for pause and resume**    | paused, running                    |

## Keyframes
Declare a keyframe with the `@keyframes name` syntax. Keyframes can use the `from -> to` syntax

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
    transform: rotate(0deg)
  }
  25% {
    transform: rotate(45deg)
  }
  100% {
    transform: rotate(-270deg)
  }
}
```

Any properties that are animated are specified in each portion of the keyframe. Values in between states are interpolated for smooth transitions.

## Examples

### All properties

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS Animations how-to</title>
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

### Animation Shorthand
There are several shorthands that can be used for the `animation` property including
- animation: name | duration
- animation: duration | name | delay | iteration count
- animation: duration | name | delay | timing-function | iteration-count
The syntax seems to be quite flexible as long as you specify the `duration` *before* the `delay` and make sure to include a `animation-name` as well as valid arguments.

Here is another example animation using the `animation` shorthand proerty

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS Animations how-to</title>
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

In this animation we instead have a ball which moves across the screen while changing colors. In this keyframe we have *multiple* `transform` properties. In this transform, `translate` takes x and y values for the animation motion. The **syntax** for `transform` is such that all transformations need to be declared on the same property, separated by a space. Otherwise if you declare them separately, the latter one will overwrite the former in this **incorrect** example

```css
@keyframes badTransformExample{
  0% {
    transform: translate(50px, 250px);
    transform: scale(1);
  }
  100% {
    transform: translate(300px, 200px);
    transform: scale(2.5)
  }
}
```

### Properties which can be animated
- opacity
- transform (translate, scale, rotate)
- color / background-color
- height / width

> There are actually hundreds of properties which can be animated in CSS. A full list can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

### Performance
While color and height can be animated, it is generally *more performant* to use only `opacity` and `transform` animations where possible. Animating an element's `height` can be improved in performance by instead using `transform: scale()`. . 

## Chaining Animations
Multiple animations can be *chained* together using **setTimeout** in JavaScript. This can be done by adding *animation classes* to elements on the DOM. 

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS Animations how-to</title>
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
      var containerEl = document.querySelector("div");
      var headerEl = document.querySelector("h1");
      containerEl.classList.add("slide-in-left");

      setTimeout(function() {
        headerEl.classList.add("fade-in");
        headerEl.classList.remove("opacity-none");
      }, 1000);
    </script>
  </body>
</html>
```

In this example we set a timer after the gold box drops down. Once the first animation is over, the text `fade-in` animation begins. You can set as many `setTimeout` functions as you need to chain together complex animations. Elements can be accessed from the DOM via `querySelector` and have their `classList` property adjusted.

## Conclusion
There is a tremendous amount you can accomplish with just a few simple `keyframes` and some `setTimeout` functions. While animations can sometimes get complicated, it is still easy to setup and test out basic animations.