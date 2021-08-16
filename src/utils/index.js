import React from "react";
import reactStringReplace from "react-string-replace";

export const random = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const parseNewLine = (object) => {
  //const regexNewLine=/@(\w+)/g
  const newLineMatch = (match, index, offset) => {
    return <br key={index} />;
  };

  return reactStringReplace(object, "<br/>", newLineMatch);
};

export const randomColor = () => {
  const colors = [
    "text-red-500",
    "text-gray-500",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-indigo-500",
    "text-purple-500",
    "text-pink-500",
  ];

  return colors[Math.floor(Math.random() * colors.length)] || "red";
};
