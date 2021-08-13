import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const timelineSlice = createSlice({
  name: "timeline", // slice name, each slice has a different name
  initialState,
  reducers: {
    updateTimeline: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateTimeline } = timelineSlice.actions;

export default timelineSlice.reducer;
