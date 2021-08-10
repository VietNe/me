import find from "lodash/find";
import React, { useEffect, useState } from "react";
import { animated, Transition } from "react-spring";
import { Div } from "~components";
import { timelineListValue } from "~constants/timelineConstants";
import TimelineSelector from "~containers/TimelineSelector";
import RightContainer from "~containers/RightContainer";

const Timeline = () => {
  const [selectedTimelineId, setSelectedTimelineId] = useState("gocodee");
  const [selectionNext, setSelectionNext] = useState(true);
  const [isFirstAnimation, setFirstAnimation] = useState(true);

  const timeline = find(timelineListValue, (timelineItem) => {
    return timelineItem.id === selectedTimelineId;
  });

  const onTimelineSelected = ({ selectedId, selectionNext }) => {
    setSelectedTimelineId(selectedId);
    setSelectionNext(selectionNext);
  };

  const getImageBackgroundAnimation = (selectionNext) => {
    if (isFirstAnimation) {
      return {
        from: { transform: "translateY(0vh)" },
        enter: { transform: "translateY(0vh)" },
        leave: { transform: "translateY(0vh)" },
      };
    } else if (selectionNext) {
      return {
        from: { transform: "translateY(100vh)" },
        enter: { transform: "translateY(0vh)" },
        leave: { transform: "translateY(-100vh)" },
      };
    }

    return {
      from: { transform: "translateY(-100vh)" },
      enter: { transform: "translateY(0vh)" },
      leave: { transform: "translateY(100vh)" },
    };
  };

  useEffect(() => {
    setFirstAnimation(false);
  }, []);

  return (
    <Div
      animate
      row
      fillParent
      align='stretch'
      className='timeline-container pt-20 md:pl-20 px-6 md:px-0 relative overflow-hidden'>
      <Transition
        items={timeline}
        keys={(timeline) => timeline.id}
        config={{ mass: 1, tension: 280, friction: 80 }}
        from={getImageBackgroundAnimation(selectionNext).from}
        enter={getImageBackgroundAnimation(selectionNext).enter}
        leave={getImageBackgroundAnimation(selectionNext).leave}>
        {(styles, item) =>
          item && (
            <animated.img
              src={timeline.backgroundImage}
              style={styles}
              className='absolute top-0 left-0 object-cover z-0 object-left-top w-screen h-screen'></animated.img>
          )
        }
      </Transition>
      <div className='absolute inset-0 bg-pw-grey-70 z-1'></div>
      <div className='bg-gradient-to-r from-white-10 to-black-0 absolute inset-y-0 left-0 w-screen-30 z-2'></div>

      <Div className='w-full h-full z-3 relative'>
        <TimelineSelector
          selectedId={selectedTimelineId}
          listValue={timelineListValue}
          onItemSelected={onTimelineSelected}
        />
        <div className='w-full h-full flex flex-wrap items-start mb-6 md:mb-0 overflow-auto md:overflow-hidden'>
          <div className='w-full md:h-full flex mb-3 md:mb-0 md:pb-10 flex-col md:w-35'>
            <div className='flex-1 hidden md:block'></div>
            <Transition
              items={timeline}
              key={timeline.id}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}>
              {(styles, item) =>
                item && (
                  <Div
                    animate
                    style={styles}
                    className='text-white md:text-left text-center'>
                    <div className='md:text-4xl text-xl font-black break-words'>
                      {timeline.companyName}
                    </div>

                    <Div className='description_container text-white mt-3 ml-4 items-center md:items-start'>
                      <div className='text-sm break-words'>
                        {timeline.duration}
                      </div>
                      <div className='text-sm break-words mt-2'>
                        {timeline.position}
                      </div>
                      <div className='text-sm break-words mt-2'>
                        {timeline.location}
                      </div>
                      <div className='button mt-7'>view more</div>
                    </Div>
                  </Div>
                )
              }
            </Transition>
          </div>
          <div className='w-full md:h-full md:w-65'>
            <RightContainer item={timeline} />
          </div>
        </div>
      </Div>
    </Div>
  );
};

export default Timeline;
