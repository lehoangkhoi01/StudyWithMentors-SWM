import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  isLoading: false,
};

const helperSlice = createSlice({
  name: "helper",
  initialState: DEFAULT_STATE,

  reducers: {
    setLoading(state, action) {
      const status = action.payload;
      state.isLoading = status;
    },
  },
});

export const helperAction = helperSlice.actions;
export const selectLoadingStatus = (state) => state.helper.isLoading;

export default helperSlice;
