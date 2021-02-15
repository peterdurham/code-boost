---
templateKey: blog-post
title: How to Make a Bitcoin Price Display with HTML and React
slug: bitcoin-price-display
date: 2021-02-15T15:00:00.000Z
dateModified: 2021-02-15T15:00:00.000Z
description: Learn how to setup a bitcoin price display using HTML and React. Query price data from Coindesk API using fetch.
featuredPost: true
category: JavaScript
tags:
  - Bitcoin
  - Fetch
  - HTML
  - JavaScript
  - React
featuredImage: /img/bitcoin_price_display.jpg
---


There are many free public APIs that you can use to display the Bitcoin price.  
<br />
In this tutorial, we'll use the **fetch** method to query this data using an **HTML file** and a **React app**.

![Bitcoin Price](/img/bitcoin_price_example.jpg)

## Finding the API Endpoint

In order to display the bitcoin price, we'll need to query this data from an API. In this example we'll use the [Coindesk Price API](https://www.coindesk.com/coindesk-api).  
<br />
The endpoint for current price is available at:

```bash
https://api.coindesk.com/v1/bpi/currentprice.json
```
You can test the response in the browser to make sure it's working and see how the data is formatted.

## Price Display with HTML (and JavaScript)

We can display this price data on a webpage by making an **html** file with the following code and opening it in the browser.
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Bitcoin Price Display</title>
  </head>
  <body>
    <div style="text-align: center;">
      <h1>Bitcoin Price:</h1>
      <p style="font-size: 24px;"></p>
    </div>
    <script>
      // Fetches the data from Coindesk
      fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((response) => response.json())
        .then((data) => setPrice(data.bpi.USD.rate_float));

      // Formats the price and sets it in the paragraph tag
      function setPrice(price) {
        document.querySelector("p").innerText =
          "$" + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      }
    </script>
  </body>
</html>
```
In this webpage we are doing three main things:

- 1. Adding html elements for the **label (h1)** and **price (p)**
- 2. Fetching the **data object** from the coindesk API
- 3. Adding the **formatted price** to the paragaph tag

In this example endpoint, we can access the current bitcoin price with `data.bpi.USD.rate_float`. These object properties can be traversed by initially using **console.log** with the data response, or viewing the API response in the browser.  
<br />
The `replace()` function above uses a **regex** pattern to format a number with commas if it has 4 or more digits (i.e. 1,000,000).  
<br />
This is a basic example of how to make a bitcoin price display using JavaScript to retrieve the price and set it on the webpage. 

## Price Display with React

We can setup the same functionality in React using the **useState** and **useEffect** hooks.  
<br />
Create a new React project now or load an existing one. I'll be working in a **create-react-app** project using the **App.js** file. Feel free to follow along in any type of React setup using the component of your choice.  
<br />
Add the following code to your component:

```jsx
import React from "react";

const App = () => {
  const [price, setPrice] = React.useState(null);

  React.useEffect(() => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => response.json())
      .then((data) => setPrice(format(data.bpi.USD.rate_float)));
  }, []);

  function format(price) {
    return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Bitcoin Price</h1>
      {price && <p style={{ fontSize: "24px" }}>${price}</p>}
    </div>
  );
};

export default App;
```

You'll notice this setup is similar to the JavaScript version. We are retrieving our price data with the **useEffect** hook and storing it with **useState**.  
<br />
I have separated the **format** function for simplicity which will format money amounts.  
<br />
The price line in our JSX is also conditionally rendered if the price is loaded. This will prevent a dollar sign from appearing before the price is ready.
<br />  
Check out [Different Methods to Fetch Data with React](https://www.code-boost.com/fetch-data-with-react/) to learn more about fetching data using React.

