import React from "react";
import { animated, useSpring } from "react-spring";
import backgroundDarkDoodleFixed from "~assets/images/background-dark-doodle-fixed-layer.png";
import backgroundDarkDoodleFirst from "~assets/images/background-dark-doodle-first-layer.png";
import backgroundDarkDoodleSecond from "~assets/images/background-dark-doodle-second-layer.png";
import "./index.css";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate(${x / 20}px,${y / 20}px)`;
const trans2 = (x, y) => `translate(${x / 15}px,${y / 15}px)`;
const trans3 = (x, y) => `translate(${x / 10}px,${y / 10}px)`;

export default function BackgroundAnimated() {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 240 },
  }));
  return (
    <div
      className='header_container'
      onMouseMove={({ clientX: x, clientY: y }) => {
        set({ xy: calc(x, y) });
      }}>
      <div className='header_background_container'>
        <animated.div
          className={"background_image_layer"}
          style={{
            transform: props.xy.to(trans1),

            backgroundImage: `url(${backgroundDarkDoodleFixed})`,
          }}></animated.div>
        <animated.div
          className={"background_image_layer"}
          style={{
            transform: props.xy.to(trans2),

            backgroundImage: `url(${backgroundDarkDoodleSecond})`,
          }}></animated.div>
        <animated.div
          className={"background_image_layer"}
          style={{
            transform: props.xy.to(trans3),

            backgroundImage: `url(${backgroundDarkDoodleFirst})`,
          }}></animated.div>
      </div>
    </div>
  );
}
