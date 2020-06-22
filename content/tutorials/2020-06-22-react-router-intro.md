---
templateKey: blog-post
title: Intro to Declarative Routing with React Router
slug: react-router-intro
date: 2020-06-22T17:53:01.098Z
dateModified: 2020-06-22T17:53:02.146Z
description: Learn how to setup and use React Router in your React projects for
  declarative routing. Explains basic components and functionality.
featuredPost: false
category: React
tags:
  - Routing
  - Libraries
  - React
featuredImage: /img/react-router-railroad.jpg
---
**React Router** is a third-party library for React that uses declarative component
routing. It allows you to assign components to specific endpoints on your site. Those
endpoints can be visited by using React Router's internal link component.

## React-Router Components

React Router is essentially a compilation of useful components to handle routing easily.
Here are some of the main components that `react-router-dom` makes accessible and what
they do

| Component     | Description                                           |
| ------------- | ----------------------------------------------------- |
| BrowserRouter | Wraps application, allows for routing                 |
| Route         | Specifies which component an endpoint should render   |
| Switch        | Can contain multiple routes, only renders one         |
| Link          | Similar to `<a>`, directs user to specified endpoint    |
| NavLink       | Similar to `<Link>`, can have additional **active** property |
| Redirect      | Navigates to an endpoint, forced route change         |

The `BrowserRouter`, `Route`, `Link`, and `Switch` components provide basic React Router
functionality. The `NavLink`, and `Redirect` are used less often, though still provide
useful features depending on the situation.

## React Router Props

We also get access to several routing variables including `history`, `location`, and
`params`. These are used to read routing information as well as to use programmatic
routing

| Variable | Hook        | Description                                         |
| -------- | ----------- | --------------------------------------------------- |
| history  | useHistory  | Wraps application, allows for routing               |
| location | useLocation | Specifies which component an endpoint should render |
| params   | useParams   | Can Contain multiple routes, only renders one       |

These variables are all accessible from the wrapping `<BrowserRouter>` component. We can
either pass these variables down as props, or read their values from context with the
Hooks above.

## React Setup

Let's now setup a basic React application with `create-react-app` (or whichever build tool
your prefer)

```bash
npx create-react-app react-router-demo
```

Change directories into this project and install `react-router-dom` with the following commands

```bash
cd react-router-demo
npm install react-router-dom
```

Once it has installed, start the application with

```bash
npm start
```

## Basic Router Setup

Now that we have a basic setup running, let's add the core React Router components to our
app. Replace `App.js` in your project with the following

```jsx
import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </Router>
  )
}

function Home() {
  return <div>Home page</div>
}
function Contact() {
  return <div>Contact Page</div>
}
```

In this example, we wrapped our entire application with a `BrowserRouter` component which
we aliased as `Router`. This is a common practice when using React Router since the name
is shorter.  
&nbsp;  
We also added some other React Router components here, setting up 2 routes and
associating a `Link` with each. The homepage or `/` route should always include the
`exact` prop, since otherwise it will match every page that starts with `/` (literally
every route). Both routes live in a `Switch` component so only one of them will load at
a time. &nbsp;  
If we want to add more routes, it's as simple as specifying the endpoint and which
component that route will render. Every component inside the `Router` component will have
access to these routes via the `Link` component.

## Adding URL Parameters

Another option for routing is to load a component to a specific route, regardless of the
endpoint. For example, we can add a projects route that also accepts a `:id` parameter.
Any route that starts with `/projects/` will load the `Project` component.

```jsx
import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch, useParams} from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/projects/first-project">Project #1</Link>
          </li>
          <li>
            <Link to="/projects/another-project">Project #2</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/projects/:id" children={<Project />} />
      </Switch>
    </Router>
  )
}

function Home() {
  return <div>Home page</div>
}
function Contact() {
  return <div>Contact Page</div>
}
function Project() {
  let {id} = useParams()

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  )
}
```

Visiting either of our project links above will load our _page parameters_ or _id_,
returned from the `useParams` hook. We could add conditional logic into this component if
we wanted to render different UI components based on the parameter.

## Using NavLinks

The `NavLink` component is identical to the `Link` component in addition to a
**activeClassName** property it accepts. Use this component if you want to change the
style of the currently active navigation link. For example, we could include `NavLink` in
our imports and replace our navigation with the following

```jsx
<nav>
  <ul>
    <li>
      <NavLink exact to="/" activeClassName="bold">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/contact" activeClassName="bold">
        Contact
      </NavLink>
    </li>
    <li>
      <NavLink to="/projects/first-project" activeClassName="bold">
        Project #1
      </NavLink>
    </li>
    <li>
      <NavLink to="/projects/another-project" activeClassName="bold">
        Project #2
      </NavLink>
    </li>
  </ul>
</nav>
```

Here we changed `Link` to `NavLink` and added an active class of `bold` to each link.
Let's also add a `bold` class to our CSS in order to emphasize the selected link.

```css
.bold {
  font-weight: bold;
}
```

> Note: We also added `exact` on the home link to prevent it from always being bold,
> because every route matches `/`.

## Using Redirects

A `Redirect` component will re-route to another specified path. This can be useful for
various reasons including authentication.  
&nbsp;  
Add the following `Route` to see an unrealistic but fun example of how redirect works

```jsx
<Route path="/projects">
  {Math.random() > 0.5 ? (
    <Redirect to="/projects/first-project" />
  ) : (
    <Redirect to="/projects/another-project" />
  )}
</Route>
```

If you visit `http://localhost:3000/projects/` in the browser, you will get redirected to
either the first or the second project. If you continuously refresh the page it will
occasionally alternate between the first and second page randomly.  
&nbsp;  
The `Redirect` component also accepts a `from` property in case you want to only use the
redirect from certain paths.

## Navigating Programmatically

React Router gives us access to the `history` object which we can use to trigger route
changes. This object can either be passed down as props from the `BrowserRouter`
component, or included in a hook. Import the `useHistory` hook from `react-router-dom` and
replace your `Contact` component with the following

```javascript
function Contact() {
  let history = useHistory()
  return (
    <div>
      <h2>Contact Page</h2>
      <button onClick={() => history.push('/')}>Submit</button>
    </div>
  )
}
```

The **history** object has a `.push()` method which accepts a route as it's argument. This
is a great way to navigate through your site using JavaScript. If you are in need of a
route change in your component's methods, reach for the `history` object.

### Conclusion

React Router is a powerful tool to add routing to your projects with multiple pages. The
setup and API are fairly straightforward, and once you've setup a few applications with
it, everything will quickly become second nature!!
