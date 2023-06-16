import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  isLoading: false,
  appbarTitle: "Growth Me System",
  shouldCommentListRerender: true,
};

const helperSlice = createSlice({
  name: "helper",
  initialState: DEFAULT_STATE,

  reducers: {
    setLoading(state, action) {
      const status = action.payload;
      state.isLoading = status;
    },
    setAppbarTitle(state, action) {
      const title = action.payload;
      state.appbarTitle = title;
    },
    setShouldCommentListRerender(state, action) {
      const status = action.payload;
      state.shouldCommentListRerender = status;
    },
  },
});

export const helperAction = helperSlice.actions;
export const selectLoadingStatus = (state) => state.helper.isLoading;
export const selectAppbarTitle = (state) => state.helper.appbarTitle;
export const selectShoudCommentRerender = (state) =>
  state.helper.shouldCommentListRerender;

export default helperSlice;
