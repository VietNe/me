import anime from "animejs";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "~styles/components/Loader.css";
import { IconLoader } from "~assets/icons";

const Loader = ({ finishLoading }) => {
  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: "#logo path",
        delay: 300,
        duration: 1500,
        easing: "easeInOutSine",

        strokeDashoffset: [anime.setDashoffset, 0],
        complete: function (anim) {
          document.querySelector("path").setAttribute("fill", "yellow");
        },
      })
      .add({
        targets: "#logo path",
        duration: 700,
        easing: "easeInOutQuart",
        fill: "#64ffda",
      });
    // .add({
    //   targets: "#logo",
    //   delay: 500,
    //   duration: 300,
    //   easing: "easeInOutQuart",
    //   opacity: 0,
    //   scale: 0.1,
    // })
    // .add({
    //   targets: ".loader",
    //   duration: 200,
    //   easing: "easeInOutQuart",
    //   opacity: 0,
    //   zIndex: -1,
    // });
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <div className='loader'>
      <div className='logo-wrapper'>
        <IconLoader />
      </div>
    </div>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
