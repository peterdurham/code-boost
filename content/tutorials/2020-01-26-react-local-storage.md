---
templateKey: blog-post
title: How to Save Data with Local Storage in React
slug: react-local-storage
date: 2020-01-26T19:00:00.000Z
dateModified: 2020-01-26T19:00:00.000Z
description: Learn how to use localStorage to save data to your browser's
  memory. Data persists beyond page load like a database.
featuredPost: false
category: React
tags:
  - React
  - Code Along
  - Browser
featuredImage: /img/react_local_storage_container.jpg
---
As a library, React is great for displaying data on the front end. This data will not persist when the page refreshes however, so we will need to setup a data store of some kind. Modern web browsers allow us to store and retrieve strings of data using the browser’s built in `setItem` and `getItem` methods.

### Store data in the browser

The `setItem` method on the `localStorage` object receives two arguments: **name** and **content** strings.

```javascript
localStorage.setItem("message", "saved in browser storage");
// sets the value of "message" to be "saved in browser storage"

console.log(localStorage.getItem("message"));
```

```terminal
>> saved in browser storage
```

`localstorage` only works with strings, so we will need to convert more complex data into `JSON` or Javascript Object Notation. We can store arrays and objects in `localStorage` once they have been converted to `string` or `JSON` values.

&nbsp;

Using these methods we can directly imitate more complicated or involved data stores such as a database. `localStorage` is local to your machine, so whatever data you save to the browser will not be visible to other users of your application. This doesn't necessarily help us for building full production apps, but for learning and development it is a very useful.

&nbsp;

In this tutorial, we will be building a basic note taking app which can *add*, *delete*, and *edit* notes. This app will give us some interesting cases for when and how we might use `localStorage` in React.

## React Tutorial Start

To get started, we will make a new application with `create-react-app`. Make sure you have [Node](https://nodejs.org/en/) installed (if not download it).

&nbsp;

To build the project files, type the following command in your terminal:

```bash
npx create-react-app note-taking-demo
```

Once our project is built we can do some quick cleanup of `App.js` so it looks like this:

```jsx
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>localStorage Demo</h1>
    </div>
  );
};

export default App;
```

You'll notice we imported `useState` and `useEffect` at the top of this file. We will be using these hooks to store our *state*, and update the browser's *local storage*. You can learn more in this [Hooks basics tutorial](/react-hooks-basics).

### Adding Notes

In order to add notes we will need:

- an `input` box for the user to type in
- a `submit` button to add new notes
- some methods which update our state

### Form Inputs

In our return `JSX` we can add the following below our `h1` tag:

```jsx
<form onSubmit={addNote}>
  <input type="text" name="note" />
  <input type="Submit" />
</form>
```

### Hooks and Methods

To get the inputs working, we will need to use the `useState` hook to store our notes along with creating the `addNote` function. Add the following state hooks to your `App` component just below the `class` declaration.

```jsx
const [notes, setNotes] = useState([]);
const [noteEditing, setNoteEditing] = useState("");
```

- `notes`: an array of our notes, each note will be an **object**
- `noteEditing`: the **id string** of the note we are editing 

Also add a `addNote` method below the hooks

```javascript
const addNote = (e) => {
  e.preventDefault();
  const newNote = {
    id: Math.random().toString(36).substr(2, 9),
    text: e.target.note.value,
  };
  setNotes([...notes, newNote]);
  e.target.note.value = "";
};
```

This method wil be called by the *onSubmit* handler on our form. It will create a `newNote` object with an **id** and **text** properties. We can add this object to the current list of notes using the *spread* operator and `Math.random`. We then call `setNotes` to update our `notes` variable. We also reset the input after the submit logic has occured by setting `e.target.note.value` to `""`.

&nbsp;

We’ve now set up our adding notes functionality. You can start the server to test it out with the command

```bash
npm start
```

If you open the React devtools in your browser, you can see that the `notes` array in our application state stores our input data.


### Displaying Notes

To show the data in browser, we can simply map the `notes` array from our state in our return `jsx` below our submit button:

```jsx
{
  notes.map((note) => <div key={note.id}>{note.text}</div> )
}
```

### Deleting Notes

Before we set up `localStorage` it would also be nice to add some *delete* functionality for our notes. We can use the following method in our component to delete notes, based on their index:

```jsx
const deleteNote = (idToDelete) => {
  const filteredNotes = notes.filter((note) => note.id !== idToDelete);
  setNotes(filteredNotes);
};
```

In this method we filter the note with the index of `idToDelete` out of our notes array and save the result using the `setNotes` hook. We can also connect it to a button in our `notes` mapping inside our return method. Our new map statement will have an added button with an `onClick` that triggers our `deleteNote` function, passing in the `index` from the map function. Replace the map statement from earlier with:

```jsx
{notes.map((note) => (
  <div key={note.id}>
    <div>{note.text}</div>              
    <button onClick={() => deleteNote(note.id)}>delete</button>
  </div>
))}
```

Try out the application now, we are able to add and delete notes. This is a good time to use `localStorage` to store our `notes` array in the browser!

## Saving and Loading Notes

Before we jump into the code lets look at a few methods we will be using in our `localStorage` calls:

- `JSON.parse` converts JSON data from localStorage into a javscript variable
- `JSON.Stringify` converts javascript variables we want to save into JSON
- `useEffect` hook to trigger our save and load functions

### Saving to localStorage

Each time a note is added or deleted, we would like to save our changes to the browser’s `localStorage`. We can do this by using the `useEffect` hook to compare our application's previous state with its current state. Add the following lifecycle method below your state declaration:

```jsx
useEffect(() => {
  const json = JSON.stringify(notes);
  localStorage.setItem("notes", json);
}, [notes]);
```

This hook will automatically run only when the `notes` variable in state changes. First we will turn our notes into a string with `JSON.stringify`, then we will use `setItem` to set the notes to their new value.

### Loading from localStorage

Loading notes will be very similar. Any data that was persisted to the browser’s `localStorage` when we saved, needs to be loaded when the page refreshes. In order to achieve this, we can add another `useEffect` hook

```jsx
useEffect(() => {
  const json = localStorage.getItem("notes");
  const savedNotes = JSON.parse(json);
  if (savedNotes) {
    setNotes(savedNotes);
  }
}, []);
```

Here the empty array `[]` we are passing as the second argument to our hook indicates that this function should only run on the *first* render of this component. This hook doesn't run again after that because it is listening for *no state variables to change*. Inside the function, we are using `getItem` to retrieve the JSON notes data we stored. Next, we parse the data into a notes array variable. Lastly, we must check if there are any notes in the browser, as we only want to set the state if so.

### Editing Notes

Editing notes is going to be slightly more tricky then adding or deleting notes. We need to display a text box for the user to edit the note in, and we should also add a button for the user to indicate when they are finished. Add the following `submitEdits` function to your component

```javascript
const submitEdits = (event, idToEdit) => {
  event.preventDefault();
  const updatedNotes = notes.map((note) => {
    if (note.id === idToEdit) {
      return {
        id: note.id,
        text: event.target.note.value,
      };
    } else {
      return note;
    }
  });
  setNotes(updatedNotes);
  setNoteEditing("");
};
```

This method will fire when the user clicks submit after editing a note. This will map the `notes` array, returning every note *except* the one to be updated, which it changes the `text` content of. The notes array will be updated with the `setNotes` hook, and `setNoteEditing` will be reset to `""` since we are no longer editing once submitted.

### Conditional Editing Form

For the display portion of our editing feature, we will be conditionally rendering an text area if the note is selected for edit, and the note otherwise. Replace our previous `notes` mapping from above with the following code:

```jsx
{notes.map((note) => (
  <div key={note.id}>
    {note.id !== noteEditing ? (
      <div>{note.text}</div>
      ) : (
      <form onSubmit={(e) => submitEdits(e, note.id)}>
        <textarea name="note" defaultValue={note.text}></textarea>
        <button type="Submit"> Submit Edits</button>
      </form>
    )}
    <button onClick={() => deleteNote(note.id)}>delete</button>
    <button onClick={() => setNoteEditing(note.id)}>edit</button>
  </div>
))}
```

Here we call `setNoteEditing`  when the edit button is clicked beside a note, passing in the `event` and `index`. This method will set `noteEditing` to be the note's `index`  which will display an input box instead of the note's contents.

### Adding Styles

Lastly, we can add some basic styles to round out the application. Add your own styles or replace the contents of `App.css` with the following:

```css
.App {
  text-align: center;
}
```

We did it! `localStorage` is working, and we now have a fully featured note taking app that behaves very similarly to if it had been built with a database. The best part about `localStorage` is the code is very easy to reuse. As long as you have a variable to save and load you can copy the  `useState` hooks from one project to the next, changing variable names and conditional logic. Understanding `localStorage` is also useful because many authentication methods utilize it to hold session tokens for login.
