---
templateKey: blog-post
title: Using GraphQL in your Gatsby sites
slug: using-graphql-in-gatsby-sites
date: 2020-05-25T18:08:08.031Z
dateModified: 2020-05-25T18:08:08.544Z
description: Gatsby tutorial to setup GraphQL queries in a blog application.
  Overview of graphql in Gatsby, page queries, and static queries.
featuredPost: false
category: GraphQL
tags:
  - Gatsby
  - GraphQL
  - React
featuredImage: /img/graphql_gatsby_twilight_road.jpg
---
## What is Gatsby?
Gatsby is a React framework for generating serverside rendered applications. Gatsby is opinionated, in that it uses GraphQL by default to access interal dependencies such as images or blog posts. It is an excellent tool for setting up static pages, as well as for learning GraphQL which is currently seeing [rapid adoption](https://2019.stateofjs.com/data-layer/graphql/).
&nbsp;
## What is GraphQL?
GraphQL is a query language for APIs that allows the developer to specify exactly which data they need from the server. It works by connecting a single endpoint to a graph representation of the data. GraphQL is typed, self-documenting, and often preferable to REST when using lots of API endpoints.

## Gatsby Setup
In this tutorial we will be using the [Gatsby blog starter](https://github.com/gatsbyjs/gatsby-starter-blog) which is the most popular Gatsby starter, written by [Kyle Matthews](https://twitter.com/kylemathews). This starter has lots of GraphQL queries already written for us to reference and learn from. Setup up a new Gatsby project now by first installing the command line tool
```bash
npm install -g gatsby-cli
```
This will allow you to start a new gatsby project with the command `gatsby new project-title` with an optional fourth argument of the link to the starter repo you want to use. Start a new Gatsby blog now by entering the command
```bash
gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog
```
> In this tutorial we will mostly be focused on the GraphQL queries rather than the React or blog code itself. If you want to learn more about Gatsby in general, check out [this tutorial](https://www.code-boost.com/gatsby-basics/) for the basics.

You can start the project by changing into the project folder and using the command
```bash
gatsby develop
```

## Writing Queries (GraphQL Playground)
Running a Gatsby app will start up a development server as usual, in addition to a **GraphiQL** playground to navigate your project's dependency graph. Open this in the browser now at
```bash
http://localhost:8000/___graphql
```

In this tool we can write queries on the left and run them on the right. At the far right of the screen there is documentation for our GraphQL queries.  
&nbsp;  
  
Click on the **Query** link under *ROOT TYPES* to view all of the queries we have available along with their inputs. Since GraphQL is a **typed** language, we can view the inputs for each query and whether they are required.  
&nbsp;  
We can write our first query now with the following syntax (the word query is optional)
```bash
query {

}
```
Place your cursor in between these brackets and you will notice if you press **Ctrl + Space** or **Shift + Space** you will have a dropdown autocomplete with the available queries. This feature greatly increases the speed of development and capacity to traverse large APIs efficiently.  
&nbsp;  
Select `site` now and you will notice there is a red underline under it. This is because the field does not have a specific value associated with it to return. In this case, `site` is similar to a folder that we're required to specify at least 1 file in.   
&nbsp;  
Open a new set of brackets and you will notice there is another list of available fields to query. Valid GraphQL queries require you to return specific values. Here we can select `port`, and underneath it `buildTime` so the query looks like
```graphql
query {
  site {
    port
    buildTime
  }
}
```
Run the query by clicking on the play button and you should see 
```json
{
  "data": {
    "site": {
      "port": 8000,
      "buildTime": "2020-05-06T15:03:46.000Z"
    }
  }
}
```
Once we have specified the data we're looking for to Gatsby using GraphQL, it will return a JSON representation of that exact data. This is great because it allows developers to focus more on the shape of their API, rather than how they will write queries.

## Query Data in Gatsby
There are a few different syntaxes to be aware of for setting up queries in Gatsby
### pageQuery
This query works on pages, and can accept context variables unlike static queries. Open up the `index.js` file inside the **pages** folder to see an example of this. At the bottom of the page, below the React component you will see something like

```jsx
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
```

Gatsby uses GraphQL to query and return the specified information into a props variable `data` which can be used in the component.  
&nbsp;  
In this query, the field `allMarkdownRemark` loads in the blog post content. This Gatsby blog starter is already set up to build a page in our site for *each folder* in `content/blog`.   
&nbsp;  
This query also contains **edges** and **nodes** which are a key concept to graphs. Edges refers to an array of nodes, while Node refers to an invididual entry in that array. The `frontmatter` field above will pull in the metadata which is at the top of each example markdown file in the blog.

### useStaticQuery
This method is a hook for using GraphQL in any functional component. This query can be included inside the component itself, unlike the page query component which goes below it. If you open the `bio.js` component you will see an example `useStaticQuery` hook

```jsx
 const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)
```

In this example we have a named query `BioQuery` (query names are arbitrary and optional) that returns an avatar and data about the site. The syntax `avatar: ` is similar to aliasing parameters in ES6 by setting the `file` field to `avatar`. Here there is also an `absolutePath` regex string is passed into the file query which will attempt to match the specific file.  
&nbsp;  
Under `avatar` we also have a field `childImageSharp`. Gatsby does a lot in the background to optimize and serve multiple image sizes in your project. There is plenty to learn about the image component which could be a tutorial in and of itself. For now, it is at least important to be aware that this is how the images are loaded, and that `childImageSharp` currently **does not work** in the GraphIQL playground in the browser because it uses a **fragment** (i.e. ...GatsbyImageSharpFixed). If you are having issues running queries such as the one above, make sure to temporarily replace or remove this fragment from the query. 

### Conclusion

Gatsby is a pioneering modern web framework that is doing a lot right in terms of making serverside rendering and GraphQL more approachable. I highly recommend building Gatsby sites as an intro to learning more about GraphQL. 