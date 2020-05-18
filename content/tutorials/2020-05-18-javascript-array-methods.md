---
templateKey: blog-post
title: Array Methods in JavaScript
slug: javascript-array-methods
datePublished: 2020-03-16T18:00:00.000Z
dateModified: 2020-03-16T18:00:00.000Z
description: A basic overview of the different array methods available in
  JavaScript. Includes Mutator, Accessor, and higher order methods.
featuredpost: false
category: JavaScript
tags:
  - Arrays
  - Fundamentals
  - JavaScript
featuredimage: /img/javascript_array_hacker.jpg
---
In JavaScript, **arrays** are *list-like* variables which store multiple values in a given order. There are numerous built in methods we can call on arrays to modify or arrange them. Though there are dozens of such methods, these are a few that I have found particularly useful. Follow along by either reading the code blocks beneath each function, or entering the commands in the terminal yourself.

## Mutator Methods

*push* | *pop* | *shift* | *reverse*

&nbsp;

These methods will modify the contents of an array:

### Push

```javascript
const tasksArray = ["shop", "cook"];
const nextTask = "eat";
tasksArray.push(nextTask);

console.log("Tasks: ", tasksArray);
```

```terminal
>> Tasks: ["shop", "cook", "eat"];
```

This method takes an element as its argument to add to the end of an array. Push returns the *length* of the new array when stored in a variable.

### Pop

```javascript
const numbersArray = [1, 2, 3];
const lastNumber = numbersArray.pop();

console.log("New Array: ", numbersArray);
console.log("Popped Number: ", lastNumber);
```

```terminal
>> New Array: [1, 2] 
>> Popped Number: 3
```

This method removes the last element of an array, and returns that element when called. Pop is essentially the opposite of push()

### Shift

```javascript
const numbers = [1, 2, 3];
const firstNumber = numbers.shift();

console.log("New Array: ", numbers);
console.log("Shifted Number: ", firstNumber);
```

```terminal
>> New Array: [2, 3]
>> Shifted Number: 1
```

This method removes the first element of an array, and returns that element. *shift()* is like *pop()*, except at the beginning of the array instead of the end. (Another method *unshift()* is like *push()* but instead for the beginning of the array)

### Reverse

```javascript
const inOrder = [1, 2, 3, 4];
const reversedNumbers = inOrder.reverse();

console.log("Reversed: ", reversedNumbers);
```

```terminal
>> Reversed: [4, 3, 2, 1]
```

This method reverses the entire order of an array so that the first element is in the beginning and the last is at the end. The reverse method returns the reversed array.

## Accessor Methods

*concat* | *indexOf* | *slice* | *split* | *join*

&nbsp;

The following methods do not mutate the initial array, instead they return a new array based off of it:

### Concat

```javascript
const begin = [1, 2];
const end = [3, 4, 5];
const combined = begin.concat(end);

console.log("Combined: ", combined);
```

```terminal
>> Combined: [1, 2, 3, 4, 5]
```

### IndexOf

```javascript
const automobile = ["truck", "sedan", "suv", "motorcycle"];

console.log("SUV Index: ", automobile.indexOf("suv"));
console.log("Airplane Index: ", automobile.indexOf("airplane"));
```

```terminal
>> SUV Index: 2
>> Airplane Index: -1
```

This method returns the index of the first instance of the element in the array if it exists. If this element is not contained in the array, the indexOf method returns -1.

### Slice

```javascript
const travelItems = ["hat", "phone", "map", "snack"];

const middleItems = travelItems.slice(1,3);
const endItems = travelItems.slice(2);

console.log("Middle Items: ", middleItems);
console.log("End Items: ", endItems);
```

```terminal
>> Middle Items: ["phone", "map"]
>> End Items: ["map", "snack"]
```

This method returns a portion of the original array **starting** at the *beginning* index **until** just *before* the *ending* index. The length of the returned array is the difference of the passed indexes when they are positive. If only one argument is passed to slice, it returns the portion of the original array starting with the beginning index until the end of the array.

### Split and Join

```javascript
const language = "JavaScript";
const letters = language.split("");

console.log("Split Word: ", letters);
```

```terminal
>> Split Word: ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]
```

Next we can recombine these letters with the `.join()` method

```javascript
const word = letters.join("");
console.log("Joined Word: ", word);
```

```terminal
>> Joined Word: JavaScript
```

This method combines the values of the original array, returning a string separated by the passed argument. If no argument is passed, the elements are separated by commas, but no spaces. If the argument `“”` or `‘’` is passed, the elements are joined together with no commas or spaces. The arguments `“ “`, `“-”`, `“+”` will join the array elements together, separating them with the separator in quotes.

## Higher order methods

*forEach* | *map* | *filter* | *reduce* | *sort* 

&nbsp;

Each *higher order method* takes in a callback function as its argument and gets called once for each entry in the array. The first (and required) argument is an arbitrary variable name representing each **individual entry** in the array. Optionally, a second (**index**) and third (**array**) argument can be passed into each method

### ForEach

This method will call a specific block of JavaScript for each entry in an array. The `forEach` method does not return a value, so it's primary purpose is the code run in the callback.

```javascript
const countdownArray = [3, 2, 1];

countdownArray.forEach(item => {
    console.log("Countdown: ", item)
});
```

```terminal
>> Countdown: 3
>> Countdown: 2
>> Countdown: 1
```

### Map

This method will create a new array with each entry containing the value returned in map's callback function. Map is a great tool to reshape your data and can even return HTML, letting you quickly output data.

```javascript
const people = ["Jim", "Alison", "Christopher", "Samuel", "Sara"];

const linesArray = people.map(name => {
  if(name.length > 8) {
    return name + " is a long name"
  } else if (name.length > 5){
    return name + " is a medium name"
  } else {
    return name + " is a short name"
  }
});

console.log(linesArray);
```

```terminal
[
  "Jim is a short name", 
  "Alison is a medium name", 
  "Christopher is a long name", 
  "Samuel is a medium name", 
  "Sara is a short name"
]
```

### Filter

This method also creates a new array like map. Each entry is only added to the new array if a it returns a value which resolves to true.

```javascript
const integersArray = [1, 2, 3, 4, 5];
const even = integersArray.filter((number) => number % 2 === 0 );
console.log("Even Numbers: ", even);
```

```terminal
>> Even Numbers: [2, 4]
```

### Reduce

This method takes an takes an **accumulator** and a **current value** argument. The current value argument is similar to the first variable in map and filter. It will be represent the current value of the array you are iterating through. Reduce also accepts a second argument, which is essentially a starting value for the accumulator. Here is a basic example use case of reduce

```javascript
const firstFive = [1, 2, 3, 4, 5];

const total = firstFive.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
}, 0);

console.log("Reduced Array: ", total);
```

```terminal
>> Reduced Array: 15
```

### Some

Like map and filter, this method takes as its argument a callback function which accepts up to three arguments: the current value, the current index, and the original array. Some iterates through the array, executing the callback function on each value. If at least one of the callback functions returns true, the some method also returns true.

```javascript
const animals = ["lion", "bear", "cheetah", "hippo"];

const containsHippo = animals.some((animal) => {
    return animal === "hippo"
});

console.log("Contains a Hippo: ", containsHippo);
```

```terminal
>> Contains a Hippo: true
```

### Every

This method is similar to some, except it requires the callback for every value of the array to return true. If any of the callback’s return false, the every method returns false. If all of the callback functions return true, the every method returns true.

```javascript
const animalsArray = ["lion", "bear", "cheetah", "hippo"];

const allHippos = animalsArray.every((animal) => {
    return animal === "hippo"
});

console.log("Contains only Hippos: ", allHippos);
```

```terminal
>> Contains only Hippos: false
```

### Conclusion

These are just some of the many array methods available in Javascript. There is a wealth of understanding to be gained by trying out these methods yourself in the console. While it is easy to look these methods up as they are needed, gaining a more thorough understanding of how they work and what their limitations are is a great way to add depth to your Javascript toolkit.
