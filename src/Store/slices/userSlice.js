import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  isAuthenticated: !!localStorage.getItem("TOKEN"),
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_STATE,
  reducers: {
    clearUserData(state) {
      state = DEFAULT_STATE;
      return state;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
  },
});

export const userAction = userSlice.actions;

export const selectUserInfo = (state) => state.user;

export default userSlice;
