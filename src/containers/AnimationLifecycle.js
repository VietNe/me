import React, { useState, useEffect } from "react";

const AnimationLifecycle = ({
  match,
  whenToRender,
  component: Component,
  ...rest
}) => {
  const [showComponent, setShowComponent] = useState(whenToRender(match));
  const [startPageEndAnimation, setStartPageEndAnimation] = useState(false);

  useEffect(() => {
    if (whenToRender(match)) {
      // When user click on project card
      setShowComponent(true);
    } else if (showComponent) {
      // When user go back, start end animation
      setStartPageEndAnimation(true);
    }
  }, [match, whenToRender, showComponent]);

  const onPageAnimationEnd = () => {
    // When page did unmount
    setShowComponent(false);
    setStartPageEndAnimation(false);
  };

  return (
    showComponent && (
      <Component
        match={match}
        startPageEndAnimation={startPageEndAnimation}
        onPageAnimationEnd={onPageAnimationEnd}
        {...rest}
      />
    )
  );
};

export default AnimationLifecycle;
