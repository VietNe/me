import React, { memo } from "react";
import { animated } from "react-spring";

const Div = ({
  row,
  align,
  alignSelf,
  justify,
  fillParent,
  className,
  children,
  animate,
  flex,
  style,
  passRef,
  ...rest
}) => {
  const classNameArray = [
    "flex",
    row ? "flex-row" : "flex-col",
    align ? (typeof align == "string" ? `items-${align}` : "items-center") : "",
    justify
      ? typeof justify == "string"
        ? `justify-${justify}`
        : "justify-center"
      : "",
    alignSelf
      ? typeof alignSelf == "string"
        ? `self-${alignSelf}`
        : "self-center"
      : "",
    fillParent ? "flex-1 self-stretch" : "",
    className,
  ];

  let styleValue = style ? style : {};

  if (flex) {
    styleValue = { ...styleValue, flex: typeof flex == "number" ? flex : 1 };
  }

  if (animate) {
    return (
      <animated.div
        className={classNameArray.join(" ")}
        style={styleValue}
        {...rest}>
        {children}
      </animated.div>
    );
  }

  return (
    <div
      ref={passRef}
      className={classNameArray.join(" ")}
      style={styleValue}
      {...rest}>
      {children}
    </div>
  );
};

Div.defaultProps = {
  passRef: null,
};

export default memo(Div);
