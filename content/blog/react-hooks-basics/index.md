---
title: How to use React Hooks
date: "2015-05-06T23:46:37.121Z"
category: "React"
description: "setup"
featuredImage: "./lost-places.jpg"
tags: ["React", "Hooks"]
---

## Why Hooks

If you've written any `React` code in the past, there's a good chance you've made a `class` component before. Aside from occasional issues with the `this` keyword, `class` components are relatively straightforward to use. `Hooks` is an opt-in way to write code as of `React 16.8` that comes with various pre-defined *hooks* to write functional components. In general, functional components using `hooks` are shorter and easier to read than `class-based` components using a `state` object and `lifecycle methods`

`Class` components utilize `this.setState` and `lifecycle methods` such as `componentDidmount`, `componentDidUpdate`, etc. These methods can be replaced in functional components using the `useState` and `useEffect` hooks. There are several other hooks that are ready to use in `React 16.8` as well as the ability to create custom hooks.

The basic hooks we will be using in this tutorial include
- useState
- useEffect
- useContext
- useReducer
- useCallback
- useRef
- useMemo

There are also additional hooks such as
- useImperativeHandle
- useLayoutEffect
- useDebugValue

## Importing Hooks
Hooks come included with React 16.8 and above, so you will not need to install any additional dependencies to get started. Importing these hooks is a similar to how you import `React.Component` in class components. For example, you can import the `useState` and `useEffect` hooks in your React import as follows

```javascript
Import React, { useState, useEffect } from 'react'
```

*Alternatively you can use these hooks directly with `React.useState()` or `React.useEffect()`

## useState
This hook serves the same purpose as our `state` object in class-based components. A basic `useState` hook is declared, generally at the top of your functional components like this

```javascript
const [data, setData] = useState([])
```
Here, we are declaring the variable we wish to keep track of (equivalent to `this.state.data`) as well as a setter function (similar to `this.setState({ data })`). The initial value for `data` gets passed in as the `useState` argument (an empty array in this case).

Now we have access to our `data` variable directly, along with a `setData` function that we can use to set the data.

### useState vs this.setState
If you've used many class-based components before, you'll know that `this.setState` only changes the properties you specify. For example

```javascript
state = {
  user: null,
  data: []
}
```
If we were to call the following code
```javascript
this.setState({ data: [1,2,3] })
```
our `data` value in `state` would be adjusted and the value for `user` would remain the same. `this.setState` only overwrites the specified properties.

The `useState` hook is slightly different in its effect. For example if we had the following hook

```javascript
const [state, setState] = useState({
  user: null,
  data: []
})
```
Calling the following method
```javascript
setState({
  data: [1,2,3]
})
```
would overwrite the `user` value in our state hook.

We can avoid this issue by simply first destructuring our hook's value, then changing our desired properties

```javascript
setState({
  ...state,
  data: [1,2,3]
})
```
This will `spread` both `user` and `data` properties, replacing `data`

The `useState` hook can take some time to get used to, but once you understand how to implement state using this hook, it will end up saving you complexity in your code. You can either declare multiple hooks for each variable, or use one hook to store an object with each of your desired properties.

## useEffect

This hook will attempt to run each time your application re-renders. It takes two arguments: a function to run, along with an optional array that indicates when the hook should trigger.

### On Component Mounting
As a basic example, the following `useEffect` hook will have the same effect as `componentDidMount` in a class-based component

```javascript
useEffect(() => {
  console.log('functional component mounted')
}, [])
```
Here the empty array indicates that the effect hook should run on the first render, and not again after that. If we were to leave off the empty array and just provide an arrow function, that function would run on every render.

### On Component Updating
Sometimes we will only want to run this effect when one of our components `props` updates. In a class-based component this would look similar to 
```javascript
componentDidUpdate(prevProps) {
  if(prevProps.data !== this.props.data) {
    console.log('data prop was updated')
  }
}
```
Since this `prevProps !== this.props` logic is regularly used in `componentDidMount`, hooks simplifies the code in the following `useEffect` hook

```javascript
function HookExample = ({data}) {
  useEffect(() => {
    console.log('data prop was updated')
  }, [data])
  ...
}
```

Passing `data` into the second argument's array in `useEffect` indicates that this hook should be run on any re-render in which the `data` property changes. We can include multiple variables in this array if we wish to run the same logic when different variables change.

## useContext