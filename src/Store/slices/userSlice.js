import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  isAuthenticated: !!localStorage.getItem("TOKEN"),
  userInfo: null,
  isFirstFetch: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_STATE,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
      return state;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setFirstFetch(state) {
      state.isFirstFetch = true;
    },
  },
});

export const userAction = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectFirstFetch = (state) => state.user.isFirstFetch;

export default userSlice;
