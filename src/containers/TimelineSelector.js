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
      className={`md:absolute mb-5 top-0 left-0 w-full flex-row bg-pw-grey-70  md:w-screen-30 ${
        listValue.length <= 5
          ? "md:p-0 md:bg-transparent md:flex-col md:rounded-none "
          : ""
      } justify-center flex-wrap rounded-3xl p-3 items-start flex z-3 ${className}`}>
      {map(listValue, (item, index) => (
        <Spring
          key={item.id}
          config={{ duration: 200 }}
          to={{
            maxWidth: item.id === selectedId ? 110 : 0,
            opacity: item.id === selectedId ? 1 : 0,
            paddingRight: item.id === selectedId ? 10 : 0,
          }}>
          {(styles) => (
            <Fragment>
              {index !== 0 && (
                <div
                  className={` ${
                    listValue.length <= 5 ? "md:block" : "md:hidden"
                  } w-1.5 h-6 -my-px mx-4 bg-pw-grey z-1 shadow-2xl hidden md:block`}></div>
              )}
              <Div
                animate
                row
                align
                justify
                className={`${
                  item.id === selectedId
                    ? `md:scale-100 scale-110 md:bg-pw-grey md:bg-opacity-100 bg-white bg-opacity-10`
                    : "bg-pw-grey"
                } h-10 md:w-auto w-10 rounded-full shadow-xl relative cursor-pointer transform transition-all duration-500 ${
                  listValue.length <= 5 ? "md:mx-0 md:my-0" : "md:mx-3"
                } mx-3 my-2 ${item.id !== selectedId ? "hover:scale-110" : ""}`}
                onClick={() => onClickitemItem(item)}>
                <Div
                  animate
                  row
                  align
                  justify
                  className={` w-10 h-10 ${
                    listValue.length <= 5
                      ? ""
                      : item.id === selectedId
                      ? "bg-white bg-opacity-10 rounded-full"
                      : ""
                  }`}>
                  <img className='h-6' src={item.firstLogo} alt='logo' />
                </Div>

                <animated.div
                  style={styles}
                  className={`whitespace-nowrap text-white select-none font-bold truncate hidden ${
                    listValue.length <= 5 ? "md:block" : "md:hidden"
                  }`}>
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
