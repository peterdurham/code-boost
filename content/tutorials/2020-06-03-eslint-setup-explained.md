---
templateKey: blog-post
title: ESLint Setup Explained
slug: eslint-setup-explained
date: 2020-06-03T14:42:12.642Z
dateModified: 2020-06-03T14:42:11.561Z
description: Install and configure ESLint for static error checking in
  JavaScript. Setup a default project and add plugins for various libraries.
featuredPost: false
category: Tools
tags:
  - ESLint
  - Tools
  - Setup
  - Testing
featuredImage: /img/es_lint_setup.jpg
---
ESLint is a tool for establishing and enforcing patterns across a project to make code
more consistent. It is a great tool to help enforce and clean up messy code.

## ESLint Install

ESLint works with any JavaScript projects that use **Node** (10.12 or above). Install
ESLint in your project as a developer dependency with

```bash
npm install eslint --save-dev
```

## ESLint Config Setup

ESLint is highly configurable, giving us the ability to turn on or off any of the rules
that it enforces. For a basic setup, create a `.eslintrc` file now in the root level of
your project and add the following

```json
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": ["eslint:recommended"],
  "rules": {},
  "env": {}
}
```

### Parser

The first settings object, **parserOptions** is where we provide ESLint with information
about what version of JavaScript / ECMAScript we are using. In this case, we are using the
most recent ECMA version 2019, with ES Modules and JSX support.

### Extends

The **extends** option is an array of rulesets that we want to apply to our project. These
plugins are applied one after the other, so the later extensions will potentially
overwrite previous ones.  
&nbsp;  
To get started, I have added `eslint:recommended` which includes the basics. This is where
you can also add plugins for libraries like _React_, _Prettier_, etc.

### Rules

Each extends option applies a set of rules. We can overrwrite any specific rules we like
in the **rules** object like so

```json
{
  "rules": {
    "indent": ["error", 2],
    "comma-dangle": ["error", "always"]
  }
}
```

Each property override accepts an array of two options: the severity of the error, and
when to enforce the rule. Depending on the rule, the first value is generally `"error"` or
`"warn` while the second value is `"always"`, `"none"`, a numerical value, etc. If you
ever find a specific rule that you don't agree with, or want to enforce, include it
here.  
&nbsp;  
If you only need to turn off a rule, not overrwrite it, add this syntax instead

```json
{
  "rules": {
    "no-inline-comments": "off",
    "init-declarations": "off"
  }
}
```

### Disabling Rules

You can disbale particular instances of rules in code with the single and multiline ESLint
disable

```javascript
const brokenCodeHere; // eslint-disable-line no-unused-vars
```

or with a multiline ignore

```javascript
/*eslint-disable */
console.log("This won't break lint rules")
/*eslint-enable */
```

Turning off rules can be helpful for dealing with unnecessary or annoying indivdual cases.
It is generally recommended to learn why a rule is broken and fix it, though this is
always an option as well.

### Environments

The **Env** object specifies which environments we will be working in, which is generally
the **browser**, **node**, or both. Specify the environents you are using in the **env**
object like this

```json
{
  "env": {
    "browser": true,
    "node": true
  }
}
```

## Adding ESLint Ignore

ESLint will run for every file in the project unless we specify to ignore certain ones.
This is useful to avoid linting our dependencies and build folder. We can use the
`.gitignore` file to do, if you haven't already create one now and specify the folders you
don't want to lint

```bash
node_modules
dist
```

## Adding a Lint Script

In order to lint in the command line, add add lint script to your `package.json`

```json
{
  "script": {
    "lint": "eslint --ignore-path .gitignore ."
  }
}
```

This script will run **eslint** on every file, ignoring those in the `.gitignore`. &nbsp;
Run this script with `npm run lint` or `npx eslint .` to display any warnings and errors
in the command line.

## ESLint Extension

There is a great extension you can install in VSCode that showing lint errors called
**ESLint**

![ESLint extension](/img/eslint_vscode_extension.jpg)

There is no additional configuration, and you should be able to see it working if you have
any code that breaks your lint rules. It will even make files with errors and warnings in
them show up as red on the sidebar.  
&nbsp;  
This extension also allows you to sometimes fix, or disable rules in the editor as well.
Hover over a red-underlined linting error and press `CMD + .` to see a dropdown of
options.

### Conclusion

In general **ESLint** is excellent at identifying large numbers of errors or
inconsistencies in our code. This package can provide a great deal of resilience to your
applications with minimal amount of setup.
