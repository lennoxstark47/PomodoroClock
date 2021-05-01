import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React from "react";

// to setup , call setup function and pass moment package
// ignore error for now as it's super complicated to fix
// @ts-ignore
momentDurationFormatSetup(moment);

// React.FC tells typescript that Session is a react funtional component
// then Props from bottom of page is parsed
const TimeLeft: React.FC<Props> = ({
  timerLabel,
  handleStartStopClick,
  startStopButtonLabel,
  timeLeft,
  handleResetButtonClick,
}) => {
  // set format to MM:SS
  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });

  return (
    <div className="flex flex-col justify-evenly items-center w-64 h-64 bg-indigo-300 rounded-full border-2 border-gray-300 border-solid mt-20">
      <p
        className="mt-5 text-gray-900 font-semibold text-2xl font-mono"
        id="timer-label"
      >
        {timerLabel}
      </p>
      <p className="font-clock text-gray-900 text-4xl font-bold" id="time-left">
        {formattedTimeLeft}
      </p>
      <div className="grid grid-flow-col gap-2">
        {/* if in start mode, show Stop in button, otherwise in stop mode so show Start */}
        <button
          className="text-gray-800 font-medium bg-yellow-400 px-4 py-2 rounded-lg mb-5 hover:bg-orange-500"
          id="start_stop"
          onClick={handleStartStopClick}
        >
          {startStopButtonLabel}
        </button>
        <button
          className="border-2 text-gray-800 font-medium rounded-lg border-yellow-400 border-solid px-3 py-2 mb-5 ml-5 hover:border-orange-500"
          id="reset"
          onClick={handleResetButtonClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// This describes the shape of the props that are expected to go into the
// Session function
type Props = {
  timerLabel: string;
  // functions which take no parameters and have no return value
  handleStartStopClick: () => void;
  startStopButtonLabel: string;
  timeLeft: number;
  // functions which take no parameters and have no return value
  handleResetButtonClick: () => void;
};

export default TimeLeft;
