import map from "lodash/map";
import React, { Fragment } from "react";
import { animated, Spring } from "react-spring";
import { Div } from "~components";

const TimelineSelector = ({
  className,
  listValue,
  selectedId,
  onItemSelected,
}) => {
  const onClickitemItem = (selecteditem) => {
    const currentIndex = listValue.findIndex((item) => item.id === selectedId);
    const selectedIndex = listValue.findIndex(
      (item) => item.id === selecteditem.id
    );

    if (currentIndex !== selectedIndex) {
      onItemSelected({
        selectedId: selecteditem.id,
        selectionNext: selectedIndex > currentIndex,
      });
    }
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full md:w-screen-30 flex-row bg-pw-grey-70 md:bg-transparent md:rounded-none md:p-0 flex-wrap justify-between rounded-3xl p-5 md:flex-col items-start flex ${className}`}>
      {map(listValue, (item, index) => (
        <Spring
          key={item.id}
          config={{ duration: 200 }}
          to={{
            maxWidth: item.id === selectedId ? 110 : 0,
            opacity: item.id === selectedId ? 1 : 0,
            paddingRight: item.id === selectedId ? 10 : 0,
            marginLeft: "2.5rem",
          }}>
          {(styles) => (
            <Fragment>
              {index !== 0 && (
                <div className='w-1.5 h-6 -my-px mx-4 bg-pw-grey z-1 shadow-2xl hidden md:block'></div>
              )}
              <Div
                animate
                row
                align
                justify
                className={`h-10 rounded-full bg-pw-grey shadow-xl relative cursor-pointer transform transition-all duration-500 m-2 md:m-0  ${
                  item.id !== selectedId ? "hover:scale-110" : ""
                }`}
                onClick={() => onClickitemItem(item)}>
                <Div
                  animate
                  row
                  align
                  justify
                  className='absolute top-0 left-0 w-10 h-10'>
                  <img className='h-6' src={item.firstLogo} alt='logo' />
                </Div>

                <animated.div
                  style={styles}
                  className='whitespace-nowrap text-white select-none font-bold truncate'>
                  {item.name}
                </animated.div>
              </Div>
            </Fragment>
          )}
        </Spring>
      ))}
    </div>
  );
};

TimelineSelector.defaultProps = {
  className: "",
};

export default TimelineSelector;
