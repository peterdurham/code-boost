---
title: Conditional Rendering Basics in React
date: "2015-05-06T23:46:37.121Z"
category: "React"
description: "setup"
featuredImage: "./stoplight.jpg"
tags: ["React", "Conditional Rendering"]
---

Oftentimes when building React interfaces, we will want to display different elements depending on the state of the application. There are numerous ways to do this in React, depending on the situation. In this tutorial we will walk through several of the options available.

Each component in React has a `return` statement, which includes some JSX or markup. We can use `if` statements to decide which JSX is returned. In the following example, our component will return the number of bananas along with a label. If there is only 1 banana we would like to make it singular, otherwise we can make it plural.

```jsx
function App() {
  const [bananas, setBananas] = React.useState(1);

  if (bananas === 1) {
    return <div>{bananas} banana</div>;
  } else {
    return <div>{bananas} bananas</div>;
  }
}
```

We can also extract the banana logic away from multiple return statements and into the javascript to simplify our markup like so

```jsx
function App() {
  const [bananas, setBananas] = React.useState(0);
  let label;

  if (bananas === 1) {
    label = <div>{bananas} banana</div>;
  } else {
    label = <div>{bananas} bananas</div>;
  }

  return <div>{label}</div>;
}
```

This is a bit excessive, as we really only need to use the logic to determine whether the label is plural or not. To simplify this further, we can instead set the label variable to a string

```jsx
function App() {
  const [bananas, setBananas] = React.useState(0);
  let label;

  if (bananas === 1) {
    label = 'banana'
  } else {
    label = 'bananas'
  }
  return <div>{bananas} {label}</div>;
}
```

There are further ways to simplify this code such as concatenating an `s` if our condition is true, however this should well demonstrate that we can set variables to either JSX or a string value.

## Inline Conditionals

The previous examples outline how we can either return two sets of markup, or two possible variable values. For our bananas example, there are (thankfully) simpler ways to achieve our goal.

In React and JavaScript we have access to the `logical &&` and `if-else` operators. Here is their basic syntax

```javascript
// logical &&
condition && ()

// if-else
condition ? () : ()
```

In each case, we will have a condition which simplifies down to a boolean value (true or false). This could be a number of statements such as  

- `userLoggedIn === true`
- `!singular`
- `newArray.indexOf('Salmon') > -1`

### Logical &&

This operator will evaluate to the second argument if the condition is true and the first argument if it is false. Unless you are a binary wiz kid this might not make much sense at first, but essentially we will use this operator when we only care to return something if our statement evalutes to true.

```jsx
function App() {
  const [bananas, setBananas] = React.useState(1);

  return (
    <div>
      <h1>Banana Stand</h1>
      {bananas === 1 && "I only have one banana"}
    </div>
  );
}
```

This condition will evaluate to true, therefore the statement will evaluate to the second argument, `I only have one banana`. There are multiple valid syntaxes for inline conditionals and the following will achieve the same purpose

```jsx
// we can wrap our statement in a div
<div>{bananas === 1 && "I only have one banana"}</div>

// we can wrap our conditional in parenthesis
{(bananas === 1) && "I only have one banana"}
```

It is useful to understand each valid syntax, though many code formatters or situations will call for different solutions. 

### If-Else

This is the grandaddy operator of conditional rendering in React. It will evaluate a statement, returning the first value if true, and the second value if false. Here is our previous example using an inline if-else conditional.

```jsx
function App() {
  const [bananas, setBananas] = React.useState(1);

  return (
    <div>
      <h1>Banana Stand</h1>
      <div>
        {(bananas === 1) ? (
          <div>{bananas} banana</div>
        ) : (
          <div>{bananas} bananas</div>
        )}
      </div>
    </div>
  );
}
```

Starting with `{() ? () : ()}` can be helpful at first to grasp this conditional and avoid syntax errors. Oftentimes these statements will be longer than 1 line so it helps to understand the allowable spacing. Code formatters such as *prettier* will rearrange the syntax in a number of ways.

Since conditionals can return either JSX or string values, we can simplify this example further

```jsx
<div>
  {bananas} {bananas === 1 ? "banana" : "bananas"}
</div>
```

### Conclusion

There are many possible ways to leverage conditional operators in React to enhance your code. Since React is so performant at re-rendering the DOM, it makes sense to utilize whatever logic we need to get the job done. I have found it most helpful to explore each possible variation, choosing whatever method or syntax is most suitable.