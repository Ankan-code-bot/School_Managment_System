// src/slices/auth.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLogged: false, role: "user" },
  reducers: {
    logIn(state) {
      state.isLogged = true;
    },
    logOut(state) {
      state.isLogged = false;
    },
    changeRole(state, action) {
      state.role = action.payload;
    }
  }
});

export const { logIn, logOut, changeRole } = authSlice.actions;
export default authSlice.reducer;
