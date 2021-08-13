import isEmpty from "lodash/isEmpty";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import backIcon from "~assets/icons/icon-left-arrow-dark.png";
import closeIcon from "~assets/icons/icon-cross.png";
import Div from "~components/Div";
import "~styles/pages/ProjectDetails.css";
import useBreakpoint from "../../hooks/useBreakpoint";
import ElementScroll from "./ElementScroll";
import ElementTransition from "./ElementTransition";
import ProjectViewPager from "./ProjectViewPager";
import ProjectDescription from "./ProjectDescription";
import ProjectImageGrid from "./ProjectImageGrid";
import { useSelector } from "react-redux";

const ProjectDetailsPage = ({
  match,
  style,
  history,
  location,
  startPageEndAnimation,
  onPageAnimationEnd,
}) => {
  const projectsListValue = useSelector((state) => state?.projects);
  const projectId = match && match.params ? match.params.projectSlug : "";
  const [project] = useState(projectsListValue[projectId] || {});
  const [headerShadow, setHeaderShadow] = useState(false);
  const [showViewPagerModal, toggleViewPager] = useState(false);
  const [descriptionPageImageRect, setDescriptionPageImageRect] = useState({});
  const [gridIndex, setGridIndex] = useState(0);
  const screenSize = useBreakpoint();

  const { imageRect, containerRect, color } =
    location && location.state ? location.state : {};
  // Stores the listing page location onto a state
  const [listingPageImageRect] = useState(imageRect);
  const [listingPageContainerRect] = useState(containerRect);
  const [logoColor] = useState(color);

  const imageRef = useRef(null);
  const isPageRedirectedFromListing =
    !!listingPageImageRect && !!listingPageContainerRect;

  //-------------------------------------------ScrollAnimation
  const [{ st }, api] = useSpring(() => ({ st: 0 }));
  let onScroll = useCallback(
    (e) => {
      // Shows/Hides header based on scroll position
      if (e.target.scrollTop > 260 && !headerShadow) {
        setHeaderShadow(true);
      } else if (e.target.scrollTop < 260 && headerShadow) {
        setHeaderShadow(false);
      }

      api.start({ st: e.target.scrollTop });
    },
    [headerShadow, api]
  ); //Update memoized callback when headerShadow state updates
  //-------------------------------------------End

  const [reverseTransitionAnimation, setReverseTransitionAnimation] =
    useState(false);
  const [hideTransitionElement, setHideTransitionElement] = useState(false);
  const [componentReady, setComponentReady] = useState(false);
  const [containerOpacityAnimation, containerOpacityAnimationApi] = useSpring(
    () => ({
      opacity: 0,
    })
  );

  // On Component Mount
  useEffect(() => {
    setDescriptionPageImageRect(imageRef.current.getBoundingClientRect());
    if (!isPageRedirectedFromListing) {
      containerOpacityAnimationApi.start({ opacity: 1 });
      setHideTransitionElement(true);
    }
    setComponentReady(true);

    // Clears the image and container rect state
    window.history.replaceState(null, location.pathname);
  }, [
    isPageRedirectedFromListing,
    containerOpacityAnimationApi,
    location.pathname,
  ]);

  // When component is about to unmount
  useEffect(() => {
    if (startPageEndAnimation) {
      if (isPageRedirectedFromListing) {
        // start page end animation
        setDescriptionPageImageRect(imageRef.current.getBoundingClientRect());
        containerOpacityAnimationApi.start({
          opacity: 0,
          onRest: () => {
            setReverseTransitionAnimation(true);
            setHideTransitionElement(false);
          },
        });
      } else {
        // When user visits the project details page by entering the address on the address box
        onPageAnimationEnd();
      }
    }
  }, [
    startPageEndAnimation,
    isPageRedirectedFromListing,
    containerOpacityAnimationApi,
    onPageAnimationEnd,
  ]);

  return (
    <Div row className='fixed inset-0 z-20' style={style}>
      {showViewPagerModal && (
        <Div className='h-screen w-screen z-40 bg-pw-grey bg-opacity-50 absolute inset-0 justify-center'>
          <div className='cursor-pointer flex justify-center items-center z-40 bg-red-500 w-10 h-10 rounded-full absolute top-5 left-5 hover:bg-opacity-80 transition-all transform hover:scale-110 duration-300'>
            <img
              src={closeIcon}
              onClick={() => toggleViewPager(false)}
              className='w-4'
              alt='close view pager'
            />
          </div>

          <ProjectViewPager
            images={project?.images || []}
            startIndex={gridIndex}
            showFullscreenButton={false}
          />
        </Div>
      )}
      <Div
        animate
        flex={2}
        className={`left_view_pager_container bg-pw-grey bg-opacity-60 hidden lg:flex items-center justify-center relative`}
        style={containerOpacityAnimation}>
        {project?.images && <ProjectViewPager images={project?.images || []} />}
      </Div>
      <Div
        justify='end'
        row
        flex={3}
        className={`header_content_container relative`}>
        {/* -------------------------------Header-------------------------------- */}
        <Div
          justify
          animate
          className={`header_container z-2 absolute top-0 left-0 w-full ${
            headerShadow ? "has_shadow" : ""
          } `}
          style={containerOpacityAnimation}>
          <Div
            row
            justify='space_between'
            className={`header_content mx-3 lg:mx-8`}>
            <img
              alt='back icon'
              src={backIcon}
              className='object-contain w-5 cursor-pointer hover:opacity-60 transition-opacity'
              onClick={() => {
                if (isPageRedirectedFromListing) history.goBack();
                else history.replace("/");
              }}
            />
            <div className='flex-1'></div>
            {project.link ? (
              <a
                rel='noreferrer'
                href={project?.link?.value}
                className='button border-pw-grey mt-0 border'
                target='_blank'>
                Visit
              </a>
            ) : null}
          </Div>
        </Div>
        {/* -------------------------- Container ------------------------------ */}
        {!isEmpty(project) ? (
          <Div className='main_container relative flex-1'>
            <Div className='self-stretch relative shadow_header mx-6 lg:mx-20'>
              <ElementScroll
                color={logoColor || "red"}
                {...{
                  st,
                  project,
                  hideTransitionElement,
                  imageRef,
                  containerOpacityAnimation,
                  isPageRedirectedFromListing,
                  logoColor,
                }}
              />
            </Div>

            <animated.div
              className='content_container overflow-auto mt-10 z-1'
              onScroll={onScroll}
              style={containerOpacityAnimation}>
              <ProjectDescription
                className='content px-6 lg:px-20'
                project={project}
              />
              {project?.images && (
                <ProjectImageGrid
                  images={project?.images || []}
                  canSelect={screenSize !== "lg"}
                  gridItemSelected={(index) => {
                    if (screenSize !== "lg") {
                      toggleViewPager(true);
                    }
                    setGridIndex(index);
                  }}
                />
              )}
            </animated.div>
          </Div>
        ) : null}
      </Div>

      {/* ----------------------------Element Transition---------------------------- */}
      {componentReady && !isEmpty(project) && (
        <ElementTransition
          color={logoColor || "red"}
          {...{
            containerOpacityAnimationApi,
            setHideTransitionElement,
            onPageAnimationEnd,
            hideTransitionElement,
            listingPageImageRect,
            listingPageContainerRect,
            descriptionPageImageRect,
            reverseTransitionAnimation,
            project,
          }}
        />
      )}
    </Div>
  );
};

export default ProjectDetailsPage;
