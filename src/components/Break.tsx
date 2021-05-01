import moment from "moment";
import React from "react";
import {
  BreakSessionContainer,
  BreakSessionLabel,
  BreakSessionTime,
  PlusMinusButton,
  PlusMinusTimeContainer,
} from "../ui/BreakSessionUi";

// React.FC tells typescript that Break is a react funtional component
// then Props from bottom of page is parsed
const Break: React.FC<Props> = ({
  // destructure the props passed in App.js
  breakLength,
  decrementBreakLengthByOneMinute,
  incrementBreakLengthByOneMinute,
}) => {
  // duration function from the js library 'moment' which converts a given time and
  // it's unit to the unit format you want. Hence, breakLength variable is in seconds
  // we want to convert that to minutes and initialise it to another variable
  const breakLengthInMinutes = moment.duration(breakLength, "s").asMinutes();

  return (
    <BreakSessionContainer>
      <BreakSessionLabel id="break-label">Break Length</BreakSessionLabel>
      <PlusMinusTimeContainer>
        {/* decrease time by 60sec */}
        <PlusMinusButton
          id="break-decrement"
          onClick={decrementBreakLengthByOneMinute}
        >
          -
        </PlusMinusButton>
        {/* Break length */}
        <BreakSessionTime id="break-length">
          {breakLengthInMinutes}
        </BreakSessionTime>
        {/* increase time by 60sec */}
        <PlusMinusButton
          id="break-increment"
          onClick={incrementBreakLengthByOneMinute}
        >
          +
        </PlusMinusButton>
      </PlusMinusTimeContainer>
    </BreakSessionContainer>
  );
};

// This describes the shape of the props that are expected to go into the Break
// function
type Props = {
  breakLength: number;
  // functions which take no parameters and have no return value
  decrementBreakLengthByOneMinute: () => void;
  incrementBreakLengthByOneMinute: () => void;
};

export default Break;
