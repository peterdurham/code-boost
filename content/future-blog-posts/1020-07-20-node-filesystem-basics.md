---
title: Node File System Basics
date: "2020-05-11 11:00:00"
category: "Node"
description: "Tutorial for using the node file system module to create, read, update and delete files and folders locally."
featuredImage: /img/tools_parcel_cartons.jpg
tags: ["Node", "File System", "Methods"]
---
Node.js comes with a built-in **File System** (fs) module that has all the features needed to perform CRUD operators on local files and folders. All you need to use the file system is
-Install [NodeJS](https://nodejs.org/en/download/)
-Import the fs module in a **.js** node file
&nbsp;  
If you want to follow along in the editor, create a `index.js` file to to run each of the examples. Import the fs module at the top
```javascript
const fs = require("fs");
```
We can run this file for each example using 
```bash
node index
```
The file system has a variety of methods available such as opening, editing, deleting files, etc that we can use. Each method has an **asynchronous** and **synchronous** version available to use. The shorter method name is always asychronous, while the synchronous one has **Sync** at the end.

- `fs.appendFile()` is asynchronous
- `fs.appendFileSync()` is synchronous 

Both methods generally achieve the same thing so choose the one that makes the most sense for your situation  
&nbsp;  
Here are some of the methods you can call using the **fs** module

| File system Method | What it does                      |
| ------------------ | --------------------------------- |
| appendFile         | Appends text to a file            |
| mkdir              | Creates a directory (or multiple) |
| readDir            | Reads the contents of a directory |
| readFile           | Reads a file                      |
| writeFile          | Writes text to a file             |
| unlink             | Deletes a file                    |

> Each method generally accepts a *path* or *file* string as the first argument.

## Create Files and Folders

### Create Files
To create a new file, use the `writeFile` method to write a blank string. This will create a new file if the file doesn't already exist

```javascript
fs.writeFile("new.txt", "", (err) => {
  if (err) throw err;
});
```

### Create folders
Create one or multiple nested folders using the filesystem like so

```javascript
 fs.mkdir("./folder/subfolder", { recursive: true }, (err) => {
   if (err) throw err;
 });
```

## Write to a File

There are two methods to write to a file, depending on if you want to add text or overwrite text. The first method, `writeFile` will overwrite whatever text is in a file
```javascript
 fs.writeFile("list.txt", "apples, oranges, lemons", (err) => {
   if (err) throw err;
   console.log("File saved!");
 });
```

The other method, `appendFile` will create a new file if it doesn't exist, and append text to the end if it does

```javascript
 fs.appendFile("list.txt", "apples, oranges, lemons", (err) => {
   if (err) throw err;
   console.log('Text was appended to file!');
 });
```
## Read Files and Folders

### Read a file
We can read our `list.txt` file from above with the `readFile` method
```javascript
 fs.readFile("list.txt", function (err, data) {
   if (err) {
     return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
 });
```

> Synchronous methods are sometimes easy to code for example we could shorten the above code to
```javascript
 var data = fs.readFileSync("list.txt");
 console.log("Synchronous read: " + data.toString());
```
### Read a folder
We can also read folders with the following `readdir` method
```javascript
 fs.readdir("./folder", function (err, files) {
   if (err) {
     return console.error(err);
   }
   files.forEach(function (file) {
     console.log(file);
   });
 });
```
This method will return the names of the contents of the folder, whether they are files or folders. 
## Delete Files
Lastly, we can delete files with the `unlink` method

```javascript
 fs.unlink("list.txt", function (err) {
   if (err) {
     return console.error(err);
   }
   console.log("File deleted!");
 });
```

## Making HTML and JS Files
The **fs** module is great for working with any types of text files including **.txt**, **.js**, and even **.html**. For example we can include whatever file type we need like so

```javascript
 fs.appendFile("index.html", `<!DOCTYPE html><html>
  <head>
  <title>Page Title</title>
  </head>
  <body>
  <h1>Page Heading</h1>
  </body>
  </html>`, (err) => {
   if (err) throw err;
   console.log('Text appended to the file!');
 });
```

There are plenty of cool features in the file system you can use to build out interesting applications such as editors, note-taking apps, and more.