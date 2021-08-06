import { isEmpty, map } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { Spring, Transition } from "react-spring";
import { Div, PaginationButton, ProjectItem } from "~components";
import { projectsListValue } from "~constants/projectsConstants";

const RightContainer = ({ item, className }) => {
  const [projects, setProjects] = useState({});

  const getSlideObject = (projects) => {
    return map(projects, (project, index) => {
      const state = index === 0 ? "CENTERED" : "LIST";
      console.log(project, "asdasdsadasd");
      return {
        ...projectsListValue[project],
        slug: project,
        state,
      };
    });
  };

  const getStates = () => {
    return {
      CENTERED: "CENTERED",
      BEHIND: "BEHIND",
      GONE: "GONE",
      LIST: "LIST",
    };
  };

  const getPropertyBasedOnState = (state) => {
    const states = getStates();

    switch (state) {
      case states.CENTERED:
        return {
          minHeight: 300,
          height: "50vh",
          width: 209,
          minWidth: 209,
          marginLeft: -246,
          marginBottom: -10,
          marginRight: 37,
        };
      case states.BEHIND:
        return {
          opacity: 1,
          marginBottom: -20,
          minHeight: 300,

          height: "50vh",
          width: 209,
          minWidth: 209,
          marginLeft: -246,
          marginRight: 37,
        };
      case states.GONE:
        return {
          marginBottom: -30,
          opacity: 0,
          minHeight: 300,

          height: "50vh",
          width: 209,
          minWidth: 209,
          marginLeft: -246,
          marginRight: 37,
        };
      default:
        return {
          minHeight: 270,
          width: 183,
          minWidth: 183,
          // height: 311,
          height: "45vh",
          marginLeft: 0,
          marginBottom: 0,
          marginRight: 39,
        };
    }
  };

  // position = next | previous
  const moveTo = (position) => {
    let selectedIndex = projects[item.id].findIndex(
      (slide) => slide.state === "CENTERED"
    );
    selectedIndex = position === "next" ? selectedIndex + 1 : selectedIndex - 1; // move to slide either next or to previous position

    const nextCondition = selectedIndex < projects[item.id].length;
    const previousCondition = selectedIndex >= 0;

    if (position === "next" ? nextCondition : previousCondition) {
      const updatedSlide = map(projects[item.id], (slide, index) => {
        if (index < selectedIndex - 1) {
          return {
            ...slide,
            state: "GONE",
          };
        } else if (index === selectedIndex - 1) {
          return {
            ...slide,
            state: "BEHIND",
          };
        } else if (index === selectedIndex) {
          return {
            ...slide,
            state: "CENTERED",
          };
        } else {
          return {
            ...slide,
            state: "LIST",
          };
        }
      });

      setProjects({
        ...projects,
        [item.id]: updatedSlide,
      });
    }
  };

  const selectedIndex = projects[item.id]
    ? projects[item.id].findIndex((slide) => slide.state === "CENTERED")
    : 0;

  const isPrevButtonClickable = selectedIndex > 0;
  const isNextButtonClickable = projects[item.id]
    ? selectedIndex < projects[item.id].length - 1
    : false;

  useEffect(() => {
    if (isEmpty(projects[item?.id])) {
      setProjects({
        ...projects,
        [item.id]: getSlideObject(item?.projects),
      });
    }
  }, [item, projects]);
  console.log(projects);
  return (
    <Div justify className={`w-full h-full z-3 ${className}`}>
      <Transition
        config={{ mass: 1, tension: 280, friction: 80 }}
        items={item}
        key={item.id}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}>
        {(styles, item) =>
          item && (
            <Div
              animate
              row
              style={{ ...styles, paddingLeft: 246 }}
              align='end'
              className='h-3/4'>
              {map(projects[item.id], (project, index) => (
                <Spring
                  key={project.slug}
                  to={getPropertyBasedOnState(project.state)}>
                  {(styles) => (
                    <ProjectItem
                      index={index}
                      project={project}
                      style={styles}
                    />
                  )}
                </Spring>
              ))}
            </Div>
          )
        }
      </Transition>
      <Div className='mt-10 h-1/4' row>
        <PaginationButton
          isEnabled={isPrevButtonClickable}
          onClick={() => moveTo("previous")}
          className='mx-5'
        />
        <PaginationButton
          isEnabled={isNextButtonClickable}
          onClick={() => moveTo("next")}
          isRight
        />
      </Div>
    </Div>
  );
};

export default memo(RightContainer);
