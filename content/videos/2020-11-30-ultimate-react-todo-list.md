---
templateKey: video-post
videoID: EbnmosN64JQ
title: Ultimate React Todo List - Complete, Edit, Delete, and Store
slug: ultimate-react-todo-list
date: 2020-11-30T15:00:00.000Z
dateModified: 2020-11-30T15:00:00.000Z
description: Comprehensive tutorial for making a React todo list using Hooks. Learn how to create, display, delete, complete, edit, save, and load todos. Great beginner web development tutorial when first learning React.
featuredPost: false
category: React
tags:
  - Todo List
  - React
  - Hooks
  - Basics
featuredImage: /img/tools_parcel_cartons.jpg
---

Comprehensive tutorial for making a React todo list using Hooks. Learn how to create, display, delete, complete, edit, save, and load todos. Great beginner web development tutorial when first learning React.

### Todo List Code:

## React App.js Component Code

```jsx
import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
```

## App.css Styles Code
```css
h1 {
  text-align: center;
}
#todo-list {
  width: 500px;
  margin: 60px auto;
}
form, .todo {
  border: 1px solid grey;
  padding: 10px 20px;
  margin-bottom: 10px;
}
form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
form input {
  padding: 4px 8px;
  flex-grow: 1;
  margin-right: 16px;
}
.todo {
  display: flex;
  flex-direction: column;
}

button {
  font-size: 16px;
  background-color: rgb(217, 60, 35);
  color: #fff;
  border-radius: 8px;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}
button:hover {
  background-color: rgb(173, 47, 28);
}
button:active {
  background-color: rgb(130,35,21);
}
button:focus {
  outline: 0;
}
input[type='text'] { font-size: 20px; font-family: monospace; }
.todo input[type="checkbox"] {
  transform: scale(1.8) translateY(1px);
  margin: 0 16px 0 0;
  cursor: pointer;
}
.todo-text input {
  padding: 4px;
}
.todo-text {
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}
.todo-completed {
  display: flex;
  margin: 10px 0;
}
.todo-actions {
  display: flex;
  justify-content: space-between;
}
```