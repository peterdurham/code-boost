---

title: Use NextJS to Create a Server Rendered React App
date: "2015-05-06T23:46:37.121Z"
category: "Tools"
description: "Build a Next.JS application for Server-side rendered React pages. Deploy to the Now cloud platform by Zeit. "
featuredImage: "./stonehenge.jpg"
tags: ["React", "JavaScript", "Tools", "Next", "Now"]

---



### Why NextJS?

Tools such as *create-react-app*, *parcel*, and *webpack* are **Client rendered** by default, and will not be optimized for Google's search engine crawlers. This problem has been solved by *NextJS* and *Gatsby*, which are currently the most popular build tools for **Server rendering** in React. Server rendering is useful for sites like stores or blogs to rank better in SEO by sending all metadata with the initial page load.

### NextJS Features

*NextJS* is a flexible build tool for React that specializes in creating **Server rendered** dynamic applications. Next abstracts away the *Webpack* config and comes with **Hot Reloading** for development. Next also uses **Automatic Routing** by associating page files with routes. Additionally, Next takes care of **Code Splitting** to reduce initial page load. Pages can also be **Prefetched** with by adding a prop on the Next **Link** component. 

## NextJS Project Setup

To quickly setup a Next project use the command

```bash
npx create-next-app next-demo
```

This will setup a new project folder with the name `next-demo`, exactly like *create-react-app* would. **npx** is a command that will search the **npm registry** for the newest version of **create-next-app** and use it to build our project. This saves us from having to install next globally, which can also be done if preferred.

&nbsp;

Next projects can also be setup manually, though for this tutorial we will run the project that we built above using *create-next-app*.

```bash
cd next-demo
code .
npm run dev
```

> **Note:** the command `code .` in the terminal will open VS Code in the `next-demo` folder if you have it installed

![](C:\Users\Peter\Desktop\websites\code-boost\content\blog\next-js-setup\next_app.jpg)

You'll notice that **create-next-app** setup the following for us:

- a `pages` folder

- a `public` folder

- installed dependencies: **next**, **react**, and **react-dom**

- added next scripts: `dev`, `build`, and `start` to the package.json file.



Take some time now to look through the `index.js` file in the `pages` folder. This will be our homepage route and this file provides some examples of various **Next** features. This page will likely change with new versions of Next, but still contains examples of how to handle metadata with `next/head` and setup inline CSS styles (locally or globally) with `<style jsx>` tags.

## Pages and Routing

Each **.js** file in the `pages` folder will automatically generate a page at the route it is named, if it is a valid React component. Pages and components created this way do not need to `import React from 'react'` at the top as Next already imports this on every page. Create a new component in the `pages` folder called `about.js`

```jsx
const About = () => (
  <div>
    <h2>About Page</h2>
  </div>
);
export default About;
```

In order to link to this page, we will need to import the `Link` package and create some links. Add the following to the top of your `index.js` file

```javascript
import Link from "next/link";
```

Let's also create a **nav** section for our links

```jsx
<nav>
  <Link href="/">
    <a>Home</a>
  </Link>
  <Link href="/about">
    <a>About</a>
  </Link>
</nav>
```

Next handles links a little differently than other routing methods such as *react-router* or *Gatsby*. In Next, The `<a></a>` tag is wrapped by `<Link></Link>` tags. The main different is that the`href` property goes on the Link tag, instead of on the anchor tag. 

&nbsp;

Now that we have a link setup, visit the `/about` page. Unfortunately, our **nav** didn't come with us from the homepage. 

### Custom App Page

We can add this navigation to every page by creating a `_app.js` component, which Next will load on every route. Create this file now in the `pages` folder and add the following

```jsx
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

```

You can now also remove from `index.js` everything in the `<nav></nav>` tags and the `Link` import as we included it in `_app.js` already. By storing application state at a high level in this file, we can persist it across page loads to reduce the number of server requests. Since this component is applied on build we will need to restart our development server for it to load on every page.

## Adding Meta Tags

We can add **metadata** to our pages using the Next `Head` component. This component can be used in any page or component, let's create a `Meta` component now to add metadata that should show up on every page. (Also make sure to import this component to `Page.js` to include it in the layout)

```jsx
import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/public/favicon.png" />
      <title>Next Demo</title>
    </Head>
  );
};
export default Meta;

```

Here we added some basic site information, feel free to change the title and add more tags of your own. It also makes sense to make some page-specific meta tags for better SEO. Add the following to the `about.js` page

```jsx
import Head from "next/head";

const About = (props) => {
  return (
    <div>
      <Head>
        <title>About Page</title>
        <meta
          name="description"
          content="This is the about page for the website"
        />
        <meta
          name="twitter:description"
          content="This is the about page for the website"
        />
        <meta
          property="og:description"
          content="This is the about page for the website"
        />
      </Head>
      <h2>About Page</h2>
    </div>
  );
};
export default About;
```


Here we have another second title, *About Page*. Since we are lower in the project tree than the `Page` component, this title will overwrite our *Next Demo* title from above. This title tag shows up in the browser tab and is useful to change for specific pages. We also added description meta tags which are specific to this content. 

&nbsp;  

It makes sense to setup a SEO component which receives and includes all of this data in a template, rather than copy it out individually. This is especially true for blog posts or large numbers of pages. 

## Styles and CSS

Next.js comes with all the standard methods for using CSS. 

#### CSS

To use a `.css` stylesheet, add a standard import statement to the `_app.js` page component from earlier. These styles will get applied to every page, and it is important to only upload `.css` files here to avoid naming conflicts.

#### CSS-in-JS

Next comes with a *CSS-in-JS* syntax for inline styles that allows for creating single page components. Component-scoped style tags can be added to any component

```jsx
<div>
  <h2 className="title">This component red</h2>
  <style jsx>{`
    .title {
      color: red;
    }
  `}</style>
</div>
```

You can also add globally-scoped styles to your `Page.js` component from earlier

```jsx
<style global jsx>{`
  body {
    background: black;
  }
`}</style>
```

#### SCSS

To use a `.scss` styledsheet, first install the `sass` package with

```bash
npm install sass
```

Add an import for your `.scss` file to the `_app.js` component like you would importing a CSS file.

#### Other Methods

Next has a solution for pretty much every CSS method. There is support for **CSS Modules**, **Styled Components**, **Less**, **Stylus**, and more.

## Deployment with Now

There are two, equally simple hosting options for a **Next.js** project using **Now**. Both methods require using a Now account which you can sign up for [here]([Sign Up - ZEIT](https://zeit.co/signup)).

### Command Line Deploy

To install `Now` globally, enter the following in your terminal

```bash
npm i -g now
```

This will allow you to deploy by simply using the command `now` when inside the project you wish to deploy. If it is a new project, you will be asked to provide a name and some basic settings. Selecting the default settings for each question will deploy your Next app. You will get a hosted production link such as

```bash
https://next-test-app-seven.now.sh
```

along with some other links to your *Now* deploy overview and project settings page.

### Import Project (Now Dashboard)

In the **Now** Dashboard, there is an option for `Import Project`. This will allow you to choose a **Github**, **Gitlab**, or **Bitbucket** repository to deploy. This service will detect your build configuration and fill out the build command + start scripts automatically. Simply sit back and way for the server to deploy!