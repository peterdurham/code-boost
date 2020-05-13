---
title: Prettier Setup Guide
date: "2020-05-11 11:00:00"
category: "Tools"
description: ""
featuredImage: "./plant.webp"
tags: ["React", "JavaScript", "Tools", "Next", "Now"]
---

Prettier is a code formatter that works with several languages including CSS, JavaScript, and React. Prettier is opinionated, in that it makes certain stylistic choices for you such as when to make a new line.
&nbsp;
Prettier is one of the most useful tools over the last few years as It allows developers to focus on the logic of their code, and not the spacing. There is even an option to use Prettier whenever you save VS Code!

## Prettier Install

Add Prettier to your project with the command

```bash
npm install --save-dev prettier
```

Alternatively, you can install Prettier globally with
```bash
npm install --global prettier
```

## Format Script


2.    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json)\""     -> npm run format

## Prettier Config File

3. .prettierrc config (also link to prettier builder in docs)
4. prettier playground for setup https://prettier.io/playground/

## Prettier VSCode Extension
5. extension and    "editor.defaultFormatter": "esbenp.prettier-vscode"   AND    "editor.formatOnSave": true,   to format on save OR cmd + shift + p -> format document (in the command palette)


## Configure with ESLint
6. add "eslint-config-prettier" to the end of the extends array in prettierrc


7. prettier + eslint scripts:
"scripts": {
      "build": "babel src --out-dir dist",
    "lint": "eslint . --ignore-path .gitignore .",
    "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
    "format": "npm run prettier -- --write",
    "check-format": "npm run prettier -- --list-different",
    "validate": "npm run check-format && npm run lint && npm run build"
}