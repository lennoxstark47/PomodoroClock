import React from "react";

// This file globally styles the react components in App.js

//  Props in this file were found by hovering over the html element
// (e.g. div, p, etc), then copy and pasting the string (everything after the
// "JSX.IntrinsicElements.[element]:"")

export const BreakSessionContainer: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = ({ children, ...props }) => {
  return (
    <div className="flex flex-col items-center" {...props}>
      {children}
    </div>
  );
};

export const BreakSessionLabel: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>> = ({ children, ...props }) => {
  return (
    <p className="text-lg font-medium font-mono text-gray-300" {...props}>
      {children}
    </p>
  );
};

export const BreakSessionTime: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>> = ({ children, ...props }) => {
  return (
    <p className="text-4xl font-clock font-bold text-gray-300" {...props}>
      {children}
    </p>
  );
};

export const PlusMinusButton: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ children, ...props }) => {
  return (
    <button
      className="text-m text-gray-800 px-4 py-1 bg-indigo-300 rounded-full hover:bg-yellow-400"
      {...props}
    >
      {children}
    </button>
  );
};

export const PlusMinusTimeContainer: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>> = ({ children, ...props }) => {
  return (
    <div className="grid grid-flow-col gap-4 rounded items-center" {...props}>
      {children}
    </div>
  );
};
