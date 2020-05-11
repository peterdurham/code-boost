---
title: Node File System Module Basics
date: "2020-05-11 11:00:00"
category: "Node"
description: ""
featuredImage: "./sign.jpg"
tags: ["Node", "Files", "Methods"]
---
```js
var fs = require("fs");
 -appendFile (create, update)
 -mkdir (create)
 -open (read)
 -readdir (read)
 -readfile (read)
 -remove folder
 -writeFile (create, update, delete)

 //APPEND FILE ASYNCHRONOUSLY (CREATE OR UPDATE)
 fs.appendFile("message.txt", "data to append", (err) => {
   if (err) throw err;
   console.log('The "data to append" was appended to file!');
 });

 //SAME WITH CHECK FOR ERROR
 fs.open("message1.txt", "a", (err, fd) => {
   if (err) throw err;
   fs.appendFile(fd, "data to append", "utf8", (err) => {
     fs.close(fd, (err) => {
       if (err) throw err;
     });
     if (err) throw err;
   });
 });

 //ASYNC APPEND FILE
 try {
   fs.appendFileSync("message3.txt", "data to append");
   console.log('The "data to append" was appended to file!');
 } catch (err) {
   /* Handle the error */
 }

 //CREATE A DIR
  Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
 fs.mkdir("./tmp/a/apple", { recursive: true }, (err) => {
   if (err) throw err;
 });

 //READ A DIR
 console.log("Going to read directory /tmp");
 fs.readdir("/tmp/", function (err, files) {
   if (err) {
     return console.error(err);
   }
   files.forEach(function (file) {
     console.log(file);
   });
 });

 //ASYNC READ
 fs.readFile("message.txt", function (err, data) {
   if (err) {
     return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
 });

// SYNC READ
 var data = fs.readFileSync("message.txt");
 console.log("Synchronous read: " + data.toString());

 // THIS IS HOW TO WRITE FILE
 const data = new Uint8Array(Buffer.from("Hello funny guy.js"));
 fs.writeFile("message.txt", data, (err) => {
   if (err) throw err;
   console.log("The file has been saved!");
 });

 // THIS IS HOW TO WRITE FILE SYNC
 const data = new Uint8Array(Buffer.from("Hello fuawdawdwad guy.js"));
 fs.writeFileSync("message5.txt", data, (err) => {
   if (err) throw err;
   console.log("The file has been saved!");
 });

 // DELETE A FILE
 console.log("Going to delete an existing file");
 fs.unlink("message5.txt", function (err) {
   if (err) {
     return console.error(err);
   }
   console.log("File deleted successfully!");
 });
```

The Node File System (fs) module comes with all the necessary features to perform CRUD operators on local files and folders. 

## Create Files and Folders

## Write to a File

## Read Files and Folders

## Update Files 

## Delete Files

## Making HTML and JS Files
// WE CAN SIMPLY WRITE TO .HTML and .JS FILES, JSDOM / read html CROSS LINK / MOUNT??