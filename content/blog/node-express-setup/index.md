---
title: How to Setup a Basics Node/Express Application
date: "2015-05-06T23:46:37.121Z"
category: "Node"
description: "setup"
featuredImage: "./server.jpg"
tags: ["Node", "Express", "Setup"]
---

Node.js and Express are the cornerstore tools used to build Backend and Full-stack applications using JavaScript.

*Node* is a JavaScript runtime that operates outside of the browser using Chrome's V8 JavaScript engine.

*Express* is web application framework for Node.js which can be used to setup a backend API.

### What is an API
An API or *applied programming interface* is a computing interface exposed by a software program or internet services to allow third party use of its functionality. APIs can be used both *privately* and *publicy* to `consume` or `provide` data.

### Why build one?
An `API` is required to interface with most modern databases. A `Node-Express` server is able to talk with both the `client` and the `database`. This setup will allow for persistent data storage, and the ability to create a user system with `login`.

## Getting Started
In this tutorial we will be setting up a basic `Node` and `Express` application. This application will **not** be connected to a database, however it will contain all of the logic needed to perform db operations.

First, make sure you have [Node](https://nodejs.org/en/download/) installed on your computer. Next create a new project folder and navigate into it

```bash
mkdir demo-server
cd demo-server
```
In the project folder, initiate a new `node` application with the following
```bash
npm init -y
```

This will create a `package.json` file that will specify your project's `start scripts` and `dependencies`. Add the following 2 start scripts to your `package.json` file now

```json
{
  "name": "demo-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon server.js",
    "server": "node server.js"
  },
  "keywords": [],
  "author": "Peter Durham",
  "license": "ISC"
}
```

### Dependencies
As with all **JavaScript**, there is usually a 3rd party library to make your life easier. In the root of your project folder, install the following dependencies in your project

```bash
npm install express cors body-parser
```
also enter
```bash
npm install --save-de nodemon
```

| Package       | Description                         |
| ------------- | ----------------------------------- |
| `express`     | **web framework for HTTP requests** |
| `body-parser` | **node body-parsing middleware**    |
| `cors`        | **middleware to allow CORS**        |
| `nodemon`     | **restarts dev server on save**     |

There are plenty of other useful packages in `node` development, however this will be enough to setup a simple server.

### Server
Now that we have our start `scripts` ready and our `depencies` installed, we can setup our `server` code. In `server.js` add the following

```javascript
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const movies = require("./api/movies");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/movies", movies);

const port = process.env.PORT || 5000;
server = app.listen(port, () => console.log(`Server running on port ${port}`));
```

At the top we import our dependencies and routes (explained soon). We also intialize the express application with `app`. The next few lines apply the middleware (boilerplate code) and specify where the *movies* route exists. Lastly, we specify the port which is 5000 in development for us. Lastly we setup the server, which will listen to the routes we specified to make HTTP requests.

### Creating API Routes

Next, create a folder called `api` with a `movies.js` file in it. This file will contain our server's *endpoints* or *routes*. Add the following code to the `movies.js` file

```javascript
const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "server works" }));

// @ route GET api/movies
// @ Get Movies (public)
router.get("/", (req, res) => {
  res.json({ movies: "array of movies" });
});

// @ route POST api/movies
// @ Add Movie (public)
router.post("/", (req, res) => {
  res.json({ movies: "movie added" });
});

// @ route DELETE api/movies
// @ Delete Movie (public)
router.delete("/", (req, res) => {
  res.json({ movies: "movie deleted" });
});

module.exports = router;
```

With that we should be able to access our application in the browser. Enter the following start script
```bash
npm run dev
```
and open up the browser at `http://localhost:5000/api/movies/test` to see if it is working correctly.

## Setup a frontend (React)
We can also setup a frontend application to interface with out application using **React**. Create an application now using

```bash
npx create-react-app demo-client
cd demo-client
```
### Proxy
Since we are using the same machine for both `servers` while in `development` mode, we can use a `proxy`. In the demo-client's `package.json` add the following *proxy* entry

```json
...
"proxy": "http://localhost:5000",
...
```

### Clientside Requests
Next, open `app.js` in your react application and add the following

```jsx
App
```

## Next Steps - Database
This tutorial was meant to be a basic introduction to how `Express` servers work, and how you can use them to setup APIs. There are numerous options you can use for databases including SQL and mongoDB. Check out this [full stack setup](https://code-boost.netlify.com/full-stack-react-node/) tutorial to create a `full-stack` application with **React** and **Node**. 