---
title: Different Methods to Fetch Data in React
date: "2020-05-15 11:00:00"
category: "React"
description: "Overview of the methods used to fetch data in React. Uses fetch, axios, class components, hooks, es5, es6, and Async / Await"
featuredImage: "./earth.jpg"
tags: ["React", "Fetch", "API", "Hooks", "Async/Await", "Axios"]
---

There are plenty of methods you can use to retrieve data in **React**. This tutorial will explain some of the standard methods and syntaxes to do so. Each example is a standalone `App` component that can be copied to another React App for quick usage.

### What is Fetching Data?

Fetching data is done by sending out a HTTP `get` request to another server, requesting a specific response. This could mean requesting data from a third party API, or the site's own server. In This tutorial we will be focusing on retrieving data from a *REST* API. We can fetch data from any URL endpoint that returns JSON data when visited in the browser.

### Variables required

In each of the below examples, we will be using a React component that sends off a HTTP request when it loads. This will take a fraction of a second to return data which we can store in a `data` variable. We will also keep track of the loading state in the `isLoaded` variable, so that we don't try to display the information before it is retrieved. Lastly, we will store any errors in an `error` variable which will display to the screen if any errors occur. 

### About fetch

Fetch is a browser method to request HTTP data that is available by default in React. Data fetching is an *asyncronous* operation since it is retrieving data from another server. Fetch, or any similar method will return a promise.

## Using Fetch with Classes

```jsx
import React from "react";

const randomUserURL = "https://randomuser.me/api/";

class App extends React.Component {
  state = {
    data: [],
    isLoaded: false,
  };
  componentDidMount() {
    fetch(randomUserURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ data, isLoaded: true });
      })
      .catch((error) => this.setState({ error, isLoaded: true }));
  }

  render() {
    const { data, isLoaded, error } = this.state;
    if (error) return <div>Error: {error.message}</div>;
    if (!isLoaded) return <div>...loading</div>;
    else {
      return (
        <div className="App">
          <h1>Fetching Data</h1>
          <div>{data.results[0].name.first}</div>
        </div>
      );
    }
  }
}
export default App;
```

In this example we used a React **class** component to fetch our data with the `componentDidMount` method. Once the data was retrieved we also stored it in state using the `this.setState` method. Lastly we displayed the random user's first name from the  `data.results[0].name.first` variable from state. 

## Using Fetch with Hooks

Since **React 16.8**, hooks have been available to use in React functional components. We can refactor the class component example above into a functional component by utilizing the `useState` and `useEffect` hooks. The **useState** hook will store our state data and act similarly to `this.setState`, while the **useEffect** hook will replace our `componentDidMount` lifecycle method. 

```JSX
import React, { useState, useEffect } from "react";

const randomUserURL = "https://randomuser.me/api/";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      fetch(randomUserURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data);
          setIsLoaded(true);
        })
        .catch((error) => {
          setError(error);
          setIsLoaded(true);
        });
    }
    fetchData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!isLoaded) return <div>...loading</div>;
  else {
    return (
      <div className="App">
        <h1>Fetching Data</h1>
        <div>{data.results[0].name.first}</div>
      </div>
    );
  }
};
export default App;
```

With this change to hooks, we separated our state into three useState variables. We could refactor this into one useState hook, though for simplicity we will use three. The useEffect syntax is somewhat similar to componentDidMount with some minor changes such as a secondary argument (`[]` here) to indicate when the hook should run. You can learn more about hooks in this [React Hooks Basics](./react-hooks-basics) overview. 



## Fetching with Async / Await

**Async/await** is a useful syntax in javascript where we can avoid writing out multiline promises. This syntax can be particularly useful when performing multiple or nested asynchronous requests. 

&nbsp;

Here is the above component, refactored to use `async/await`

```JSX
import React, { useState, useEffect } from "react";

const randomUserURL = "https://randomuser.me/api/";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(randomUserURL);
        const data = await response.json();

        setData(data);
        setIsLoaded(true);
      } catch (e) {
        setError(error);
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!isLoaded) return <div>...loading</div>;
  else {
    return (
      <div className="App">
        <h1>Fetching Data</h1>
        <div>{data.results[0].name.first}</div>
      </div>
    );
  }
};
export default App;
```

**Await** is a keyword that indicates the code following it is *asynchronous*. The value of `response` in this case will be a promise, and the next line will not run until the *awaited* code is resolved. **await** can only be used inside a function that includes the **async** keyword, like above. This pattern greatly simplifies our data-fetching syntax and is available to use in React by default with Babel.

## Fetching with Axios

Axios is a lightweight third party library that is more friendly to use than the `fetch` API. While fetch is straightforward for simple `get` requests, there is some complexity added when posting or updating data that can be avoided with Axios.

> While Axios is a useful library if you will be setting up lots of API calls, it is not strictly necessary and can be avoided if performance is a big concern.

Install `Axios` with the following command

```bash
npm install axios
```

Let's refactor the previous `fetch` component to use this library

```JSX
import React, { useState, useEffect } from "react";
import axios from "axios";

const randomUserURL = "https://randomuser.me/api/";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(randomUserURL);
        setData(response.data);
        setIsLoaded(true);
      } catch (e) {
        setError(error);
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!isLoaded) return <div>...loading</div>;
  else {
    return (
      <div className="App">
        <h1>Fetching Data</h1>
        <div>{data.results[0].name.first}</div>
      </div>
    );
  }
};
export default App;

```

You'll notice that for get requests, the syntax is quite similar. Once we've imported `axios`, the only changes are to call `axios.get` instead of `fetch` as well as remove our second `then()` block. Axios will parse this data into JSON for us automatically so we just need to grab the data value on the HTTP response.