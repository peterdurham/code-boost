---
title: Using The Date object and methods in JavaScript
date: "2015-05-06T23:46:37.121Z"
category: "JavaScript"
description: "setup"
featuredImage: "./stonehenge.jpg"
tags: ["Dates", "JavaScript", "Vanilla JS"]
---

In JavaScript we have access to the `Date` object for any code relating to time. By calling a new instance of this object, we can store the current time in a variable.

## Creating Date Objects

### Current Date

```javascript
const date = new Date()
// store the current date in 'date' variable

console.log(date)
// Sun Feb 02 2020 08:17:01 GMT-0800 (Pacific Standard Time)

```

### Epoch Time
When a date object is created, JavaScript stores this information as a Unix Epoch Time. This is the number of milliseconds that have elapsed since January 1st 1970. It is useful to understand and practice this concept, as date math can often be done in this format.

It is also possible to create a date object for a different time than right now by passing in an Epoch Time as the argument when creating a new date object

```javascript
const oneYearLater = new Date(31567796000)
console.log(oneYearLater)
// Fri Jan 01 1971 00:49:56 GMT-0800 (Pacific Standard Time)
```
Any time between roughly -271,000 BCE and 275,000 CE can be set using the date object.

### Date String and Values
Alternatively we can create dates given a `date string` or by passing in current `date values` in the date creation. Both examples below will return approximately the same date as the one above.

```javascript
const usingDateString = new Date("January 01 1971 00:49")
// date string argument is "Month day year time"

const usingDateValues = new Date(1971, 0, 1, 0, 49, 0, 0)
// date values argument is year, month, day, hour, minute, second, millisecond
```


## Date Methods
Logging the date alone will give us plenty of information, however there are numerous methods to display individual pieces of data for logging or output. 

Each of the following example variables will return the current year

```javascript
const date = new Date()
console.log(date.getFullYear())

const year = new Date().getFullYear()
console.log(year)
```

### Get Methods

The methods available are not entirely uniform, though you can definitely find (or create) everything needed to represent a certain time. Here are some of the most useful methods

| Date Method           | Description            | Range           |
| --------------------- | ---------------------- | --------------- |
| `getTime()`           | **Epoch Time**         | 13 digit number |
| `getDate()`           | **Current Date**       | 1-31            |
| `getDay()`            | **Day of Week**        | 0-6             |
| `getFullYear()`       | **Current Year**       | 4 digit number  |
| `getMonth()`          | **Current Month**      | 0-11            |
| `getMinutes()`        | **Current Minute**     | 0-59            |
| `getSeconds()`        | **Curent Second**      | 0-59            |
| `getMilliseconds()`   | **Current Millsecond** | 0-999           |

Most of the methods are intuitive, with the exception of `getDay()` and `getMonth()`. These methods are zero indexed and can often be 1 off from what you would expect (0 is Sunday and 0 represents the 1st of the month).

### Set Methods
For each of the *get* methods, we also have access to a corresponding *set* method. This can be useful when you already have a date object, and need to adjust a particular value.

```javascript
const date = new Date();
date.setFullYear(-250000)
console.log(date)
// Wed Feb 02 -250000 09:33:00 GMT-0752 (Pacific Standard Time)
// not quite dinosaurs
```

### String Conversion
Sometimes converting the date object to a simple Date and/or Time string will suffice. The following date methods will convert your date object to a more readable version.

| Date Method            | Description            | Example              |
| ---------------------- | ---------------------- | -------------------- |
| `toLocaleString()`     | **Time and Date**      | 2/2/2020, 8:38:33 AM |
| `toLocaleTimeString()` | **Current Time**       | 8:38:33 AM           |
| `toLocaleDateString()` | **Current Date**       | 2/2/2020             |

### Adding and Subtracting Dates

A combination of the `get` and `set` methods of time can be used to change dates. For example

```javascript
const date = new Date()
console.log(date)
// Sun Feb 02 2020 20:00:11 GMT-0800 (Pacific Standard Time)

date.setHours(date.getHours() - 10)
console.log(date)
// Sun Feb 02 2020 10:01:25 GMT-0800 (Pacific Standard Time)

date.setMonth(date.getMonth() + 5)
console.log(date)
// Thu Jul 02 2020 10:01:25 GMT-0700 (Pacific Daylight Time)
```

### Conclusion
The JavaScript API for dates is powerful enough to make all sorts of calculations on your own. By simply creating a new date object instance, you can keep track of and display time data in your applications.