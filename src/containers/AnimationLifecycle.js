import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AnimationLifecycle = ({
  match,
  location,
  whenToRender,
  component: Component,
  history,
  ...rest
}) => {
  const projectsListValue = useSelector((state) => state?.projects);
  const [showComponent, setShowComponent] = useState(whenToRender(match));
  const [startPageEndAnimation, setStartPageEndAnimation] = useState(false);

  useEffect(() => {
    if (!match && location?.pathname !== "/") {
      history.replace("/");
    }
  }, [history, location, match]);
  useEffect(() => {
    if (whenToRender(match)) {
      if (
        projectsListValue[
          match?.params?.projectSlug ? match.params.projectSlug : ""
        ]
      ) {
        // When user click on project card
        setShowComponent(true);
      } else {
        history.replace("/");
      }
    } else if (showComponent) {
      // When user go back, start end animation
      setStartPageEndAnimation(true);
    }
  }, [match, whenToRender, showComponent, projectsListValue, history]);

  const onPageAnimationEnd = () => {
    // When page did unmount
    setShowComponent(false);
    setStartPageEndAnimation(false);
  };

  return (
    showComponent && (
      <Component
        location={location}
        history={history}
        match={match}
        startPageEndAnimation={startPageEndAnimation}
        onPageAnimationEnd={onPageAnimationEnd}
        {...rest}
      />
    )
  );
};

export default AnimationLifecycle;
