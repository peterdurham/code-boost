---
title: Using the Date Object and Methods in JavaScript
date: "2020-02-20T23:46:37.121Z"
category: "JavaScript"
description: "Use the Date API in JavaScript to create and read dates. Explains epoch time and date methods."
featuredImage: "./stonehenge.jpg"
tags: ["Dates", "JavaScript"]
---

In JavaScript, we can create and store dates using the **Date** object. By creating a new instance of this object, we can save the current time to a variable. This object gets used often in web applications for things like placing an order or logging in to an application. An instance of the **Date** object is created and stored to a database or in a cookie.

## Find the Current Date

```javascript
const date = new Date();
console.log(date);
```

```terminal
>> Sun Feb 02 2020 08:17:01 GMT-0800 (Pacific Standard Time)
```



## Epoch Time

When a date object is created, JavaScript stores this information as a **Unix Epoch Time**. This is the number of *milliseconds* that have elapsed since January 1st, 1970. This concept is useful to understand and practice, as date math is often done in this format.  

&nbsp;

It is also possible to create a date object for a different time than right now by passing in an Epoch Time as the argument when creating a new date object

```javascript
const exampleDate = new Date(31567796000);
console.log(exampleDate);
```

```terminal
>> Fri Jan 01 1971 00:49:56 GMT-0800 (Pacific Standard Time)
```



Any time between roughly -271,000 BCE and 275,000 CE can be set using the date object.

## Passing in Date Values

Alternatively we can **create** dates given a *date string* or by passing in current *date values* in the date creation. Both examples below will return approximately the same date as the one above.

```javascript
const usingDateString = new Date("January 01 1971 00:49");
// string argument is "Month day year time"

const usingDateValues = new Date(1971, 0, 1, 0, 49, 0, 0);
// values argument is year, month, day, hour, minute, second, ms
```

### Date Method Syntax

Logging the date alone will give us plenty of information, however there are methods we can use to display **individual** pieces of data for logging or output. The following will save the current year to a variable

```javascript
const year = new Date().getFullYear();
```

## Get / Set Methods

### Get

The following are some useful methods available to a **date instance**. This should be enough to represent any time or date. Not all methods are intuitive, for example **getDay** and **getMonth** are both *zero-indexed* instead of starting from 1 like **getDate**.  

| Date Method       | Description            | Range           |
| ----------------- | ---------------------- | --------------- |
| getTime()         | **Epoch Time**         | 13 digit number |
| getDate()         | **Current Date**       | 1-31            |
| getDay()          | **Day of Week**        | 0-6             |
| getFullYear()     | **Current Year**       | 4 digit number  |
| getMonth()        | **Current Month**      | 0-11            |
| getMinutes()      | **Current Minute**     | 0-59            |
| getSeconds()      | **Curent Second**      | 0-59            |
| getMilliseconds() | **Current Millsecond** | 0-999           |

### Set

For each of the *get* methods, we also have access to a corresponding *set* method. This can be useful when you need to update a date object, or have a particular time to set.

```javascript
const date = new Date();
date.setFullYear(-250000);
console.log(date);
```

```terminal
>> Wed Feb 02 -250000 09:33:00 GMT-0752 (Pacific Standard Time)
```



## Using Locale Date Strings

Sometimes converting the date object to a simple Date and/or Time string will suffice. The following date methods will convert your date object to a more readable version.

| Date Method              | Description   | Example              |
| ------------------------ | ------------- | -------------------- |
| **toLocaleString()**     | Time and Date | 2/2/2020, 8:38:33 AM |
| **toLocaleTimeString()** | Current Time  | 8:38:33 AM           |
| **toLocaleDateString()** | Current Date  | 2/2/2020             |

### Adding and Subtracting Dates

A combination of the `get` and `set` methods of time can be used to change dates. For example

```javascript
const date = new Date();
console.log(date);
// Sun Feb 02 2020 20:00:11 GMT-0800 (Pacific Standard Time)

date.setHours(date.getHours() - 10);
console.log(date);
// Subtracted 10 hours
// Sun Feb 02 2020 10:01:25 GMT-0800 (Pacific Standard Time)


date.setMonth(date.getMonth() + 5);
console.log(date);
// Added 5 months
```

```terminal
>> Thu Jul 02 2020 10:01:25 GMT-0700 (Pacific Daylight Time)
```

### Library Considerations

The JavaScript API for dates is powerful enough to make all sorts of calculations on your own. By simply creating a new date object instance, you can keep track of and display time data in your applications. If you are looking to add a library to do the heavy lifting **Date-fns** and **Moment** are both popular choices.