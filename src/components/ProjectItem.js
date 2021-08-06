import React from "react";
import Div from "./Div";
import { useHistory, Link } from "react-router-dom";
import { animated } from "react-spring";

const ProjectItem = ({ index, project, style, className }) => {
  const history = useHistory();

  const onClickContainer = (event) => {
    const { currentTarget } = event;
    const containerRect = currentTarget
      .querySelector("#project-container")
      .getBoundingClientRect();
    const imageRect = currentTarget
      .querySelector("#project-image")
      .getBoundingClientRect();

    history.push(`/project/${project.slug}`, { containerRect, imageRect });
    event.preventDefault();
    event.stopPropagation();
  };

  console.log(project);

  return (
    <Link
      to={`/project/${project.slug}`}
      className='no-underline'
      onClick={onClickContainer}>
      <animated.div
        id='project-container'
        style={{ ...style, zIndex: index, marginRight: 39 }}
        className={`transition-colors shadow-2xl rounded-2xl flex flex-col no-underline relative cursor-pointer bg-white ${className} ${
          project.state === "CENTERED" ? "bg-opacity-100" : "bg-opacity-80"
        }`}>
        <Div fillParent align justify>
          <img
            id='#roject-image'
            src={project?.icon}
            style={{ width: 120 }}
            alt=''
          />
        </Div>

        <Div
          alignSelf='stretch'
          justify='start'
          align='end'
          className='text-right text-pw-grey p-5 pt-0'>
          <div className='font-bold text-2xl'>{project?.name}</div>
          <div className='text-xs mt-2 capitalize'>
            {project?.tech?.join(" | ")}
          </div>
        </Div>
        <div className='bottom_background_gradient'></div>
      </animated.div>
    </Link>
  );
};

ProjectItem.defaultProps = {
  index: 0,
  className: "",
};

export default ProjectItem;
