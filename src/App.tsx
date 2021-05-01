import React, { useState, useEffect, useRef } from "react";
import "./assets/main.css";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

function App() {
  // react reference to audio
  const audioElement = useRef<HTMLAudioElement>(null);
  // create and initialise a breakLength/sessionLength state that users can modify
  // later when buttons are added. This returns a tuple where the
  // first value is breakLength/sessionLength and second is setBreakLength/
  // setSessionLength variable
  // set default as 5mins
  const [breakLength, setBreakLength] = useState(60 * 5);
  // set default as 25mins
  const [sessionLength, setSessionLength] = useState(60 * 25);

  // create and initialise flag variable to track whether it's a session or break
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  // intervalId set to null as timer not started.
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  // initialise time left state to be session length
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  // function which takes in a callback that is called whenever a variable that you are
  // listening on changes. In this instance, change timeLeft whenever sessionLength changes
  useEffect(() => {
    setTimeLeft(sessionLength);
    // array is dependency list with all vairables we're listening on
  }, [sessionLength]);

  // listen to timeLeft changes
  useEffect(() => {
    // if it is 0
    if (timeLeft === 0) {
      // play the audio, use of optional chaining (?) to say that if it's null,
      // don't run it, otherwise continue to run the code below it
      audioElement?.current?.play();
      // if it's a session, switch to break and setTimeLeft to breakLength
      if (currentSessionType === "Session") {
        setCurrentSessionType("Break");
        setTimeLeft(breakLength);
        // if break, switch to session, switch to session and setTimeLeft to sessionLength
      } else if (currentSessionType === "Break") {
        setCurrentSessionType("Session");
        setTimeLeft(sessionLength);
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeLeft]);

  // ------------------------ BREAK ------------------------ //
  // function which decrements the breakLength by 1 min
  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    // only initialise setBreakLength if newSetBreakLength is more than 0
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };

  // function which increments the breakLength by 1 min
  const incrementBreakLengthByOneMinute = () => {
    // break cannot go over 60
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength);
    }
  };

  // ------------------------ SESSION ------------------------ //
  // function which decrements the sessionLength by 1 min
  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    // only initialise setSessionLength if newSetSessionLength is more than 0
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };

  // function which increments the sessionLength by 1 min
  const incrementSessionLengthByOneMinute = () => {
    // session cannot go over 60
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60) {
      setSessionLength(sessionLength + 60);
    }
  };

  // ------------------------ TIMER ------------------------ //
  // if the clock is running intervalId should not be null
  const isTimeStarted = intervalId != null;
  // function which deals with the start and stop buttons
  const handleStartStopClick = () => {
    // if timer is running, allow timer to be stopped by clearing the intervalId which
    // stops the function from calling and set interval to null
    if (isTimeStarted) {
      // if intervalId exists
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);

      // else in stop mode, allow the timer to be started and do usual funtion
    } else {
      // setInterval function takes funtion (prevTimeLeft) as 1st param and number in ms
      // (1000) as 2nd param. Number in ms determines how often function in 1st param is
      // called
      const newIntervalId = setInterval(() => {
        // initialise setTimeLeft variable
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        // decrement timeLeft by 1 every second (1000ms)
      }, 1000);
      // new interval get set as the id
      setIntervalId(newIntervalId);
    }
  };

  // ------------------------ RESET ------------------------ //
  const handleResetButtonClick = () => {
    // reset audio
    audioElement?.current?.load();
    // if intervalId exists
    if (intervalId) {
      // stop timer by clearing the timeout interval
      clearInterval(intervalId);
    }
    // set intervalId to null to show no timer is running
    setIntervalId(null);
    // set sessionType to 'Session'
    setCurrentSessionType("Session");
    // reset the sessionLength to 25 mins
    setSessionLength(60 * 25);
    // reset breakLength to 5 mins
    setBreakLength(60 * 5);
    // reset timer to 25 mins (initial session length)
    setTimeLeft(60 * 25);
  };

  return (
    <div className="flex flex-col h-screen items-center bg-indigo-900">
      <h1 className="text-gray-300 font-bold font-clock text-4xl mt-10 mb-20 mr-5">
        Pomodoro Clock
      </h1>
      <div className="flex w-full justify-around">
        {/* construct props to pass in Break.jsx component */}
        <Break
          breakLength={breakLength}
          decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
          incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
        />
        {/* construct props to pass in TimeLeft.jsx component */}
        <TimeLeft
          handleResetButtonClick={handleResetButtonClick}
          timerLabel={currentSessionType}
          handleStartStopClick={handleStartStopClick}
          startStopButtonLabel={isTimeStarted ? "Stop" : "Start"}
          timeLeft={timeLeft}
        />
        {/* construct props to pass in Session.jsx component */}
        <Session
          sessionLength={sessionLength}
          decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
          incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
        />
      </div>
      <audio id="beep" ref={audioElement}>
        <source
          src="https://onlineclock.net/audio/options/default.mp3"
          type="audio/mpeg"
        />
      </audio>
      <footer className="mt-10 mr-5 text-gray-300 text-xs flex items-center">
        Made with &#10084; by&nbsp;
        <a href="https://github.com/lennoxstark47">twisam</a>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="github"
          className="svg-inline--fa fa-github fa-w-16 fa-2x h-4 w-4 ml-1"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
        >
          <path
            fill="currentColor"
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          ></path>
        </svg>
      </footer>
    </div>
  );
}

export default App;
