---
title: Different Methods to Fetch Data in React
date: "2015-05-06T23:46:37.121Z"
category: "React"
description: "Overview of the methods used to fetch data in React. Uses fetch, axios, class components, hooks, es5, es6, and Async / Await"
featuredImage: "./earth.jpg"
tags: ["React", "Fetch", "Axios", "API", "Hooks", "Async/Await"]
---

There are plenty of methods you can use to retrieve data in a React Application. This tutorial will explain some of the best methods and syntax to do so.

### What is data fetching?
Fetching data is done by sending out a HTTP `get` request in the browser from a different server than the one requesting it. This could mean data from a backend server or third party API. In This tutorial we will be focusing on retrieving data from a `REST` API. We can fetch data from any URL endpoint that returns JSON data in the browser to consume in our application.

## Using Fetch
Fetch is a browser method to request HTTP data that is available by default in React. Data fetching is an asyncronous operation since it is retrieving data from another server. Fetch, or any similar method will always return a promise.

```JSX
import React from "react";

class App extends React.Component {
  state = {
    data: []
  };
  componentDidMount() {
    fetch("https://node-updater.herokuapp.com/nodeinfo/currentdata")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ data });
      });
  }
  render() {
    return (
      <div className="App">
        <h1>Fetching Data</h1>
        {this.state.data.length > 0 && <div>{this.state.data[0].date}</div>}
      </div>
    );
  }
}
export default App;
```

In this example we used a React **class** component to fetch data when the component is mounted and log the data to the console. Once the data is retrieved we also stored it in state to display in our JSX.

## Using Axios
Axios is a lightweight third party library that is more friendly to use than the `fetch` API. While fetch is straightforward for simple `get` requests, there is some complexity added when posting or updating data that can be avoided with Axios.

Install `Axios` with the following command

```bash
npm install axios
```

Let's refactor the previous `fetch` component to use this library

```JSX
import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    data: []
  };
  componentDidMount() {
    axios
      .get("https://node-updater.herokuapp.com/nodeinfo/currentdata")
      .then(response => {
        console.log(response);
        this.setState({ data: response.data });
      });
  }
  render() {
    return (
      <div className="App">
        <h1>Fetching Data</h1>
        {this.state.data.length > 0 && <div>{this.state.data[0].date}</div>}
      </div>
    );
  }
}
export default App;
```
You'll notice that for get requests, the syntax is quite similar. Once we've imported `axios`, the only changes are to call `axios.get` instead of `fetch` as well as remove our second `then()` block. Axios will parse this data into JSON for us automatically so we just need to grab the data value on the HTTP response.

## Using Async / Await
Async await is a useful pattern in javascript where we can avoid writing out multiline promises. This syntax can be particularly useful when performing multiple or nested asynchronous requests. 

Here is the above component, refactored to use `async/await`

```JSX
import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    data: []
  };
  async componentDidMount() {
    const response = await axios.get(
      "https://node-updater.herokuapp.com/nodeinfo/currentdata"
    );
    const data = response.data;
    console.log(data);
    this.setState({ data });
  }
  render() {
    return (
      <div className="App">
        <h1>Fetching Data</h1>
        {this.state.data.length > 0 && <div>{this.state.data[0].date}</div>}
      </div>
    );
  }
}
export default App;
```
**Await** is a keyword that indicates the code following it is asynchronous. The value of `response` in this case will be a promise, and the next line will not run until the *awaited* code is resolved. **await** can only be used inside a function that includes the **async** keyword, like above.

This pattern greatly simplifies our data-fetching syntax and is available to use in React by default with Babel.

## Using Hooks
So far we've simplified our fetching by using **Axios** and **Async/Await**. We can refactor our code even further by using a functional component with Hooks instead.

```JSX
import React from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://node-updater.herokuapp.com/nodeinfo/currentdata"
      );
      console.log(response.data);
      setData(response.data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Fetching Data</h1>
      {data.length > 0 && <div>{data[0].date}</div>}
    </div>
  );
};
export default App;
```
The Hooks pattern of setting up components can take time to get used to. For some reason we are writing and calling a function inside our `componentDidMount` equivalent in `useEffect`. All of our state data is written in 1 line, which is nice. For the most part, once you wrap your head around the syntax for `useState` and `useEffect`, hooks is easy and quicker to write than class-based components.

## Loading and Error State
So far we've gone through the various syntaxes you can use to retrieve data effectively in React. We have however, so far avoided some of the best practices for doing so. In general we will want to display a loading state when the data is being retrieved along with an error state if the request fails. 

```
code with loader and error handling here
```