import React, { memo } from "react";
import { animated, config, Transition } from "react-spring";
import "~styles/pages/HeaderDescription.css";
import { ContactComponent, Div } from "~components";

const HeaderDescription = ({
  showDescription,
  onClickProject,
  onClickTimeline,
  isFirstTime,
}) => {
  return (
    <Transition
      items={showDescription}
      from={{
        opacity: 0,
        transform: "translateY(calc(50vh - 0px))",
      }}
      enter={{
        opacity: 1,
        transform: "translateY(calc(50vh - 145px))",
      }}
      leave={{
        opacity: 0,
      }}
      delay={isFirstTime ? 300 : 0}
      config={isFirstTime ? {} : config.default}>
      {(styles, item) =>
        item && (
          <Div
            animate
            style={styles}
            className='max-h-1/2-screen bg-pw-grey-100 text-pw-grey shadow-2xl overflow-auto text-sm rounded-3xl px-10 py-5 absolute z-1 left-1/24 md:left-1/4 md:w-1/2 w-11/12 pt-28'>
            <div className='text-center'>
              Hi, <br />I am <b className=' '>Viet Nguyen</b>, A Web Developer
              with 2+ years of Web Development experience on various Platforms,
              Passionate to build Polished, Innovative and well-detailed Apps
              with Fluid Animations to complement the Design.
              {/* <br/><br/> In my spare time, I usually read or play video games but mostly i try to work on new ideas and learn. */}
            </div>

            <Div row justify align className='mt-8'>
              Checkout my
              <Div
                align
                className='user_button transform hover:-translate-y-1 mx-1  font-bold cursor-pointer transition-all duration-300 '
                onClick={onClickTimeline}>
                Timeline <Underline isFirstTime={isFirstTime} />
              </Div>
              and
              <Div
                align
                className='user_button transform hover:-translate-y-1 mx-1  font-bold cursor-pointer transition-all duration-300 '
                onClick={onClickProject}>
                Technologies <Underline isFirstTime={isFirstTime} />
              </Div>
              that I worked on.
            </Div>

            <ContactComponent className='mt-7' />
          </Div>
        )
      }
    </Transition>
  );
};

const Underline = ({ isFirstTime }) => (
  <Transition
    items={true}
    from={{
      transform: isFirstTime ? "scale(0)" : "scale(1)",
    }}
    enter={{
      transform: "scale(1)",
    }}
    config={{ delay: 800 }}>
    {(styles, item) =>
      item && (
        <animated.div
          style={styles}
          className={`underline w-full h-0.5 transition-width duration-500 bg-black`}></animated.div>
      )
    }
  </Transition>
);

export default memo(HeaderDescription);
