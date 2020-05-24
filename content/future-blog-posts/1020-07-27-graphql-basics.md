---
title: GraphQL Basics
date: "2020-05-11 11:00:00"
category: "GraphQL"
description: "Basic GraphQL tutorial explaining the query language, schema, resolvers, mutations, and more."
featuredImage: /img/graphql_basics.jpg
tags: ["GraphQL", "Basics"]
---

## What is GraphQL?
**GraphQL** is a *query language* for building and consuming APIs. It is an improvement to using REST APIs as GraphQL includes all the necessary data in a single endpoint.  
&nbsp;  
By connecting to a GraphQL server, you can make queries in the browser against the data graph. Queries can then be copied into code directly and called as arguments in JavaScript clientside. 

## Why use GraphQL?

GraphQL is a query language which effectively replaces REST APIs. While it isn't always good to rush into new technologies, of all the developers surveyed by State of JS 2019, [90% would use GraphQL](https://2019.stateofjs.com/data-layer/graphql/). Many companies are already adopting it in their web stack including these [major companies using GraphQL](https://graphql.org/users/).  
&nbsp;  
Even if you are only comfortable with REST APIs or have no experience on the back end, GraphQL's rapid adoption makes it worth putting the time and effort in to understand.   
&nbsp;  
GraphQL is a developer friendly language because it allows you specify the exact shape of your API request. For example, here is a query for a website's `name` and `url` in GraphQL

```graphql
{
  website {
    name
    url
  }
}
```
which returns JSON data similar to a REST API

```graphql
{
  "website": {
    "name": "Code-Boost"
    "url": "https://www.code-boost.com/",
  }
}
```

In GraphQL the query and response take the same shape, making it easier to interact with the data.

## Concept: Schema/TypeDefs

To setup a GraphQL server we first need to define the types we will use, and the fields on those types. This is called a **schema** or **type definitions** in GraphQL, and is similar to setting up models for MongoDB. Here is an example type you might see in a schema

```graphql
type Book {
  title: String!
  author: Author!
  characters: [Character!]!
}
```

In this example `Book` is a **GraphQL Object Type** aka a type with fields. Object type is the most common type in a schema. Each field will have either an **object type** or a **scalar type** for its value.  
&nbsp;  
There are 3 **fields** on this type: `title`, `author`, and `characters`. Here `String!` is a scalar type because it resolves to a single value and can't have subfields. The `!` at the end of `String!` means that is **non-nullable**, always returning a value when queried.  
&nbsp;  
The field value of `author` is actually another object type similar to books, and will also have to be declared as a type somewhere else in the schema.  
&nbsp;   
Using brackets in a field value represents an array of objects like in `[Character!]!`. In this value, the inner `!` indicates that each individual entry in the array is non-nullable. The outer `!` makes the array non-nullable, meaning the `characters` field must return an array (empty or not).

## Concept: Resolvers

In GraphQL we also have **resolvers**, which are functions that populate the data for your schema's fields. Resolvers are mostly used to store the logic of your queries and mutations. A **query** in GraphQL is essentially a `GET` request for data, returning the fields specified. A **mutation** is the equivalent of a `POST` request, sending data to the backend to make changes.  
&nbsp;   
Each resolver in GraphQL is similar to an individual API endpoint in Express. Resolvers have access to the arguments passed along, calling database methods, and local user context for authentication. 

## Using GraphQL and Further Reading
GraphQL has been live in the wild for several years now, and there are more and more projects implementing it in their stack.
### Gatsby
One of the best ways to get started learning GraphQL is with [Gatsby](https://www.gatsbyjs.org/) which uses it by default. Check out [Using GraphQL in Gatsby](https://www.code-boost.com/using-graphql-in-gatsby/) to learn how GraphQL works with Gatsby.  
&nbsp;
### Apollo
Another recommended option is to learn how to use Apollo. [Apollo](https://www.apollographql.com/docs/) is an open source platform for using GraphQL on both the backend and frontend. Apollo also has an extremely accessible [full-stack demo tutorial](https://www.apollographql.com/docs/tutorial/introduction) which is great for quickly setting up an example application. Also check out this more simplified [Apollo Server Setup](https://www.code-boost.com/apollo-server-setup/) tutorial to build a basic database connected server.












