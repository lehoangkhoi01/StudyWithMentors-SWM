import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  isLoading: false,
  appbarTitle: "Growth Me System",
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
  },
});

export const helperAction = helperSlice.actions;
export const selectLoadingStatus = (state) => state.helper.isLoading;
export const selectAppbarTitle = (state) => state.helper.appbarTitle;

export default helperSlice;
