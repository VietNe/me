import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import { animated } from "react-spring";

const ElementScroll = ({
  project,
  st,
  imageRef,
  containerOpacityAnimation,
  hideTransitionElement,
  isPageRedirectedFromListing,
}) => {
  const imageWidth = 150;
  const [titleWidth, setTitleWidth] = useState(100);
  const titleRef = useRef(null);

  useEffect(() => {
    setTitleWidth(titleRef.current.getBoundingClientRect().width);
  }, []);

  // ------------------------------------------------IMAGE ANIMATION
  const imgTopAnim = st.to((o) => (70 - o / 2 > 0 ? 70 - o / 2 : 0));
  const imgWidthAnim = st.to((o) =>
    imageWidth - o / 1.5 > 48 ? imageWidth - o / 1.5 : 48
  );
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
  const titleLeftAnim = st.to((o) =>
    titleWidth * (o / 100) > 30 ? 30 : titleWidth * (o / 100)
  );
  const titleSizeAnim = st.to(
    (o) => `scale(${1 - o / 2 / 100 < 0.5 ? 0.5 : 1 - o / 2 / 100})`
  );

  return (
    <Fragment>
      <animated.img
        ref={imageRef}
        className='absolute object-contain '
        src={project.icon}
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

      <animated.div
        ref={titleRef}
        rel='noreferrer'
        className={`leading-none whitespace-nowrap absolute text-pw-grey font-bold text-4xl `}
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
