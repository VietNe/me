import anime from "animejs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import IconLoader from "~assets/icons/loader";
import "~styles/components/Loader.css";
import { db } from "../services/firebase";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";
import { updateTimeline } from "../store/timelineSlice";
import { updateTech } from "../store/techSlice";
import { updateProjects } from "../store/projectsSlice";

const Loader = ({ finishLoading }) => {
  const dispatch = useDispatch();
  const [loading, showLoading] = useState(false);
  useEffect(() => {
    const animate = () => {
      const loader = anime.timeline({
        complete: () => {
          showLoading(true);
        },
      });

      loader

        .add({
          targets: "#logo path",
          strokeDashoffset: [anime.setDashoffset, 0],
          duration: 2000,
          easing: "easeInOutSine",
          stroke: "#fbae17",
          delay: 500,
        })
        .add({
          targets: "#logo path",
          fill: "#fbae17",
          easing: "easeInOutSine",
        })
        .add({
          targets: "#logo",
          delay: 1000,
          duration: 1000,
          easing: "easeInOutQuart",
          opacity: 0,
          scale: 0.1,
        });
    };

    animate();
  }, []);

  useEffect(() => {
    const getData = async () => {
      // Get Profile
      db.collection("portfolio")
        .doc("user")
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();

            dispatch(updateUser(data));
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      // Get Timeline
      db.collection("timeline")
        .get()
        .then((querySnapshot) => {
          let list = [];
          querySnapshot.forEach((doc) => {
            list.push(doc.data());
          });
          dispatch(updateTimeline(list));
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      // Get tech
      db.collection("tech")
        .get()
        .then((querySnapshot) => {
          let list = [];
          querySnapshot.forEach((doc) => {
            list.push(doc.data());
          });
          dispatch(updateTech(list));
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      // Get projects
      db.collection("projects")
        .get()
        .then((querySnapshot) => {
          let list = {};
          querySnapshot.forEach((doc) => {
            list[doc.id] = doc.data();
          });
          dispatch(updateProjects(list));
          finishLoading();
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    if (loading) {
      const animate2 = () => {
        const loader = anime.timeline({
          complete: () => {
            getData();
          },
        });

        loader.add({
          targets: ".loading",
          delay: 1000,
          duration: 1000,
          easing: "easeInOutQuart",
          opacity: 1,
          scale: 1,
        });
      };

      animate2();
    }
  }, [loading, dispatch, finishLoading]);

  return (
    <div className='loader'>
      <div className='logo-wrapper'>
        {!loading ? (
          <IconLoader />
        ) : (
          <div className='loading text-white'>
            <div className='bounceball'></div>
            <div className='text font-black'>LOADING</div>
          </div>
        )}
      </div>
    </div>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
