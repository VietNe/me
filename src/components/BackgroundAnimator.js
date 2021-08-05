import React, { Fragment, memo } from "react";
import { animated, useSpring } from "react-spring";
import backgroundDarkDoodleFirst from "~assets/images/background-dark-doodle-first-layer.png";
import backgroundDarkDoodleFixed from "~assets/images/background-dark-doodle-fixed-layer.png";
import backgroundDarkDoodleSecond from "~assets/images/background-dark-doodle-second-layer.png";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate(${x / 20}px,${y / 20}px)`;
const trans2 = (x, y) => `translate(${x / 15}px,${y / 15}px)`;
const trans3 = (x, y) => `translate(${x / 10}px,${y / 10}px)`;

const className =
  "w-full h-full absolute left-0 top-0 bg-left-top bg-no-repeat bg-cover";

const BackgroundAnimator = ({ clientX, clientY }) => {
  const animationProps = useSpring({
    xy: calc(clientX, clientY),
    config: { mass: 10, tension: 550, friction: 240 },
  });
  return (
    <Fragment>
      <animated.div
        {...{ className }}
        style={{
          transform: animationProps.xy.to(trans1),
          backgroundImage: `url(${backgroundDarkDoodleFixed})`,
        }}></animated.div>
      <animated.div
        {...{ className }}
        style={{
          transform: animationProps.xy.to(trans2),
          backgroundImage: `url(${backgroundDarkDoodleSecond})`,
        }}></animated.div>
      <animated.div
        {...{ className }}
        style={{
          transform: animationProps.xy.to(trans3),
          backgroundImage: `url(${backgroundDarkDoodleFirst})`,
        }}></animated.div>
    </Fragment>
  );
};

export default memo(BackgroundAnimator);
