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
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const userAction = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice;
