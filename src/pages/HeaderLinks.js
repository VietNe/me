import React, { memo, useState } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import { landingPageBody } from "~constants/landingConstants";
import { Div, ContactComponent } from "~components";
import "~styles/pages/HeaderLinks.css";

const humburgerRowClass =
  "bg-white h-1 rounded-sm transition-all duration-500 transform";

const HeaderLinks = ({
  isFullScreen,
  bodyType,
  onClickTimeline,
  onClickProject,
}) => {
  const [showMenu, setMenuState] = useState(false);
  const transition = useTransition(isFullScreen, {
    from: {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    leave: {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    onRest: () => {},
  });
  const springProps = useSpring({
    underlineWidth: bodyType === landingPageBody.TIMELINE ? 66 : 33,
    transformUnderline:
      bodyType === landingPageBody.TIMELINE
        ? "translateX(0px)"
        : "translateX(78px)",
  });

  return transition(
    (styles, item) =>
      !item && (
        <Div
          animate
          row
          align
          justify='space_between'
          style={{ ...styles, height: "calc(30px + 2.75rem)" }}
          className={`absolute top-0 inset-x-0 z-1 py-0 px-5 pr-20 ${
            showMenu ? "z-2" : ""
          }`}>
          <Div
            justify='between'
            className={`md:hidden cursor-pointer transform transition-all duration-500 z-4 h-4 w-5 ${
              showMenu ? "translate-y-2" : ""
            }`}
            onClick={() => setMenuState(!showMenu)}>
            <div
              className={`${humburgerRowClass} ${
                showMenu ? "rotate-45 ml-0 " : "ml-1.5 "
              }`}></div>
            <div
              className={`${humburgerRowClass} ${
                showMenu ? "-rotate-45 -translate-y-3" : ""
              }`}></div>
          </Div>

          {showMenu && (
            <div
              className='backdrop-filter backdrop-blur-xs fixed top-0 left-0 h-screen w-screen z-3 bg-pw-grey bg-opacity-10'
              onClick={() => setMenuState(!showMenu)}>
              <div
                style={{ marginTop: "calc(20px + 2.75rem)" }}
                className='speech_bubble_container bg-white ml-3 relative inline-block px-5 py-4 rounded-md'
                onClick={(event) => event.stopPropagation()}>
                <ContactComponent />
              </div>
            </div>
          )}

          <ContactComponent isWhite className='hidden md:flex' />

          <Div flex></Div>
          <Div className='header_link_container'>
            <Div row className='bodytype_container'>
              <div
                className='hover:opacity-50 text-white cursor-pointer transition-opacity duration-500 ease-linear text-base font-bold'
                onClick={onClickTimeline}>
                Timeline
              </div>
              <div
                className='hover:opacity-50 text-white cursor-pointer transition-opacity duration-500 ease-linear text-base font-bold ml-3'
                onClick={onClickProject}>
                Tech
              </div>
            </Div>
            <animated.div
              style={{
                width: springProps.underlineWidth,
                transform: springProps.transformUnderline,
              }}
              className='transition-width duration-100 ease-linear h-0.5 bg-white'></animated.div>
          </Div>
        </Div>
      )
  );
};

export default memo(HeaderLinks);
