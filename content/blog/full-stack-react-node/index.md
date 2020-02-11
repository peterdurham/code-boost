---
title: Full-stack React and Node Basic Setup (MERN)
date: "2015-05-06T23:46:37.121Z"
category: "React"
description: "setup"
featuredImage: "./croatia.jpg"
tags: ["React", "Node", "Full-stack"]
---

This tutorial is meant to help you create a basic working Full-stack application using React and Node.js. Before we get started, make sure you have Node JS installed on your computer.

If you would like to host your application on the web, you will need to sign up for
- Github (code repository)
- Netlify (React frontend host)
- MongoDB Atlas (Database hosting)
- Heroku (Node backend host)

Each of these services has a free tier which will be sufficient to get the application live and running.

### Folder structure
There are numerous ways we could setup our application. In this tutorial, we will be hosting the frontend (client) and backend (server) separately.

To get started, create a folder with your project name
```bash
mkdir fullstack-app
```
## Backend (Server) Setup

Our backend will be a `Node.js` application. First, we will create a folder and then initialize the app. Enter the following in your terminal

```bash
mkdir backend
cd backend
npm init -y
```

The command `npm init -y` will create a file named `package.json`. This file will keep track of our dependencies , scripts, among other things. 

In the `backend` directory create the following folders and files 
```
-backend
-\config
---keys_dev.js
---keys_prod.js
---keys.js
-\models
---Book.js
-\routes
--\api
----books.js
-.gitignore
-server.js
```

### Dependencies
Dependencies are 3rd party javascript code that we can use to simplify our development process. We can add our dependencies with

```bash
npm install --save express mongoose body-parser
```
then
```bash
npm install --save-dev nodemon
```
In our first command, we added normal dependencies, noted by the optional `--save` flag. These dependencies are necessary code to be serveed our node application in production.

The second command uses the `--save-dev` flag, denoting it as a developer dependency. These types of packages are not included the production application, but are useful when developing. 

### Scripts
Scripts are commands that we can enter in the terminal to interact with our application. These will mostly be used to start or test the application. Include `"server": "nodemon server.js"` in your `scripts` object of `package.json`. You can run this script by entering `npm run server` when in the `backend` folder in your terminal.

Your `package.json` file should now look include the following:

```javascript
"scripts": {
  "server": "nodemon server.js"
},
"dependencies": {
  "body-parser": "^1.19.0",
  "express": "^4.17.1",
  "mongoose": "^5.8.11"
},
"devDependencies": {
  "nodemon": "^2.0.2"
}
```

### Server
In the `backend` folder, next create a file called `server.js`. This file will be the one that is run initially when you call the `start` script using `npm run server`. This code will not change very much between projects, though it is useful to understand what each line does. Include the following in your `server.js` file

```javascript
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// imports the API from the routes/api folder
const books = require("./routes/api/books");

// initializes the express application
const app = express();

// converts API responses to JSON for easy use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// imports our database credentials (stored separately for security)
const db = require("./config/keys").mongoURI;

// initializes our database using the credentials
mongoose.set("useFindAndModify", false);
mongoose
  .connect(db)
  .then(() => console.log("Mongo Database connected"))
  .catch(err => console.log(err));

// creates a route where we can interact with our API
app.use("/api/books", books);

// sets the port number depending if we are in production or development
const port = process.env.PORT || 5000;

// intializes the server and logs a message
server = app.listen(port, () => console.log(`Server running on port ${port}`));
```

For this tutorial, we will have only 1 API endpoint at `/api/books`. This means that when we visit our server at `http://localhost:5000/api/books` we will be able to access the routes we will soon create. If you wish to make additional routes, you should import and add them here just like we did with *books*.

### Database credentials
Once you have signed up for a free mongodb atlas account, copy the connection string for your application.

Add the following to `keys.js`

```javascript
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
```

We referenced this file in the `server.js` above to get our database credentials. If we are in development, this file will call `keys_dev.js` whereas if we have hosted our application (production) it will call `keys_prod.js`.

Add the following to `keys_prod.js` for when we host our `Heroku` application later
```javascript
module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY
};
```

In `keys_dev.js` you will paste your connection string from *mongodb atlas*
```javascript
module.exports = {
  mongoURI:
    "mongodb+srv://paste-your-connection-string-here",
  secretOrKey: "secret"
};
```
Your connection string will not include your password, but instead have `<pass>` which you must replace with your user password. 

This file must not be commited to github, or anywhere publically visible. To avoid this, we will immediately add the following to the `.gitignore` file in our project directory

```
config/keys_dev.js
node_modules/
```

When we later commit our project to github, this file will instruct git not to include the file with our database credentials or our third party dependencies.

### Database Models
In order to interact with mongoDB, we must first tell it the structure of the data we want to be working with. Each entry into our database will have a `title`, `author`, and `description` all which will be required fields. If we want to save new details about our books such as year published, or an image URL, we will have to add it here. In `/models/Book.js` add the following

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = Book = mongoose.model("book", BookSchema);
```
## API Routes
Lastly for our server to get up and running we will need to create our API. This is an applied programming interface, or a recipe for the things we can get/post to our database. Add the following to `books.js` in `/routes/api`

```javascript
const express = require("express");
const router = express.Router();

const Book = require("../../models/Book");

router.get("/test", (req, res) => res.json({ msg: "backend works" }));

// @route GET /api/books
// @desc Get books (public)
router.get("/", (req, res) => {
  Book.find()
    .then(info => res.json(info))
    .catch(err => res.status(404).json({ msg: "no books found" }));
});

// @route POST /api/books
// @desc Create new book (public)
router.post("/", (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description
  });

  newBook.save().then(info => res.json(info));
});

// @route DELETE /api/books
// @desc Delete book (public)
router.delete("/", (req, res) => {
  Book.findOneAndRemove({ _id: req.body.id }).then(() => {
    res.json({ success: true });
  });
});

// @route UPDATE /api/books/update/:id
// @desc Update book (public)
router.post("/update/:id", (req, res) => {
  Book.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
      }
    },
    { new: true }
  )
    .then(info => {
      res.json(info);
    })
    .catch(err => res.status(400).json({ msg: "update failed" }));
});

module.exports = router;
```

This file contains the majority of our server logic. Here we can decide what happens when we visit each of the defined endpoints. This file contains a `test` route along with routes to `Create`, `Read`, `Update`, and `Delete` books in our database.

Each endpoint includes the `HTTP` method to use, the specific `route` to use it on, and how to interact with the database when that route is accessed. `req` stands for `request` and has data passed along from the client while `res` stands for `response` and specifies which information will be passed back to the client. `Book` refers to the `mongoose` data model we setup previously.

It is useful to understand this code, as it can be easily used as building blocks for setting up different endpoints.

### Testing the server

Now that our server code is complete we can start the server by navigating to the `backend` folder and entering the command `npm run server`. If the server was setup without error, you should see the string `Mongo Database connected` that we included in our `server.js` file.

Open your browser and navigate to `http://localhost:5000/api/books/test` to access our `test` route and ensure that your server is working properly.

## Frontend Setup (React)