import React, { memo } from "react";
import { animated, config, useTransition } from "react-spring";
import { BackgroundAnimator } from "~components";
const Header = ({
  isFullScreen,
  showDescription,
  clientX,
  clientY,
  setShowDescription,
  setFullScreen,
}) => {
  const containerTransition = useTransition(isFullScreen, {
    from: {
      opacity: 0,
      background: "#333333",
    },
    enter: {
      opacity: 1,
      background: "#333333",
    },
    leave: {
      opacity: 0,
      background: "#333333",
    },
    config: isFullScreen ? config.default : config.slow,
    onRest: () => {
      if (isFullScreen) setShowDescription(true);
    },
  });

  const backgroundAnimatorTransition = useTransition(showDescription, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    onRest: () => {
      if (!showDescription) setFullScreen(false);
    },
  });

  return containerTransition(
    (styles, item) =>
      item && (
        <animated.div
          style={styles}
          className='z-1 absolute inset-x-0 top-0 overflow-hidden h-screen origin-top'>
          {backgroundAnimatorTransition(
            (styles, item) =>
              item && (
                <animated.div
                  style={styles}
                  className='overflow-hidden w-full h-full scale-110 transform'>
                  <BackgroundAnimator clientX={clientX} clientY={clientY} />
                </animated.div>
              )
          )}
        </animated.div>
      )
  );
};

export default memo(Header);
