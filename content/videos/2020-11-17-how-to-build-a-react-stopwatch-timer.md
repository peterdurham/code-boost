---
templateKey: video-post
videoID: sSWGdj8a5Fs
title: How to Build a Stopwatch Timer using React Hooks
slug: how-to-build-a-react-stopwatch-timer
date: 2020-11-17T15:00:00.000Z
dateModified: 2020-11-17T15:00:00.000Z
description: Code along tutorial on how to make a stopwatch timer with React hooks. Learn how to make a timer similar to one you would use on a smart phone. Great starter project for learning React basics, hooks, and the setInterval method.
featuredPost: false
category: React
tags:
  - Timer
  - Interval
  - React
  - Time
featuredImage: /img/tools_parcel_cartons.jpg
---

Code along tutorial on how to make a stopwatch timer with React hooks. Learn how to make a timer similar to one you would use on a smart phone. Great starter project for learning React basics, hooks, and the setInterval method.  
  
Code for the project is included below:

## React Code

```jsx
import React from "react";
import './App.css'

const App = () => {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <div className="Timers">
      <h2>Stopwatch</h2>
      <div id="display">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      <div id="buttons">
        {!timerOn && time === 0 && (
          <button onClick={() => setTimerOn(true)}>Start</button>
        )}
        {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
        {!timerOn && time > 0 && (
          <button onClick={() => setTime(0)}>Reset</button>
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>Resume</button>
        )}
      </div>
    </div>
  );
};

export default App;

```

## CSS Styles

```css
.Timers {
  width: 180px;
  margin: 0 auto;
  text-align: center;
}

#display {
  margin-bottom: 20px;
}
#display span {
  font-size: 36px;
}
#buttons button:nth-child(2) {
  margin-left: 8px;
}

button {
  font-size: 16px;
  background-color: rgb(217, 60, 35);
  color: #fff;
  border-radius: 8px;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
}
button:hover {
  background-color: rgb(173, 47, 28);
}
button:active {
  background-color: rgb(130, 35, 21);
}
button:focus {
  outline: 0;
}
```