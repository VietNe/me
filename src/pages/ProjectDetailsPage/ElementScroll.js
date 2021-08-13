import React, { Fragment, memo, useState } from "react";
import { animated } from "react-spring";

const ElementScroll = ({
  color,
  project,
  st,
  imageRef,
  containerOpacityAnimation,
  hideTransitionElement,
  isPageRedirectedFromListing,
}) => {
  const imageWidth = project?.icon ? 150 : 79;
  const [titleWidth] = useState(140);

  // ------------------------------------------------IMAGE ANIMATION
  const imgTopAnim = st.to((o) => (70 - o / 2 > 0 ? 70 - o / 2 : 0));
  const imgWidthAnim = st.to((o) =>
    imageWidth - o / 1.5 > 48 ? imageWidth - o / 1.5 : 48
  );

  const fontSizeAnim = st.to((o) => `${8 - o / 50 < 3 ? 3 : 8 - o / 50}rem`);

  const imgLeftAnim = st.to(
    (o) =>
      `calc(${50 - o / 1.5 / 3 > 0 ? 50 - o / 1.5 / 3 : 0}% - ${
        imageWidth / 2 - o / 1.5 > 0 ? imageWidth / 2 - o / 1.5 : 0
      }px)`
  );

  // ------------------------------------------------TITLE ANIMATION
  // title width calculation
  // the original width of the title is 18 px and displaying with scale(2) makes it 32px
  // the title width needs to be calculated 18px font-size / 2
  // but the titleWidth getBoundClient is returning the size which is displayed 32px
  // so to get 18px/2 which is the original title width size by half
  // we calulate it as 32px/4
  const titleTopAnim = st.to((o) => (220 - o / 1 > 0 ? 220 - o / 1.1 : 0) + 5);
  // const titleLeftAnim = st.to((o) =>
  //   o === 0 ? 0 : titleWidth / 17 + o / 7 > 30 ? 30 : titleWidth / 17 + o / 7
  // );
  const titleLeftAnim = st.to((o) => {
    return titleWidth * (o / 100) > 30 ? 30 : titleWidth * (o / 100);
  });

  const titleSizeAnim = st.to(
    (o) => `scale(${1 - o / 2 / 100 < 0.5 ? 0.5 : 1 - o / 2 / 100})`
  );

  return (
    <Fragment>
      {project?.icon ? (
        <animated.img
          ref={imageRef}
          className='absolute object-contain '
          src={project?.icon}
          alt='project logo'
          style={{
            width: imgWidthAnim,
            height: imgWidthAnim,
            left: imgLeftAnim,
            top: imgTopAnim,
            // when transition from listing page don't animate opacity just make visibilty show/hide immediatly
            // when being navigated directly to this page .. then animate opacity
            opacity: isPageRedirectedFromListing
              ? +hideTransitionElement // +true = 1
              : containerOpacityAnimation.opacity,
          }}
        />
      ) : (
        <animated.div
          ref={imageRef}
          className={`font-black text-9xl text-${color}-500 absolute z-10 select-none `}
          style={{
            fontSize: fontSizeAnim,
            left: imgLeftAnim,
            top: imgTopAnim,
            // when transition from listing page don't animate opacity just make visibilty show/hide immediatly
            // when being navigated directly to this page .. then animate opacity
            opacity: isPageRedirectedFromListing
              ? +hideTransitionElement // +true = 1
              : containerOpacityAnimation.opacity,
          }}>
          {project?.name[0] || ""}
        </animated.div>
      )}

      <animated.div
        // ref={titleRef}
        rel='noreferrer'
        className={`leading-none whitespace-nowrap absolute text-pw-grey font-black text-4xl `}
        style={{
          transform: titleSizeAnim,
          left: titleLeftAnim,
          top: titleTopAnim,
          opacity: containerOpacityAnimation.opacity,
        }}>
        {project.name}
      </animated.div>
    </Fragment>
  );
};

export default memo(ElementScroll);
