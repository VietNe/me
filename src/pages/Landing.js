import React, { useState } from "react";
import { Div } from "~components";
import { landingPageBody } from "~constants/landingConstants";
import "~styles/pages/Landing.css";
import HeaderDescription from "./HeaderDescription";
import HeaderLinks from "./HeaderLinks";
import ProfilePic from "./ProfilePic";
import Header from "./Header";
import Projects from "./Projects";
import Timeline from "./Timeline";
import { Transition } from "react-spring";
import { useSelector } from "react-redux";

const Landing = () => {
  const [bodyType, setBodyType] = useState(landingPageBody.NONE);
  const [isFullScreen, setFullScreen] = useState(true);
  const [isFirstTime, setFirstTime] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const user = useSelector((state) => state?.user);

  //-------------------------------------------Header Logic-------------------------------------------

  const onClickProfilePic = () => {
    if (!isFullScreen) showFullScreen();
  };

  const onClickProject = () => {
    setBodyType(landingPageBody.PROJECT);
    if (isFullScreen) hideFullScreen();
  };

  const onClickTimeline = () => {
    setBodyType(landingPageBody.TIMELINE);
    if (isFullScreen) hideFullScreen();
  };

  const showFullScreen = () => {
    setFullScreen(true);
    // setBodyType(landingPageBody.NONE);
  };

  const hideFullScreen = () => {
    setShowDescription(false);
  };

  //-------------------------------------------Body Logic-------------------------------------------

  const getBodyAnimation = () => {
    let fromAnimation, enterAnimation, leaveAnimation;

    if (bodyType === landingPageBody.NONE) {
      fromAnimation = {
        opacity: 0,
        transform: "translate(0px, 100px)",
      };
      enterAnimation = {
        opacity: 1,
        transform: "translate(0px, 0px)",
      };
      leaveAnimation = {
        opacity: 0,
        transform: "translate(0px, 100px)",
      };
    } else {
      fromAnimation = {
        opacity: 0,
        transform: `translate(${
          bodyType === landingPageBody.TIMELINE ? -300 : 300
        }px, 0px)`,
      };
      enterAnimation = {
        opacity: 1,
        transform: "translate(0px, 0px)",
      };
      leaveAnimation = {
        opacity: 0,
        transform: `translate(${
          bodyType === landingPageBody.TIMELINE ? 300 : -300
        }px, 0px)`,
      };
    }

    return { fromAnimation, enterAnimation, leaveAnimation };
  };

  return (
    <Div
      className='w-full h-full overflow-hidden relative'
      onMouseMove={
        bodyType === landingPageBody.NONE
          ? ({ clientX: x, clientY: y }) => {
              setClientX(x);
              setClientY(y);
            }
          : null
      }>
      <Div fillParent className='body_container'>
        <Transition
          items={bodyType}
          key={bodyType}
          from={getBodyAnimation().fromAnimation}
          enter={getBodyAnimation().enterAnimation}
          leave={getBodyAnimation().leaveAnimation}>
          {(styles, item) =>
            item && (
              <Div
                animate
                fillParent
                style={styles}
                className='body_content_container'>
                {bodyType === landingPageBody.PROJECT && <Projects />}
                {bodyType === landingPageBody.TIMELINE && <Timeline />}
              </Div>
            )
          }
        </Transition>
      </Div>

      <Header
        {...{
          setShowDescription,
          setFullScreen,
          isFirstTime,
          isFullScreen,
          showDescription,
          clientX,
          clientY,
        }}
      />

      <HeaderDescription
        {...{
          showDescription,
          onClickTimeline,
          onClickProject,
          isFirstTime,
          user,
        }}
        className='header_description'
      />

      <ProfilePic
        profilePic={user?.avatar_img || null}
        {...{
          setFirstTime,
          isFirstTime,
          isFullScreen,
          onClickProfilePic,
        }}
      />

      <HeaderLinks
        links={user?.links || []}
        key='header-links'
        isFullScreen={isFullScreen}
        bodyType={bodyType}
        onClickTimeline={onClickTimeline}
        onClickProject={onClickProject}
      />
    </Div>
  );
};

export default Landing;
