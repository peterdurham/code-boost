---
title: Using Map, Filter, Reduce, and Sort in Javascript
date: "2020-06-20 11:00:00"
category: "JavaScript"
description: "Overview of several basic JavaScript array methods. Explains how to use these four  common methods."
featuredImage: "./solarpanels.jpg"
tags: [ "Arrays", "JavaScript", "Vanilla JS"]
---

In Javascript, all arrays have access to numerous methods that transform them. Some of the most useful ones include:  
`array.map`   
`array.filter`   
`array.reduce`   
`array.sort`  

Using and practicing these methods is helpful in web development, as they are often the right tool for the job. We will look at how to use each of these methods to simplify our code.

# Map
This method creates a new array with the results of a function that you provide. More simply put, it allows you to transform each individual entry in an array as you choose. 

For example, we have an array of prices for items at a store:  
```javascript
const prices = [4.75, 6.5, 3.95, 1]
```
Each of these array entries is a valid price value, however we might want to change them to formatted strings. With map, we can iterate over each item in the array and use a function to return the formatted price:  
```javascript
const formattedPrices = prices.map(price => '$' + price.toFixed(2))
````  
resulting array:  
```javascript
// formattedPrice
["$4.75", "$6.50", "$3.95", "$1.25"]
```
Map will run the given function for each entry in the array. It takes in an argument, in this case `price`, which is the value at each particular entry. The function's return value will be the new entry at that index of the array. Map, as well as the other array methods also allow us to pass in the index and the entire array which we can access.

```javascript
const numbers = [ 1,2,3,4,5]
const numbersRankings = numbers.map((number, index, array)=> {
  if(index === 0 || index === 4) {
    return number + ", outlier of an array with length " + array.length
  } else if( index=== 1 || index === 3) {
    return number + ", near the middle"
  } else if(index === 2) {
    return number + ", in the middle"
  }
})
```
returns the array:  
```javascript
[
  "1, outlier of an array with length 5", 
  "2, near the middle", 
  "3, in the middle", 
  "4, near the middle", 
  "5, outlier of an array with length 5"
]
```
By default, the first 3 variables passed in as arguments to map, or other array methods will represent (in order):  
- The current array `entry`  
- The current array `index`  
- The entire `array`   
  
regardless of what they are called. This allows you to choose the name of the array entry variable for simplicity.  
  
In the example above   
  
 `(number, index, array)`  
   
 the first value is named after the array `numbers`, while the names for index and array are left as default.

# Filter
This method is similar to map, as it returns a new array from the one provided. Filter will construct the new array with each value that returned true, ignoring the ones that returned false. 

```javascript
const states = ["Mississippi", "Texas", "Vermont", "Utah", "Wisconsin"]
const longStates = states.filter(state => state.length > 8)
```
The above example filters over the states array and returns the longStates array:
```javascript
["Mississippi", "Wisconsin"]
```
In this example, filter is called 5 times. At index 0 and 4, the return values are true (length > 8) and those entries are included in the new array. At indexes 1, 2, 3 however, the return values are false and those entries are omitted from the filtered array.

We can use the current index and given array in our function logic in addition to the value of the current entry.
```javascript
const numbers = [2, 6, 1, 4, 7]
const filteredNumbers = numbers.filter(
  (number, index, array) => number < array.length && number > index
)
```
returns the array
```javascript
[2, 4]
```
 In this example, we filtered out the 1 because it was not greater than it's index (2). We also filtered out 6 and 7 because they were not less than the length of the array (5).