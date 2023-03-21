import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  isLoading: false,
};

const helperSlice = createSlice({
  name: "helpder",
  initialState: DEFAULT_STATE,

  reducers: {
    setLoading(state, action) {
      const status = action.payload;
      state.isLoading = status;
    },
    resetHelper(state) {
      state = DEFAULT_STATE;

      return state;
    },
  },
});

export const helperAction = helperSlice.actions;

export default helperSlice;
