import React from "react";
import leftArrowIcon from "~assets/icons/icon-left-arrow.png";
import Div from "./Div";

const PaginationButton = ({ className, isEnabled, onClick, isRight }) => {
  return (
    <Div
      align
      justify
      className={`cursor-pointer select-none w-14 h-14 bg-opacity-30 bg-white rounded-full hover:bg-opacity-50 transition-all ${className} ${
        !isEnabled ? "opacity-30 cursor-not-allowed" : ""
      }`}
      onClick={onClick}>
      <img
        className={`w-4 h-4 ${isRight ? "transform rotate-180" : null}`}
        src={leftArrowIcon}
      />
    </Div>
  );
};

export default PaginationButton;
