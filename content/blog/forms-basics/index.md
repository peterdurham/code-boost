---
title: Basic use of Forms in React
date: "2015-05-06T23:46:37.121Z"
category: "React"
description: "setup"
featuredImage: "./notre-dame.jpg"
tags: ["React", "Forms"]
---

Forms are essential for allowing user input on a webpage. In order to setup a basic form in React, first create a new project using **create-react-app** (or whichever build tool you prefer)

## Two-way data binding

We will start with a simple input that reflects it's value in state using the `onChange` handler. In your `App` Component include the following

```jsx
import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");

  return (
    <div className="App">
      <input onChange={e => setName(e.target.value)} value={name} />
      <div>{name}</div>
    </div>
  );
}
export default App;
```

In this example, we are using a React functional component with the `useState` hook to update the name value whenever the input box is changed. When an input event occurs, we can pass an **event** object (or **e** for short) to our setter method. We should also bind the name here to the `value` property in case there is a default value or side effect that changes it.

`e.target.value` refers to the current value of the input, after the key is pressed. The *name* is then reflected in the div below the input.

This is a basic example of how React can work using an input, however for more complex examples, we may want to use a `form` element.

## Form element example

```jsx
import React, { useState } from "react";

const App = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    location: ""
  });

  const onSubmitForm = event => {
    event.preventDefault();
    // const name = event.target.name.value;
    // const age = event.target.age.value;
    // const location = event.target.location.value;
    const { name, age, location } = event.target;
    setData({
      name: name.value,
      age: age.value,
      location: location.value
    });
  };

  return (
    <div>
      <form
        onSubmit={e => onSubmitForm(e)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="name">name:</label>
        <input type="text" name="name" />

        <label htmlFor="age">age:</label>
        <input type="number" name="age" />

        <label htmlFor="location">location:</label>
        <input type="text" name="location" />

        <input type="Submit" />
      </form>
      <div>
        <h2>data</h2>
        <p>name: {data.name}</p>
        <p>age: {data.age}</p>
        <p>location: {data.location}</p>
      </div>
    </div>
  );
};

export default App;
```

In this component, the `form` element wraps our input tags and captures their inputs during the `onSubmit` event. Here we have 3 `text` (or `number`) input elements along with a `Submit` or button element. The form element listens for a `Submit` event (such as a button click) from any of its children, then passes up all of the input data in a process called **event bubbling**.

When our `onSubmitForm` method is called, we have access again to the **event** object. The default behavior is for an html page to reload whenever a form is submitted, however since we are using React we should call `event.preventDefault()` to stop the page refresh.

We now have access to each of our input values on the `event.target` object. I have commented out the longhand version and instead destructured the `event.target` object into separate variables

```jsx
const { name, age, location } = event.target;
```

Next we pass along the values of these variables to our setter method to store the inputs in state. With this data now accessible we can output it to the screen as in the example.





