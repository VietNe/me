import { isEmpty, map } from "lodash";
import React, { memo, useEffect, useState, useCallback } from "react";
import { Spring, Transition } from "react-spring";
import { Div, PaginationButton, ProjectItem } from "~components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useSelector } from "react-redux";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const RightContainer = ({ item, className }) => {
  const projectsListValue = useSelector((state) => state?.projects);
  const [projects, setProjects] = useState({});

  const getSlideObject = useCallback(
    (projects) => {
      return map(projects, (project, index) => {
        const state = index === 0 ? "CENTERED" : "LIST";
        return {
          ...projectsListValue[project],
          slug: project,
          state,
        };
      });
    },
    [projectsListValue]
  );

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
          maxHeight: 410,
          height: "50vh",
          width: 249,
          minWidth: 249,
          marginLeft: -286,
          marginBottom: -10,
          marginRight: 37,
        };
      case states.BEHIND:
        return {
          opacity: 1,
          marginBottom: -20,
          minHeight: 300,
          maxHeight: 410,

          height: "50vh",
          width: 249,
          minWidth: 249,
          marginLeft: -286,
          marginRight: 37,
        };
      case states.GONE:
        return {
          marginBottom: -30,
          opacity: 0,
          minHeight: 300,
          maxHeight: 410,

          height: "50vh",
          width: 249,
          minWidth: 249,
          marginLeft: -286,
          marginRight: 37,
        };
      default:
        return {
          minHeight: 270,
          maxHeight: 370,
          width: 223,
          minWidth: 223,
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
    if (item && isEmpty(projects[item?.id])) {
      setProjects({
        ...projects,
        [item.id]: getSlideObject(item?.projects),
      });
    }
  }, [item, projects, getSlideObject]);

  return (
    <Div justify className={`w-full h-full z-3 ${className}`}>
      {projects && (
        <>
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
                  style={{ ...styles, paddingLeft: 296 }}
                  align='end'
                  className='h-3/4 hidden md:flex'>
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
          <div
            style={{ width: "100%", overflow: "auto" }}
            className='mt-5 block md:hidden'>
            <Swiper slidesPerView={1} navigation={true}>
              {map(projects[item.id], (project, index) => (
                <SwiperSlide key={index}>
                  <div className='flex justify-center'>
                    <ProjectItem
                      project={project}
                      noMargin
                      style={{
                        height: 290,
                        width: 210,
                        backgroundColor: "#fff",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Div className='mt-10 h-1/4 hidden md:flex' row>
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
        </>
      )}
    </Div>
  );
};

export default memo(RightContainer);
