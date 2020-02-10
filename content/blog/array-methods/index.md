---
title: Array Methods in Javascript
date: "2015-05-06T23:46:37.121Z"
category: "Javascript"
description: "setup"
featuredImage: "./tree-stump.jpg"
tags: ["Bitcoin", "Configuration"]
---

In javascript, arrays are list-like variables which store multiple values. There are numerous built in methods we can call on arrays to modify or gather information from them. Though there are dozens of such methods, I will be outlining a few that I have found particularly useful.

## Mutator Methods

These methods modify the contents of an array:

### Array.push(element)

This method takes an element as its argument to add to the end of an array. Push returns the length of the new array.

### Array.pop()

This method removes the last element of an array, and returns that element.

### Array.shift()

This method removes the first element of an array, and returns that element. Shift is like pop, except at the beginning of the array instead of the end.

### Array.unshift(element1, element2, …)

This method adds one or more elements depending on the arguments passed in order to the beginning of an array. The unshift method returns the length of the new array.

### Array.reverse()

This method reverses the entire order of an array so that the first element is in the beginning and the last at the end. The reverse method returns the reversed array.

## Accessor Methods

The following methods do not mutate the initial array, instead they return a new array based on it:

### Array.concat([element1, element2, …])

This method returns a new array of the initial array with the argument array or arguments joined at the end.

### Array.indexOf(element)

This method returns the index of the first instance of the element in the array if it exists. If this element is not contained in the array, the indexOf method returns -1.

### Array.slice(begin, end)

This method returns a portion of the original array starting at the beginning index until just before ending index. The length of the returned array is the difference of the passed indexes when they are positive. If only one argument is passed to slice, it returns the portion of the original array starting with the beginning index until the end of the array.

### Array.join(seperator)

This method combines the values of the original array, returning a string separated by the passed argument. If no argument is passed, the elements are separated by commas, but no spaces. If the argument “” or ‘’ is passed, the elements are joined together with no commas or spaces. The arguments “ “, “-”, “+” will join the array elements together, separating them with the separator in quotes.

## Higher order methods

These methods take in a callback or testing function as their argument:

### Array.map((value, index, array) => {callback})

This method takes as its argument a callback function which accepts up to three arguments: the current value, the current index, and the original array. Map iterates through each element of the array, executing the callback function on each value. The return of the callback function is placed into a new array, which the method map returns.

### Array.filter((value, index, array) => {callback})

This method takes as its argument a callback function which accepts up to three arguments: the current value, the current index, and the original array. Filter iterates through each element of the array, and if the callback function returns true, places the passed value into a new array. If the callback function returns false, the value is omitted from the new array.

### Array.some((value, index, array) => { callback })

Like map and filter, this method takes as its argument a callback function which accepts up to three arguments: the current value, the current index, and the original array. Some iterates through the array, executing the callback function on each value. If at least one of the callback functions returns true, the some method also returns true.

### Array.every((value, index, array) => {callback})

This method is similar to some, except it requires the callback for every value of the array to return true. If any of the callback’s return false, the every method returns false. If all of the callback functions return true, the every method returns true.

## Practice Practice Practice

These are just some of the array methods available in Javascript. There is a wealth of understanding to be gained by trying out these methods yourself in the console. While it is easy to look these methods up as they are needed, gaining a more thorough understanding of how they run, and what their limitations are is a great way to add depth and ability to your Javascript toolkit.
