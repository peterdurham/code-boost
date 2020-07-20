---
templateKey: blog-post
title: JavaScript Types Explained
slug: types-in-javascript
date: 2020-07-20T14:22:42.185Z
dateModified: 2020-07-20T14:22:43.105Z
description: Explore the different types available in when coding JavaScript.
  These include String, Number, Boolean, Object, Undefined, Null, and Symbol.
featuredPost: false
category: JavaScript
tags:
  - Types
  - JavaScript
  - Basics
featuredImage: /img/javascript_types_colored_pencils.jpg
---
In JavaScript there are 7 main types that you will see values take on. These types include *String*, *Number*, *Boolean*, *Object*, *Undefined*, *Null*, and *Symbol*.   
<br />  
JavaScript is considered a `dynamically typed` language since it is not necessary to declare the type of a variable because the browser will determine that *at runtime*.  

## Strings
A string is a combination of characters and spaces primarily used to denote text. Strings can be created using *single quotes*, *double quotes*, and *back ticks* like so

```javascript
var string1 = 'A string with single quotes!'
var string2 = "A string with double quotes!"
var string3 = `A string with backticks!`
```

The first two examples are normal strings, while `string3` is considered a **string template literal**. 
### Standard String

Single and double quote strings can be concatenated with other strings and variables using the **+** operator

```javascript
var string1 = 'Hello '
var string2 = "World"
console.log(string1 + string2)
// Hello World
```

Sometimes your strings will break if they contain quotes or slashes in them. This can be fixed with an "escape character" by adding a **\\** like in this example

```javascript
console.log("Hi i\'m a string!")
```

### String Template Literal
String template literals are new in ES6 and they allow us to insert variables into strings, as well as cleanly create multiline strings. This syntax is denoted by backticks **\`\`** and uses the dollar/brackets `${}` syntax to indicate a JavaScript variable.

```javascript
const stringType = "string template literal"
const string3 = `Hi, I'm a ${stringType} and 
exist on two lines.`
```

Multiline strings using quotes can become a headache as you actually need to include a **\** after each line break. String template literals allow us to make multiline strings with back ticks like in the example above. This is particularly helpful when you have a long string of text or markup, though it currently requires the use of a transpiler like *babel* to work across browsers.

## Number

In JavaScript *number* is the type for both integers and floating-point (decimal) numerical values.

```javascript
const number1 = 42
const number2 = 3.1416
```

Unlike strings, numerical values are represented without quotes. 

### Operations
In JavaScript we can perform *addition* (+), *subtraction* (-), *multiplication* (\*), *division* (\\), *exponent* (\*\*), and *modulus* (% aka remainder) operations using numbers and number variables.

```javascript

const number1 = 99
const number2 = number1 + 1 / 2
console.log(number2)
// 99.5
```

Keep in mind that order of operations rules still apply and operators will get evaluated in this order
1. parantheses/brackets
2. exponents
3. multiplication/division
4. addition/subtraction

### Math Object
JavaScript also comes with a *Math* object that has dozens of math methods including

| Math method   | Description                   | Example Call     | Example Value       | 
| ------------- | ----------------------------- | ---------------- | ------------------- |
| `random()`    | **random number 0-1**         | Math.random()    | 0.09951443268451432 |
| `round(2.5)`  | **rounds to nearest integer** | Math.round(2.5)  | 3                   |
| `abs(-5)`     | **absolute value**            | Math.abs(-5)     | 5                   |
| `ceil(9.99)`  | **rounds up**                 | Math.ceil(9.99)  | 10                  |
| `floor(9.99)` | **rounds down**               | Math.floor(9.99) | 9                   |


## Boolean

In JavaScript, a boolean is considered either `true` or `false`. Booleans also do not require quotes like numbers, and have have only 2 possible values. Booleans are useful to contain application logic by running different code based on certain conditions. There are numerous methods in JavaScript that are evaluated to a boolean. For example

```javascript
console.log(2 + 2 === 4)
// true

console.log(1 <= 5)
// true

const name = "code-boost"
console.log(!name)
// false

const fruits = ['apple', 'orange', 'melon']
console.log(fruits.indexOf('banana') > -1)
// false
```

## Object
Object is somewhat of an all-encompasing type in JavaScript. An object, at a fundamental level is a type of complex data structure denoted by brackets **{}** that contains named properties which are either JavaScript values or functions.   
<br />  
Here is an example JavaScript object

```javascript
const user = {
  name: "Giovanni",
  email: "giovanni@teamrocket.com",
  lastLogin: 36842,
  sayHi: function() {
    console.log("Hi, my name is " + this.name)
  }
}
```

We can access each of the properties on the `user` object like so

```javascript
console.log(user.name)
// Giovanni

console.log(user.sayHi)
// Hi, my name is Giovanni
```

> Additionally we can access the `user` object directly in the console, i.e. `user.name`. This because `user` is globally scoped in this example.

Object properties can also be changed in a few different ways like so

```javascript
user.name = "Ash Ketchum"
user["email"] = "ashketchum@pallettown.com"
console.log(user)
```

```terminal
{
  name: "Ash Ketchum", 
  email: "ashketchum@pallettown.com", 
  lastLogin: 36842, 
  sayHi: ƒ
}
```

### Other Objects
The type `object` also includes *arrays*, *functions*, *dates*, and other structures in JavaScript which are actually specialized objects. 

```javascript
const object1 = [1, 2, 3]
const object2 = function() {
  console.log('hello')
}
const object3 = new Date()
```

## Null
In JavaScript a value can be declared null if it has no default value. This is useful because that value will evaluate to false. Null is sort of an *empty state* to indicate non-string unassigned values.  
<br />  
A null value can only be arrived at if it is declared as null at some point.

## Undefined
Variables in JavaScript can be declared and not defined

```javascript
var name
let email
console.log(name, email)
// undefined undefined
```

It is also common to get `undefined` from a function that doesn't have a return value or a variable that wasn't correctly imported.

## Symbol

The Symbol type in JavaScript is a new addition with ES6. Calling a `Symbol()` returns a unique value that can be used for object identifiers. Symbols are the least common of all the JavaScript types, and are mostly unnecessary to use in development.

```javascript
const symbol1 = Symbol()
```

## Using the typeof Method

Each of the above example variables can have their types evaluated with the `typeof` method. This method returns the name of the variable's type.

```javascript
const title = "code-boost"
console.log(typeof title)
// string

const luckyNumber = 100
console.log(typeof luckyNumber)
// number
```