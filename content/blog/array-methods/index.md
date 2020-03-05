---
title: Array Methods in JavaScript
date: "2015-05-06T23:46:37.121Z"
category: "JavaScript"
description: "A basic overview of the different array methods available in JavaScript. Includes Mutator, Accessor, and higher order methods."
featuredImage: "./arraymethods.jpg"
tags: ["Arrays", "Fundamentals", "JavaScript"]
---

In JavaScript, arrays are list-like variables which store multiple values. There are numerous built in methods we can call on arrays to modify or gather information from them. Though there are dozens of such methods, I will be outlining a few that I have found particularly useful.

## Mutator Methods

These methods modify the contents of an array:

### push(element)

```javascript
const numbers = []
const num = 42
numbers.push(num)

console.log(numbers)
// [42]
```

This method takes an element as its argument to add to the end of an array. Push returns the length of the new array.

### pop
```javascript
const numbers = [1, 2, 3]
const lastNumber = numbers.pop()

console.log(lastNumber)
// 3
console.log(numbers)
// [1, 2]
```

This method removes the last element of an array, and returns that element.

### shift
```javascript
const numbers = [1, 2, 3]
const firstNumber = numbers.shift()

console.log(firstNumber)
// 1
console.log(numbers)
// [2, 3]
```
This method removes the first element of an array, and returns that element. Shift is like pop, except at the beginning of the array instead of the end.


### reverse
```javascript
const numbers = [1, 2, 3, 4]
const reversedNumbers = numbers.reverse()

console.log(reversedNumbers)
// [4, 3, 2, 1]
```
This method reverses the entire order of an array so that the first element is in the beginning and the last at the end. The reverse method returns the reversed array.

## Accessor Methods

The following methods do not mutate the initial array, instead they return a new array based on it:

### concat([element1, element2, …])
```javascript
const beginning = [1, 2]
const end = [3, 4, 5]
const total = beginning.concat(end)

console.log(total)
// [1, 2, 3, 4, 5]
```
This method returns a new array of the initial array with the argument array or arguments joined at the end.

### indexOf(element)
```javascript
const items = ["hat", "phone", "map", "snack"]

console.log(items.indexOf("map"))
// 2
```
This method returns the index of the first instance of the element in the array if it exists. If this element is not contained in the array, the indexOf method returns -1.

### slice
```javascript
const items = ["hat", "phone", "map", "snack"]

const endItems = items.slice(2)

console.log(endItems)
// ["map", "snack"]

const middleItems = items.slice(1,3)

console.log(middleItems)

```
This method returns a portion of the original array starting at the beginning index until just before ending index. The length of the returned array is the difference of the passed indexes when they are positive. If only one argument is passed to slice, it returns the portion of the original array starting with the beginning index until the end of the array.

### Array.join(seperator)
```javascript
const language = "JavaScript"
const letters = language.split("")

console.log(letters)
// ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]

const word = letters.join("")

console.log(word)
// JavaScript
```

This method combines the values of the original array, returning a string separated by the passed argument. If no argument is passed, the elements are separated by commas, but no spaces. If the argument “” or ‘’ is passed, the elements are joined together with no commas or spaces. The arguments “ “, “-”, “+” will join the array elements together, separating them with the separator in quotes.

## Higher order methods

These methods take in a callback or testing function as their argument:

### Array.map((value, index, array) => {callback})

```javascript
const people = ["Jim", "Sally", "Roger", "Gina", "Terry"]
const greetings = ["Hello", "Hi"]

const lines = people.map((person, index) => {
  if(index % 2 === 0) {
    return greetings[0] + " i'm " + people[index]
  } else {
    return greetings[1] + " i'm " + people[index]
  }
})

console.log(lines)
// [
//  "Hello i'm Jim", 
//  "Hi i'm Sally", 
//  "Hello i'm Roger", 
//  "Hi i'm Gina", 
//  "Hello i'm Terry"
// ]
```

This method takes as its argument a callback function which accepts up to three arguments: the current value, the current index, and the original array. Map iterates through each element of the array, executing the callback function on each value. The return of the callback function is placed into a new array, which the method map returns.

Map creates a new array rather than updating the original one. It is useful for transforming arrays, and can return HTML strings to be run as code

### Array.filter((value, index, array) => {callback})

This method takes as its argument a callback function which accepts up to three arguments: the current value, the current index, and the original array. Filter iterates through each element of the array, and if the callback function returns true, places the passed value into a new array. If the callback function returns false, the value is omitted from the new array.

### Array.some((value, index, array) => { callback })

Like map and filter, this method takes as its argument a callback function which accepts up to three arguments: the current value, the current index, and the original array. Some iterates through the array, executing the callback function on each value. If at least one of the callback functions returns true, the some method also returns true.

### Array.every((value, index, array) => {callback})

This method is similar to some, except it requires the callback for every value of the array to return true. If any of the callback’s return false, the every method returns false. If all of the callback functions return true, the every method returns true.

## Conclusion

These are just some of the array methods available in Javascript. There is a wealth of understanding to be gained by trying out these methods yourself in the console. While it is easy to look these methods up as they are needed, gaining a more thorough understanding of how they run, and what their limitations are is a great way to add depth and ability to your Javascript toolkit.
