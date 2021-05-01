import moment from "moment";
import React from "react";
import {
  BreakSessionContainer,
  BreakSessionLabel,
  BreakSessionTime,
  PlusMinusButton,
  PlusMinusTimeContainer,
} from "../ui/BreakSessionUi";

// React.FC tells typescript that Session is a react funtional component
// then Props from bottom of page is parsed
const Session: React.FC<Props> = ({
  // destructure the props passed in App.js
  sessionLength,
  decrementSessionLengthByOneMinute,
  incrementSessionLengthByOneMinute,
}) => {
  // duration function from the js library 'moment' which converts a given time and
  // it's unit to the unit format you want. Hence, sessionLength variable is in seconds
  // we want to convert that to minutes and initialise it to another variable
  const sessionLengthInMinutes = moment
    .duration(sessionLength, "s")
    .asMinutes();

  return (
    <BreakSessionContainer>
      <BreakSessionLabel id="session-label">Session Length</BreakSessionLabel>
      <PlusMinusTimeContainer>
        {/* decrease time by 60sec */}
        <PlusMinusButton
          id="session-decrement"
          onClick={decrementSessionLengthByOneMinute}
        >
          -
        </PlusMinusButton>
        {/* Session length */}
        <BreakSessionTime id="session-length">
          {sessionLengthInMinutes}
        </BreakSessionTime>
        {/* increase time by 60sec */}
        <PlusMinusButton
          id="session-increment"
          onClick={incrementSessionLengthByOneMinute}
        >
          +
        </PlusMinusButton>
      </PlusMinusTimeContainer>
    </BreakSessionContainer>
  );
};

// This describes the shape of the props that are expected to go into the
// Session function
type Props = {
  sessionLength: number;
  // functions which take no parameters and have no return value
  decrementSessionLengthByOneMinute: () => void;
  incrementSessionLengthByOneMinute: () => void;
};

export default Session;
