import React, { memo } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import profilePic from "~assets/images/profile-pic.jpeg";

const ProfilePic = ({
  isFirstTime,
  isFullScreen,
  onClickProfilePic,
  setFirstTime,
}) => {
  const transitionFrom =
    "translate(calc(5.5rem - 50vw), calc(50vh - 100px)) scale(1)";
  const transitionTo =
    "translate(calc(5.5rem - 50vw), calc(50vh - 250px)) scale(1)";

  const springTranslateFrom =
    "translate(calc(5.5rem - 50vw), calc(50vh - 250px)) scale(1)";
  const springTranslateTo =
    "translate(calc(-1.25rem - 0vw), calc(0vh - -15px)) scale(0.25)";

  const shadowFrom = "0px 5px 12px 3px rgba(0, 0, 0, 0.35)";
  const shadowTo = "0px 5px 12px 3px rgba(0, 0, 0, 0)";

  const transition = useTransition(true, {
    from: { opacity: 0, transform: transitionFrom },
    enter: { opacity: 1, transform: transitionTo },
    leave: { opacity: 0 },
    config: { delay: 5000 },
    onRest: () => {
      if (isFirstTime) setFirstTime(false);
    },
  });

  const springProps = useSpring({
    to: {
      userPicTranform: isFullScreen ? springTranslateFrom : springTranslateTo,
      boxShadow: isFullScreen ? shadowFrom : shadowTo,
    },
    config: {
      mass: 1,
      tension: 200,
      fiction: 20,
    },
  });

  return transition(
    (styles, item) =>
      item && (
        <animated.img
          style={{
            opacity: styles.opacity,
            boxShadow: springProps.boxShadow,
            transform: isFirstTime
              ? styles.transform
              : springProps.userPicTranform,
          }}
          src={profilePic}
          className={`w-44 h-44 origin-top-right absolute right-0 z-2 rounded-full object-cover object-center ${
            !isFullScreen ? "cursor-pointer" : ""
          }`}
          onClick={onClickProfilePic}
        />
      )
  );
};

export default memo(ProfilePic);
