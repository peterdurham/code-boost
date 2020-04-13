---
title: How to Build a Stopwatch Timer Using React
date: "2015-05-06T23:46:37.121Z"
category: "React"
description: "Learn how to setup and deploy a stopwatch timer using setInterval in a React JavaScript project."
featuredImage: "./clocks.jpg"
tags: ["React", "Timer", "Tutorial"]
---

> In this tutorial we will be using React to build a stopwatch timer. This timer will utilize JavaScript intervals to keep track of time and can start, stop, resume, and reset.

IMAGE HERE

### Setup

To start, I will use `create-react-app` to build our basic project files. Make sure you first have [Node](https://nodejs.org/en/download/) installed then enter the command

```bash
npx create-react-app timer-demo
```

This command will retrieve the latest version of the `create-react-app` package from the NPM registry and use it to create a project in the `timer-demo` (or whatever name you chose) folder.

We can now clear out the boilerplate **create-react-app** code in `app.js` and create a `Stopwatch` component to track and display the elapsed time. In this tutorial we will be using a `class` component however you can also use a `functional` component with **Hooks**.

```jsx
import React from "react";
import "./app.css";

function App() {
  return(
    <div className="App">
      <Stopwatch />
    </div>
  )
}
class Stopwatch extends React.Component {
  render() {
    return(
      <div className="Stopwatch">
        <h2>Stopwatch</h2>
      </div>
    )
  }
}
export default App;
```

## Goal

The stopwatch will operate like a standard stopwatch, starting at zero with the ability to start, stop, and reset. The **elapsed time** will be displayed along with buttons to control the watch.

### Adding State

We will be keeping track of three variables in *React* state

`timerOn`: whether or not the timer is on (boolean)
`timerStart`: time in ms after 1970 when the timer started (or projected time if resumed)
`timerTime`: total time (ms) that the timer has been running (since start/reset)

Add the following state code to the top of your `Stopwatch` component:

```jsx
state = {
  timerOn: false,
  timerStart: 0,
  timerTime: 0
}
```

### Starting the timer

We can set intervals in **JavaScript** with the `setInterval` method. Let's setup a method that updates the time every 10ms when it is called. Add the `startTimer` method to your **Stopwatch** component underneath the state declaration.

```jsx
startTimer = () => {
  this.setState({
    timerOn: true,
    timerTime: this.state.timerTime,
    timerStart: Date.now() - this.state.timerTime
  });
  this.timer = setInterval(() => {
    this.setState({
      timerTime: Date.now() - this.state.timerStart
    });
  }, 10);
};
}
```

The `startTimer` will be called when the timer is started or resumed. It will use the `setState` method to turn the timer on, set the timer to represent the current time, and initialize the start time. Subtracting this.state.timerTime from Date.now() will set our start time either to when the timer was started, or what that time would have been if the timer is resumed.

Next in the `startTimer` function we initialize a timer interval with `this.timer` which sets the timer interval to the Stopwatch component. This interval needs to return a method to call every time it goes off, and an interval time. In our return we can call `this.setState` to adjust the current `timerTime` to the number of miliseconds since `timerStart`.

### Stop and Reset

Now that the stopwatch start logic is set up, we can add in functions for stop and reset below startTimer

```jsx
stopTimer = () => {
  this.setState({ timerOn: false });
  clearInterval(this.timer);
};
resetTimer = () => {
  this.setState({
    timerStart: 0,
    timerTime: 0
  });
};
```

In the stopTimer method, we are setting timerOn to false and clearing the interval on this.timer.

The resetTimer method returns the timerStart and timerTime back to 0.

## Formatting and Display

With all the functionality we need for a timer in order, we need a way to display the current time in hours, minutes, seconds, and centiseconds. Add the following code to Stopwatch.js inside the render() method, above the return

```javascript
const { timerTime } = this.state;
let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
```

We have the value of the time we want to display stored in milliseconds in our state. First, we can destructure the timerTime to save so complexity. We are simply setting the variable this.state.timerTime to timerTime.

The modular arithmetic we are using here is finding the remainder of each unit of time we are using.

- centiseconds - 10 represents 1/100th of a second
- seconds - 1000 represents 1/60th of a minute
- minutes - 60000 represents 1/60th of an hour
- hours - 3600000 doesn't need a modulus if <100 hours

We are also formatting the times to display as 2 digits by concatenating a “0” on the front then slicing off the end if its more than 2 digits long.

Underneath our stopwatch header in theStopwatch.js return statement, we can display our computed time variables by add the code:

```jsx
<div className="Stopwatch-display">
  {hours} : {minutes} : {seconds} : {centiseconds}
</div>
```

### Adding Controls

Lastly for the Stopwatch, we will need buttons to start, stop, resume, and reset. We can conditionally render all 4 buttons depending on the status of the timer under our stopwatch-display.

```jsx
{this.state.timerOn === false && this.state.timerTime === 0 && (
  <button onClick={this.startTimer}>Start</button>
)}
{this.state.timerOn === true && (
  <button onClick={this.stopTimer}>Stop</button>
)}
{this.state.timerOn === false && this.state.timerTime > 0 && (
  <button onClick={this.startTimer}>Resume</button>
)}
{this.state.timerOn === false && this.state.timerTime > 0 && (
  <button onClick={this.resetTimer}>Reset</button>
)}
```

Buttons:
`Start` - Show when the timer is off and the time is 0
`Stop` - Show when the timer is on
`Resume` - Show when the time is on, and the time is not 0
`Reset` - Show when the timer is off, and the time is not 0

Now that the Stopwatch is complete, we can start working on the Countdown Timer. The concepts used the Countdown timer will be very similar, try making this one yourself or follow along below.