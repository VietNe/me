import React, { memo } from "react";
import { animated, config, Transition } from "react-spring";
import "~styles/pages/HeaderDescription.css";
import { ContactComponent, Div } from "~components";

const HeaderDescription = ({
  showDescription,
  onClickProject,
  onClickTimeline,
  isFirstTime,
  user,
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
            style={{ ...styles, maxHeight: "60vh" }}
            className='md:max-h-1/2-screen bg-pw-grey-100 font-medium text-pw-grey shadow-2xl overflow-auto text-base rounded-3xl px-10 py-5 absolute z-1 left-1/24 md:left-1/4 md:w-1/2 w-11/12 pt-28'>
            <div className='text-center'>
              Hi, <br />I am{" "}
              <span style={{ color: "#fbae17" }} className='font-bo'>
                {user?.name || "Viet Nguyen"}
              </span>
              {", "}
              {user &&
                user?.descriptions?.map((description, index) => (
                  <span key={index}>
                    {description}
                    <br />
                    <br />
                  </span>
                ))}
            </div>

            <Div row justify align className='flex-wrap text-center'>
              Checkout my
              <Div
                align
                className='user_button transform hover:-translate-y-1 mx-1  font-black cursor-pointer transition-all duration-300 '
                onClick={onClickTimeline}>
                Timeline <Underline isFirstTime={isFirstTime} />
              </Div>
              and
              <Div
                align
                className='user_button transform hover:-translate-y-1 mx-1  font-black cursor-pointer transition-all duration-300 '
                onClick={onClickProject}>
                Technologies <Underline isFirstTime={isFirstTime} />
              </Div>
              to see featured projects I worked on.
            </Div>
            <div className='text-center'>
              <br />
              You can see more of me below if you're interested. Have a good
              day!
            </div>

            <ContactComponent className='my-4' links={user?.links || []} />
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
