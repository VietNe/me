import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const projectsSlice = createSlice({
  name: "projects", // slice name, each slice has a different name
  initialState,
  reducers: {
    updateProjects: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
