---
templateKey: blog-post
title: Build Server-side rendered React apps with NextJS
slug: next-js-basics-and-setup
date: 2020-05-11T18:00:00.000Z
dateModified: 2020-05-11T18:00:00.000Z
description: Build a Next.JS application for Server-side rendered React pages.
  Deploy to the Now cloud platform by Zeit.
featuredPost: false
category: Tools
tags:
  - React
  - Tools
  - Next
  - Now
featuredImage: /img/next_now_sign.jpg
---
### Why NextJS?

Most frontend build tools (i.e. create-react-app) are are **Client rendered** by default, and will not be optimized for Google's search engine crawlers. This problem has been solved by _NextJS_ and _Gatsby_, which are currently the most popular build tools for **Server rendering** in React. Server rendering is useful for sites like stores or blogs to rank better in SEO by sending all metadata with the initial page load.

### NextJS Features

_NextJS_ is a flexible build tool for React that specializes in creating **Server rendered** dynamic applications. Next abstracts away the _Webpack_ config and comes with **Hot Reloading** for development. Next also uses **Automatic Routing** by associating page files with routes. Additionally, Next takes care of **Code Splitting** to reduce initial page load. Pages can also be **Prefetched** with by adding a prop on the Next **Link** component.

## NextJS Project Setup

To quickly setup a Next project use the command

```bash
npx create-next-app next-demo
```

This will setup a new project folder with the name `next-demo`, exactly like _create-react-app_ would. Select the default options for any promts you might get. **npx** is a command that will search the **npm registry** for the newest version of **create-next-app** and use it to build our project. This saves us from having to install next globally, which can also be done if preferred.

&nbsp;

Next projects can also be setup manually, though we will run the project initialized above using _create-next-app_.

```bash
cd next-demo
code .
npm run dev
```

> **Shortcut:** the command `code .` in the terminal will open VS Code in the `next-demo` folder if you have it installed
> You'll notice that **create-next-app** setup the following for us:

- a `pages` folder

- a `public` folder

- installed dependencies: **next**, **react**, and **react-dom**

- added next scripts: `dev`, `build`, and `start` to the package.json file.

Take some time now to look through the `index.js` file in the `pages` folder. This will be our homepage route and this file provides some examples of various **Next** features. This boilerplate page will likely change with new versions of Next, but still contains examples of how to handle metadata and setup inline CSS styles (locally or globally).

## Pages and Routing

Each **.js** file in the `pages` folder will automatically generate a page at the route it is named, if it is a valid React component. Pages and components do not need to `import React from 'react'` at the top as Next already imports this on every component. Create a new component in the `pages` folder called `about.js`

```jsx
const About = () => (
  <div>
    <h2>About Page</h2>
  </div>
);
export default About;
```

This page will be available at the `/about` route.

### Adding dynamic pages

It is also possible to create pages based on the value of the URL parameter. Add a folder in your `pages` folder named `projects` and in that add a file named `[slug].js`. Add the following code to `[slug].js`

```jsx
import { useRouter } from "next/router";
const Projects = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <h2>{slug}</h2>;
};
export default Projects;
```

This will set load a page for us whenever a `/projects/your-slug-here` URL is hit. The name of the slug is available on `router.query` when using the `next/router` package.

### Index Page

The `index.js` file is full of boilerplate code that we can replace with the following

```jsx
import Link from "next/link";
function Home() {
  return (
    <div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/projects/first-project">
          <a>First Project</a>
        </Link>
      </nav>
      <div className="container">
        <h1>Create Next App Starter</h1>
      </div>
      <style jsx global>{`
        html,
        body {
          font-family: -apple-system, Fira Sans, Helvetica Neue, sans-serif;
        }
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        nav {
          padding: 20px 0;
          text-align: center;
          position: fixed;
          top: 0;
        }
        a {
          margin: 0 10px;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}
export default Home;
```

At the top, Next handles links a little differently than other routing methods such as _react-router_ or _Gatsby_. In Next, The `<a></a>` tag is wrapped by `<Link></Link>` tags. The main different is that the `href` property goes on the Link tag, instead of on the anchor tag.

&nbsp;

You'll notice there are also `<style jsx>` tags which contain some css. These tags are specific to the component they are declared in, unless the `global` property is added in which case they are global styles.

&nbsp;

Now visit the `/about` page and you will also realize our navigation is only available on the homepage.

### Custom App Page

We can add this navigation to every page by creating a `_app.js` file in the `pages` folder, which Next will load on every route. Create this file now in the `pages` folder and add the following

```jsx
import Layout from "../components/Layout";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
```

Also create a `components` folder and and `Layout.js` file with the following

```jsx
import Link from "next/link";
const Layout = ({ children }) => {
  return (
    <div className="container">
      <main>{children}</main>
    </div>
  );
};
export default Layout;
```

It also makes sense to switch over the navigation and global css styles code from `index.js` to `Layout.js` since it will be loaded on every page, let's do that next.

&nbsp;

If you are following along in the browser, we will need to restart our development server to use this component on every page.

## Adding Meta Tags

We can add **metadata** to our pages using the Next `Head` component. This component can be used in any page or component, let's create a `Meta.js` component now to add metadata that should show up on every page. (Make sure to import and include this component in the recently created `Layout.js` )

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

Here we added some basic site information, feel free to change the title and add more tags of your own. It also makes sense to make some page-specific meta tags for better SEO. Also replace the `about.js` page with the following

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

Here we have another second title, _About Page_. Since we are lower in the project tree than the `Page` component, this title will overwrite our _Next Demo_ title from above. This title tag shows up in the browser tab and is useful to change for specific pages. We also added description meta tags which are specific to this content.

&nbsp;

It makes sense to setup a SEO component which receives and includes all of this data in a template, rather than copy it out individually. This is especially true for blog posts or large numbers of pages.

## Other Methods for CSS

Next.js comes with all the standard methods for using CSS.

### CSS

To use a `.css` stylesheet, add a standard import statement to the `_app.js` page component from earlier. These styles will get applied to every page, and it is important to only upload `.css` files here to avoid naming conflicts.

### SCSS

To use a `.scss` styledsheet, first install the `sass` package with

```bash
npm install sass
```

Add an import for your `.scss` file to the `_app.js` component like you would importing a CSS file.

### Other CSS Methods

Next has a solution for pretty much every CSS method. There is support for **CSS Modules**, **Styled Components**, **Less**, **Stylus**, and more.

## Deployment with Now

There are two, equally simple hosting options for a **Next.js** project using **Now**. Both methods require using a Now account which you can sign up for [here](https://zeit.co/signup).

### Command Line Deploy

To install `Now` globally, enter the following in your terminal

```bash
npm i -g now
```

This will allow you to deploy by using the command

```bash
now
```

when inside the project you wish to deploy. If it is a new project, you will be asked to provide a name and some basic settings. Selecting the default settings for each question will deploy your Next app. You will get a hosted production link such as

```bash
https://next-test-app-seven.now.sh
```

along with some other links to your _Now_ deploy overview and project settings page.

### Import Project (Now Dashboard)

In the **Now** Dashboard, there is an option for `Import Project`. This will allow you to choose a **Github**, **Gitlab**, or **Bitbucket** repository to deploy. This service will detect your build configuration and fill out the build command + start scripts automatically.

&nbsp;

Simply sit back and way for the server to deploy!

### Conclusion

Next and Now is a powerhouse combination for hosting Server rendered front-end applications. **Zeit**, the team behind both projects, is often innovating and adding new features.
