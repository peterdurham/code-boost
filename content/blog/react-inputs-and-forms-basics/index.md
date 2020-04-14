---
title: How to Handle Inputs and Forms in React
date: "2015-05-06T23:46:37.121Z"
category: "React"
description: "Overview of different ways and best practices to handle inputs and forms in React. Two-way data binding and React Hooks examples."
featuredImage: "./passport.jpg"
tags: ["React", "Forms"]
---

Forms are essential for *encouraging* user input on a webpage. In order to setup a basic form in React, first create a new project using **create-react-app** (or whichever build tool you prefer).

## Controlled Components

A text input will store the value of whatever the user typed. Since we want this information available in our components's **state**, we can use the `onChange` handler to update state when the user makes an input change. Once updated, the new value will be displayed under the input since **React** re-renders when our state changes. 

&nbsp;  

The input below is a **Controlled Component** because it receives it's value from state. Try it out yourself by replacing the contents of `App.js` with the following

```jsx
import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");

  return (
    <div className="App">
      <input 
        onChange={e => setName(e.target.value)} value={name} 
      />
      <div>{name}</div>
    </div>
  );
}
export default App;
```

Here we are updating the name value with the `useState()` hook when the input is changed. When an input event occurs, we have acess to an *event object* (or **e** for short) from our **onChange** handler. We should also bind this name to the property `value` in order to complete the two-way data binding.

&nbsp;

`e.target.value` refers to the current value of the input, *after* the key is pressed. The name we set is then reflected in the `<div></div>` below the input. This is a basic example of how to use a *single* input in **React**. However, for more complex examples (and probably always), we will want to wrap inputs with a `form` element like below.

## Using a Form Element

```jsx
import React, { useState } from "react";

const App = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          value={data.name}
        />

        <label htmlFor="age">Age: </label>
        <input
          type="number"
          name="age"
          onChange={(e) => handleChange(e)}
          value={data.age}
        />

        <input type="Submit" />
      </form>
      <div>
        <h2>Output</h2>
        <p>Name: {data.name}</p>
        <p>Age: {data.age}</p>
      </div>
    </div>
  );
};
export default App;
```

In this component, the `form` element wraps our input tags and captures their inputs during the `handleChange` event. We can get the input names by *destructuring* `e.target` into **name** and **value** like we did above. 

&nbsp;

Also in the `handleChange` event, you'll notice we are setting the key value pair `[name]: value` onto `data` using the ES6 *computed property names* syntax. This means we set the property with **name** equal to **value**. This logic will work for additional inputs as well since every input will have a *name* and *value*.

### Using a Submit Event

We can also trigger the form when the form submit button is *clicked*. This is useful if we are sending our data elsewhere when the user completes the form. Add the following method to `App.js`  

```jsx
const onSubmitForm = (event) => {
  event.preventDefault();
  const { name, age } = event.target;
  setData({
    name: name.value,
    age: age.value,
  });
};
```

Also add the submit handler line into the `<form>` tag.

```jsx
<form 
  onSubmit={(e) => onSubmitForm(e)}
>
```

When our `onSubmitForm` method is called, we have access again to the **event** object. The default behavior is for an html page to reload whenever a form is submitted, however since we are handling the form ourselves, we will call `event.preventDefault()` to stop the page refresh. 

&nbsp;

In this last example, the form element listens for a `Submit` event (such as a button click) from any of its children, then passes up all of the input data in a process called **event bubbling**.

## Third Party Form Libaries

While it makes sense to code your own forms in **React**, sometimes you it is overkill to setup a database and email server as well... especially just for a single form. There are plenty of *third-party* services such as **Form-data**, **Basin**, **Airtable**, and dozens of others which provide cheap form storage and email alerts. If you are hosting your site on **Netlify**, you can setup a simple form integration using [Netlify Forms]([Netlify Forms | Netlify](https://www.netlify.com/products/forms/)) for free if you receive less than 100 submissions per month.

### Conclusion

There are plenty of other considerations wil forms such as connecting to a error handling (client or server side), page caching, connecting to a database, and setting up email servers. While there are plenty of ways to setup a form, this should give you a basic overview for how to setup inputs, capture, and send data.
