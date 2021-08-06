import React from "react";
import techDoodleImage from "~assets/images/background/tech-doodle-background-image.png";
import { Div } from "~components";
const Projects = () => {
  return (
    <Div
      animate
      row
      fillParent
      align='stretch'
      className='pt-20 pl-20 relative overflow-hidden'>
      <img
        src={techDoodleImage}
        className='absolute object-cover object-left-top opacity-40 top-0 left-0 w-screen h-screen'
        alt='tech background'
      />

      <div className='w-screen-30 bg-gradient-to-r from-white-10 to-black-0 absolute left-0 inset-y-0 z-2'></div>
    </Div>
  );
};

export default Projects;
