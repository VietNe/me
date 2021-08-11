import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  descriptions: [],
  links: [],
  avatar_img: "",
};

export const userSlice = createSlice({
  name: "user", // slice name, each slice has a different name
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
