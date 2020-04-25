---
title: How To Use JavaScript ES Modules Import and Export
date: "2015-05-06T23:46:37.121Z"
category: "JavaScript"
description: "Basic overview on how to import and export in JavaScript using the ES Modules and Common JS."
featuredImage: "./cubes.jpg"
tags: ["JavaScript", "Import/Export", "Methods"]

---

JavaScript projects very often have multiple **.js** files, making it necessary to be able to access code from one file in another. Bundlers such as **Webpack** and **Parcel** are able to collect all of this code into a single or several machine readable files.  

  &nbsp;  

The JavaScript ecosystem has two main syntaxes for **import** and **export**. They are: *ES6 Modules* and *CommonJS*. **ES6 modules** are used in frontend development including *React* while **CommonJS** has been the standard for *NodeJs* Backend development.

## ES Modules Syntax

**ES modules** syntax has been around since 2015 with **ES6** and is currently the standard for frontend web projects. JavaScript variables can be exported individually using named exports and a single default export can be declared in each JavaScript file.

Any variables in JavaScript can be export and imported with the following syntax

### Named Imports / Exports

Exporting **named** modules In-line

```javascript
export const multiplier = 1.3674;
export const person = { name: "Fred" };
export const sayHello = () => console.log("Hello!");
```

*Or* Exporting **named** modules at the Bottom

```javascript
const multiplier = 1.3674;
const person = { name: "Fred" };
const sayHello = () => console.log("Hello!");

export { multiplier, ids, person, sayHello }
```

Importing **named** modules at the Top

```javascript
import { multiplier, person, sayHello } from "./data";
```

These *named* import modules must be imported in brackets with the specified named. If you are export multiple modules from a single file it often makes sense to use named imports.

### Default Imports / Exports

Each `.js` file has one **default** export that can be called whatever you like when imported. Default imports can have any name a JavaScript variable can have, and it does not matter if they are even named in the file they are exported from.

Exporting **default** modules inline

```javascript
export default const dataIds = [319, 523, 624];
```

*Or*, Exporting a **default** anonymous module.

```javascript
export default [319, 523, 624];
```

*Or*, Exporting **default** modules at the Bottom

```javascript
const dataIds = [319, 523, 624];

export default dataIds;
```

Importing **default** modules at the Top

```javascript
import ids from "./data";
```

Default modules must be imported *without* brackets.

### Import Alias

Every named import can be *renamed* by importing a modules **as** another variable using import aliases. Here is an example of using aliases in combination with both *named* and *default* imports.

```javascript
import ids, { multiplier as scalar, person } from "./data";
```

### Import All

We can also import every exported module from a given file with the following import syntax

```javascript
import * as Info from "./data";
```

If we `console.log(Info)` here we will see how module exports are stored in an object format

```bash
{default: Array(3), multiplier: 1.3674, person: {…}, __esModule: true, sayHello: ƒ}
```

You can see above that the **default** property is the first in our import object. This property gets named whatever we call it on import (again *without* brackets). Each property after that is a **named** property and can otherwise be imported only with brackets. Default imports can be named on the spot whereas named imports must be aliased to choose their name.

## CommonJS Syntax

CommonJS is very similar to ES Modules with the major differences between in the naming syntax, using `const` and `require()` , instead of `import` and `from` like we used earlier.