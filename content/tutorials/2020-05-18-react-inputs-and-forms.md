---
datePublished: 2020-05-18T18:00:00.000Z
templateKey: blog-post
title: How to Handle Inputs and Forms in React
slug: react-inputs-and-forms
date: 2020-05-18T18:00:00.000Z
dateModified: 2020-05-18T18:00:00.000Z
category: React
featuredPost: false
description: Overview of different best practices and methods to handle inputs
  and forms in React. Two-way data binding and React Hooks examples.
tags:
  - React
  - Forms
  - Code Along
featuredImage: /img/using_forms_and_inputs.jpg
---
Forms are helpful for allowing user input on a webpage. In order to setup a basic form in React, first create a new project using [create-react-app](https://www.code-boost.com/create-react-app/) (or whichever build tool you prefer).

## Controlled Components

A text input will store the value of whatever the user has typed. It is useful for organizational purposes to have this information saved in our components's **state**. We can use the `onChange` handler to update state when the user makes an input change. Once updated, the new value will be displayed under the input since **React** re-renders when our state changes. 

&nbsp;  

The input below is an example of a **Controlled Component** because it both updates and receives it's value from state. Try it out yourself by replacing the contents of `App.js` with the following

```jsx
import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Controlled form component:</h2>
      <input onChange={(e) => setName(e.target.value)} value={name} />
      <div>{name}</div>
    </div>
  );
};
export default App;
```

Here we are updating the name value with the `useState()` hook when the input is changed. When an input event occurs, we have acess to an *event object* (or **e** for short) from our **onChange** handler. We also made sure to bind our variable to the property `value` in our `<input>`  to complete the two-way data binding.

&nbsp;

The **onChange** input `e.target.value` refers to the current value of the input, *after* the key is pressed. The name we set is then reflected in the `<div></div>` below the input. This is a basic example of how to use a single input in **React**. However, for more complex examples (and probably always), we will want to wrap inputs with a `form` element.

## Multiple Form Fields

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
    <div style={{ width: "400px", margin: "60px auto" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
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

In this component, the `form` element wraps our input tags and captures their inputs during the `handleChange` event. We can get the input names and values by *destructuring* `e.target` into **name** and **value** like we did above. 

&nbsp;

Also in the `handleChange` event, you'll notice we are setting the key value pair `[name]: value` onto our `data` object using the ES6 *computed property names* syntax. This means we set the property with the input's **name** to be the input's **value**. This logic will work for additional inputs too since every input will have a *name* and *value*.

## Form Submit Event

We can also trigger the form when the submit button is *clicked*. This is useful when we are waiting for the user completes the form so we can send the data elsewhere. The next example uses the **onSubmit** handler instead of multiple **onChange** handlers with *value* properties connected to state.

```jsx
import React, { useState } from "react";

const App = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
  });

  const onSubmitForm = (event) => {
    event.preventDefault();
    const { name, age } = event.target;
    setData({
      name: name.value,
      age: age.value,
    });
  };
  return (
    <div style={{ width: "400px", margin: "60px auto" }}>
      <form
        onSubmit={(e) => onSubmitForm(e)}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" />

        <label htmlFor="age">Age: </label>
        <input type="number" name="age" />

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

When our `onSubmitForm` method is called we can pass along the **event** object, which stores all of our inputs. The default behavior is for an html page to reload whenever a form is submitted, however since we are handling the form ourselves, we will call `event.preventDefault()` to stop the page refresh. Next we can pull `name` and `age` from the event object and set it into state. This method is more useful when dealing with APIs where you can craft a request that gets fired when the *submit* button is clicked.

&nbsp;

> This form element listens for a `onSubmit` event (such as a button click) from any of its children, then passes up all of the input data in a process called **event bubbling**.

## Third Party Form Libaries

While it makes sense to code your own forms in **React**, sometimes it is overkill to setup a database and email server as well... especially just for a single form. There are plenty of *third-party* services such as [Formspree](https://formspree.io/), [Basin](https://usebasin.com/), [Wufoo](https://www.wufoo.com/), and dozens of others which provide cheap form storage and email alerts. If you are hosting your site on **Netlify**, you can setup a simple form integration using [Netlify Forms](https://www.netlify.com/products/forms/) for free if you receive less than 100 submissions per month.

### Conclusion

There are plenty of other considerations when using forms, such as error handling (client or server side), page caching, connecting to a database, and email servers. While there are plenty of ways to setup a form, this should give you a basic overview for how to use inputs to capture and send form data.
