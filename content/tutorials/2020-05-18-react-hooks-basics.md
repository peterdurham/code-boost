---
templateKey: blog-post
title: How and Why to Use React Hooks
slug: react-hooks-basics
datePublished: 2020-03-28T18:00:00.000Z
dateModified: 2020-03-28T18:00:00.000Z
description: Overview on React Hooks with examples. How to use each Hook
  including useState, useEffect, and useContext.
featuredPost: false
category: React
tags:
  - React
  - Hooks
  - Basics
featuredImage: /img/hooks_bananas.jpg
---
## Why Hooks

React **Hooks** is a newer, opt-in way to write React code as of version **16.8** that comes with various pre-defined *hook methods* that serve a variety of functions. Hooks can only be used in functional components and have a syntax that is shorter and easier to read than *class-based* components. **Hooks** are optional, and can be converted one at a time when convenient.

&nbsp;

If you've written any **React** code in the past, there's a good chance you've made a *class* component before. They are generally straightforward and simple to use. State is stored in an object using `this.setState` and effects are called using `lifecycle` methods. These features *do not exist* in hooks, however they are replaced by similar ones.

&nbsp;

The basic hooks we will be using in this tutorial include

- useState
- useEffect
- useContext

There are also additional hooks such as

- useCallback
- useRef
- useReducer
- useMemo
- useLayoutEffect
  
  

### Importing Hooks

Hooks come included with **React 16.8** (and above), so you will not need to install any additional dependencies to get started. Importing these hooks is a similar to how you import `React.Component` in class components. For example, you can import the `useState` and `useEffect` hooks in your React import as follows

```javascript
Import React, { useState, useEffect } from 'react';
```

*Alternatively you can use these hooks directly with `React.useState()` or `React.useEffect()`

## useState

This hook serves the same purpose as our `state` object in class-based components. A basic `useState` hook is declared, generally at the top of your functional component's JavaScript like this

```javascript
const [data, setData] = useState([]);
```

Here, we are declaring the variable we want to keep track of **data** (equivalent to `this.state.data` in classes) as well as a setter function **setData** (similar to `this.setState({ data })`). The initial value for **data** gets passed in as the `useState` argument (an empty array in this case).

### useState vs this.setState

If you've used many class-based components before, you'll know that `this.setState` only changes the properties you specify. For example

```javascript
state = {
  user: "jimmysmith@gmail.com",
  data: []
}
```

If we were to call the following code

```javascript
this.setState({ data: [1,2,3] });
```

our **data** value in `state` would be adjusted and the value for **user** would remain the same. `this.setState` only overwrites the specified properties.

&nbsp;

The `useState` hook is slightly different in its effect. For example if we had the following hook

```javascript
const [state, setState] = useState({
  user: "jimmysmith@gmail.com"
  data: []
})
```

Calling the following method

```javascript
setState({
  data: [1,2,3]
})
```

would overwrite the `user` value *jimmysmith@gmail.com* in our state hook.

&nbsp;

We can avoid this issue by first spreading our hook's value, then changing our desired properties

```javascript
setState({
  ...state,
  data: [1,2,3]
})
```

This will add the `user` and `data` properties from **state**, then replace `data` with our array.

&nbsp;

The `useState` hook can take some time to get used to, but once you understand how to implement state using this hook, it will end up *saving* you complexity in your code. You can either declare useState hooks for each variable, or use one hook to store an object with all of your state data.

## useEffect

This hook will try to run each time your application re-renders. It takes two arguments: a function to run, along with an optional array that indicates *when* the hook should trigger.

### On Component Mounting

As a basic example, the following `useEffect` hook will have the same effect as `componentDidMount` in a class-based component

```javascript
useEffect(() => {
  console.log('functional component mounted');
}, [])
```

Here the empty array indicates that the effect hook should run on the first render, and not again after that. If we were to leave off the empty array and just provide an arrow function, that function would run on every render.

### On Component Updating

Sometimes we will only want to run this effect when one of our components `props` updates. In a class-based component this would look similar to 

```javascript
class ClassExample extends React.Component {
  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data) {
      console.log('data prop was updated');
    }
  }
  ...
}
```

Since this `prevProps !== this.props` logic is regularly used in `componentDidUpdate`, this code is simplified in the following `useEffect` hook

```javascript
const HookExample = ({ data }) {
  useEffect(() => {
    console.log('data prop was updated');
  }, [data])
  ...
}
```

Passing `data` into the second argument's array in `useEffect` indicates that this hook should be run on any re-render in which the `data` property changes. We can include multiple variables in this array, separated by comma, in order to run the same logic when different variables change.

## useContext

Context in React has been around for a while, however `useContext` simplifies its use in functional components. It allows us to pass down props layered deeply in the component tree, without having to declare them on each individual child component.

&nbsp;

To create a **context**, declare a new variable like this

```jsx
const DemoContext = React.createContext();
```

Each context has access to  **Provider** and **Consumer** wrappers which pass props down your component tree. By wrapping your components in a `Provider` and supplying a value property, any component inside that Provider will also be able to read that value by accessing the `Consumer`.

```jsx
const App = () => {
  return(
    <DemoContext.Provider value={{
      color: 'green',
      number: 42
    }}>
      <Page />
    </DemoContext.Provider>
  )
}
const Page = () => {
  return(
    <Item />
  )
}
const Item = () => {
  return(
    <div>Item here</div>
  )
}
```

In this example, we have an `Item` component nested three levels deep which doesn't receieve any props from its parent components. If we wanted, we could pass these values down through the props of the `Page` and `Item` components. The `context` hook instead allows us to pull in those values with the `useContext` hook.

```jsx
const Item = () => {
  const demo = useContext(DemoContext)
  return(
    <div style={{color: demo.color}}>Item {demo.number} here</div>
  )
}
```

As long as the `DemoContext` we created above is imported in the `Item` component's file, we will have access to all the properties passed down in the provider. Here the `consumer` is extracted from the `DemoContext` and wrapped around the entire component. `useContext` allows us to cleanly consume parent properties without having to wrap our child component in a consumer and use a `render props` pattern that is normal for class-based components.

### Conclusion

There are lots of other hooks available in React, including **custom hooks**. This tutorial included some of the most commonly used ones. Overall, there are plenty of benefits and reasons to get writing functional components with **Hooks** today!