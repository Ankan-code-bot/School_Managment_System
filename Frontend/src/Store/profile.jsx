// src/slices/profile.js
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { userName: "guest", attendId: "" },
  reducers: {
    profileName(state, action) {
      state.userName = action.payload;
    },
    SetattendId(state, action) {
      state.attendId = action.payload;
    }
  }
});

export const { profileName, SetattendId } = profileSlice.actions;
export default profileSlice.reducer;
