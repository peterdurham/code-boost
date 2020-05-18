---
templateKey: blog-post
title: How to Setup a Basic Node/Express Application
slug: node-express-setup
date: 2020-03-11T18:00:00.000Z
dateModified: 2020-03-11T18:00:00.000Z
description: Tutorial for setting up a Node Express application server. Learn
  how to setup and develop an API.
featuredPost: false
category: Node
tags:
  - Node
  - Express
  - Setup
featuredImage: /img/node_express_server.jpg
---
**Node.js** and **Express** are the cornerstore tools used to build Backend and Full-stack applications using JavaScript.  

&nbsp;

*Node* is a JavaScript runtime that operates outside of the browser using Chrome's V8 JavaScript engine.  

&nbsp;

*Express* is web application framework for Node.js which can be used to setup a backend API.  

### What is an API

An API or *applied programming interface* is a computing interface exposed by a software program or internet services to allow third party use of its functionality. APIs can be used both *privately* and *publicy* to `consume` or `provide` data.

### Why build one?

An `API` is required to interface with most modern databases. A `Node-Express` server is able to talk with both the `client` and the `database`. This setup will allow for persistent data storage, and the ability to create a user system with `login`.

> Note: This tutorial will show you how to setup a basic Exprses Server and connect it to a React application but does not connect with any databases. Check out this [Full stack tutorial](/full-stack-react-node/) if you want to connect your app with a database. This tutorial is a good overview if you are new to full-stack development.

## Getting Started

In this tutorial we will be setting up a basic `Node` and `Express` application. This application will **not** be connected to a database, however it will contain all of the logic needed to perform db operations.

&nbsp;

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
  "scripts": {
    "dev": "nodemon server.js",
    "server": "node server.js"
  },
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
  console.log(req.body.title, "movie added")
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

#### Axios

Also install the package `axios` which simplifies **HTTP** requests

```bash
npm install axios
```

### Clientside Requests

Next, open `app.js` in your react application and add the following

```jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);

  // On Component Mount
  useEffect(() => {
    getMovies();
  }, []);

  // Create
  const onSubmitBook = async e => {
    e.preventDefault();
    const { movie } = e.target;
    await axios.post("/api/movies", {
      title: movie.value
    });
    movie.value = "";
    getMovies();
  };

  // Read
  const getMovies = async () => {
    const res = await axios.get("/api/movies");
    const data = res.data;
    setMovies(data.movies);
  };
  if (movies.length === 0) return <div>loading...</div>;
  return (
    <div className="App">
      <div>{movies[0]}</div>
      <form onSubmit={e => onSubmitBook(e)}>
        <label htmlFor="movie">Movie Title:</label>
        <input type="text" name="movie" />
        <button>Add Movie</button>
      </form>
    </div>
  );
}
export default App;
```

Next run the `demo-client` application while `demo-server` is running (port 5000) using

```bash
npm start
```

### Applications Connected

If you open the browser for your clientside application you will see that the message `"array of movies"` was sent from the `express` API. If you try typing in the name of a movie and submit you will be able to view the browser input in your already running `demo-server` terminal. The `demo-server` **Node** server is communicating with the `demo-client` **React** client.

## Next Steps - Database

This tutorial was meant to be a basic introduction to how `Express` servers work, and how you can use them to setup APIs. There are numerous options you can use for databases including SQL and mongoDB. Check out this [full stack setup](/full-stack-react-node) tutorial to create a `full-stack` application with **React** and **Node**. 