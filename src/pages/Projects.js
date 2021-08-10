import find from "lodash/find";
import React, { useState } from "react";
import { animated, Transition } from "react-spring";
import techDoodleImage from "~assets/images/background/tech-doodle-background-image.png";
import { Div } from "~components";
import { techList } from "~constants/techConstants";
import RightContainer from "~containers/RightContainer";
import TimelineSelector from "~containers/TimelineSelector";

const Projects = () => {
  const [selectedTechId, setSelectedTechId] = useState("react");

  const onTechSelected = ({ selectedId }) => {
    setSelectedTechId(selectedId);
  };

  const tech = find(techList, (techItem) => {
    return techItem.id === selectedTechId;
  });

  return (
    <Div
      animate
      row
      fillParent
      align='stretch'
      className='pt-20 md:pl-20 px-6 md:px-0 relative overflow-hidden'>
      <img
        src={techDoodleImage}
        className='absolute object-cover object-left-top opacity-40 top-0 left-0 w-screen h-screen'
        alt='tech background'
      />
      <div className='absolute inset-0 bg-pw-grey-70 z-1'></div>

      <div className='w-screen-30 bg-gradient-to-r from-white-10 to-black-0 absolute left-0 inset-y-0 z-2'></div>
      <Div className='w-full h-full z-3 relative'>
        <TimelineSelector
          selectedId={selectedTechId}
          listValue={techList}
          tech
          onItemSelected={onTechSelected}
        />
        <div className='w-full h-full flex flex-wrap items-start mb-6 md:mb-0 overflow-auto md:overflow-hidden'>
          <div className='w-full md:h-full flex mb-3 md:mb-0 md:pb-10 flex-col md:w-35'>
            <div className='flex-1 hidden md:block'>
              <Transition
                items={tech}
                key={tech.id}
                from={{ opacity: 0, transform: "translate(0px, -100px)" }}
                enter={{ opacity: 1, transform: "translate(0px, 0)" }}
                leave={{ opacity: 0 }}>
                {(styles, item) =>
                  item && (
                    <animated.div
                      style={styles}
                      className={`h-full w-full flex justify-center ${
                        techList.length <= 5 ? "items-center" : "items-end"
                      }  pb-5`}>
                      <img
                        src={tech.backgroundImage}
                        className='w-1/2'
                        alt=''></img>
                    </animated.div>
                  )
                }
              </Transition>
            </div>
            <Transition
              items={tech}
              key={tech.id}
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
                      {tech.name}
                    </div>

                    <Div className='description_container text-white mt-3 ml-4 items-center md:items-start'>
                      <div className='text-sm break-words'>
                        {tech.description}
                      </div>
                      <div className='text-sm break-words mt-2'>
                        {tech.position}
                      </div>
                    </Div>
                  </Div>
                )
              }
            </Transition>
          </div>
          <div className='w-full md:h-full md:w-65'>
            <RightContainer item={tech} className='md:pl-20' />
          </div>
        </div>
      </Div>
    </Div>
  );
};

export default Projects;
