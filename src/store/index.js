import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import timelineReducer from "./timelineSlice";
import techReducer from "./techSlice";
import projectsSlice from "./projectsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    timeline: timelineReducer,
    tech: techReducer,
    projects: projectsSlice,
  },
});
