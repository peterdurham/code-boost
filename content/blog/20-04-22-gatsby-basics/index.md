---
title: How to Setup a GatsbyJS Project
date: "2020-04-22 11:00:00"
category: "Tools"
description: "Gatsby is a static-site generator build tool. Overview of build files and various starer templates."
featuredImage: "./night-photograph.jpg"
tags: ["Gatsby", "Setup", "React", "Tools"]
---

Gatsby is a build tool for setting up **Static React Applications**. It uses `server-side rendering` and is great for creating blogs sites.  

&nbsp;

Gatsby code is generated on build which is a great performance benefit of using a static site.  

&nbsp;

To start with **Gatsby** first install `gatsby-cli` globally with

```bash
npm install -g gatsby-cli
```

## Default new project

Once `gatsby-cli` is installed, you can create new **gatsby** projects with the command `gatsby new project-name`. In this tutorial we will use a starter instead which is the same command with a Gatsby starter url at the end.

&nbsp;

**Gatsby** will use `gatsby-starter-default` by default to generate the project code. There are other starters you can use, and this is generally the simplest route to get familiar.

### Starters

Starters in **gatsby** are git repositories which contain boilerplate project code. All of the starters can be found in the [Gatsby Starter Library](https://www.gatsbyjs.org/starters/). Some of the most favorited starters include

| Starter name                 | Description                 |
| ---------------------------- | --------------------------- |
| **gatsby-starter-default**     | simple and quick starter    |
| **gatsby-starter-blog**        | basic markdown blog setup   |
| **gatsby-starter-netlify-cms** | example Netlify CMS project |
| **gatsby-advanced-starter**    | includes advanced use cases |
| **gatsby-material-starter**    | basic material design setup |

There are hundreds of `gatsby` starters available and new ones introduced all the time. For this tutorial we will be using `gatsby-starter-blog` as it includes the default project as well as a basic `markdown` blog setup (one of gatsby's best features).

### New Blog Project

To create a project using a specifc starter, simply add the URL for the starter's git repo after the project name

```bash
gatsby new blog-project https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/
```

Once the project is created, change directories into it and start up the application in the browser by entering

```bash
cd blog-project
gatsby develop
```

This will run your **gatsby** project in the browser at `http://localhost:8000`.

> **Success**: The gatsby build tool is similar to create-react-app as it will create a ready to deploy React application which can also be developed on locally. The rest of this tutorial will describe basic files and features in a gatsby-starter-blog project.

## Project Structure

The **gatsby** blog starter will create the following folders along with various other files

```bash
content/
- assets/
- blog/
src/
- components/
- pages/
- templates/
- utils/
static/
```

Gatsby projects use standard files you will see in other **React** applications such as `package.json`, `prettierrc`, `README.md`, and `.gitignore`. They also include 3 **gatsby-specific** files in the root of each gatsby project: `gatsby-browser.js`, `gatsby-config.js`, `gatsby-node.js` which will be described later.

## Blog content folder

This is where using `gatsby-starter-blog` really saves us a bunch of time. Here we have `assets` and `blog` folders.

### Assets

Here we can store assets such as images to be used in our project. Gatsby handles and optimizes images slightly differently that `create-react-app` with its `Image` component, although we can still import images the normal way (i.e. `import DogImage from '../assets/dog.jpg'`). 

### Blog

This is where we can store all of our blog `markdown` content. Each folder in `/blog` will contain a specific blog post and create a page at the endpoint of the blog post's folder name.

&nbsp;

It is recommended to use `kebab case` for blog posts and include a `index.md` file in each post. Each `markdown` file will also include details about the post at the top. Blog post folders can also include image's associated with that post.

## React src/ folder

This is the folder where you will build your **React** components, individual pages, templates, and util functions.

### components

Include your standard **React** components here. By default, there will be `SEO` and `bio` components which come with some examples of gatsby best practices and can be reused across pages and posts. 

&nbsp;

The `layout` component is also here and will be rendered on every page in the application. This is a way to create standard formatting and is already styled by default. Definitely get used to adjusting the styles and setup in this component.

### pages

Every `.js` file here will generate a page at that endpoint by default. This is a great place to create custom *one-off* javascript pages in your application.

&nbsp;

This folder also contains your `index.js` file which is the component that will render when the user visits the root of your site at `/`. This file includes the `layout` component and also provides good examples of best practices. Lastly is the `404` page which is served whenever the user visits a page that does not exist.

### templates

Templates are reusable layouts in `gatsby`. This project starts with a `blog-post.js` template that is rendered for every markdown file in the posts located at `content/blog/post-name/index.md`. 

&nbsp;

New templates can be added to this folder and specified in the `gatby-node.js` file we will soon go over.

### utils

Lastly in the `src` folder is the folder for our utility functions. By default, **gatsby** uses the `typography.js` file to import fonts for the application.

### static folder

The `static` folder is where we can include some of our static assets for the project. This is where our `favicon.ico` and `robots.txt` files live and can be configured.

## Gatsby files

Each gatsby project comes with and requires the following 3 **gatsby** files.

> **Note**: If you make changes in any of these 3 files, make sure to restart your gatsby project as this data is collected when the project is built.

### Gatsby Browser

The `gatsby-browser.js` file lets you respond to actions within the browser, and wrap your site in additional components. By default, this file only includes imports for various `typefaces` and a `prism` theme.  

### Gatsby Config

The `gatsby-config.js` file defines your site's metadata, plugins, and other general configuration details. Make sure to include any additional plugins that you install here. Most plugins can be used by adding a string with the plugin's name or an object specified in the [plugins docs](https://www.gatsbyjs.org/plugins/).

### Gatsby Node

The `gatsby-node.js` file is used to dyamically *create pages* and add nodes in `GraphQL`. This file contains the code which takes each of the blog posts and creates a node and page dynmically to render the markdown using the `blog-post` component. This file does a lot of heavy lifting and is where all of the **gatsby** templating logic is added. 

### Conclusion

Gatsby is a great tool for easy-to-setup `server-side rendering` in a **React** application. It is often the go-to build tool for static projects as it compiles the entire site on build time. While this approach can potentially run into issues at scale, it is often the ideal way to build a SSR React project with under 1000 pages. Gatsby's vast libaries of `plugins`, `starters`, and `themes` make it a powerhouse tool for generating fast, crawlable websites.