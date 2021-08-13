import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const techSlice = createSlice({
  name: "tech", // slice name, each slice has a different name
  initialState,
  reducers: {
    updateTech: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateTech } = techSlice.actions;

export default techSlice.reducer;
