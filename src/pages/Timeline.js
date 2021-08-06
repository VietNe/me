import find from "lodash/find";
import React, { useEffect, useState } from "react";
import { animated, Transition } from "react-spring";
import { Div } from "~components";
import { timelineListValue } from "~constants/timelineConstants";
import TimelineSelector from "~containers/TimelineSelector";

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
      </Div>
    </Div>
  );
};

export default Timeline;
