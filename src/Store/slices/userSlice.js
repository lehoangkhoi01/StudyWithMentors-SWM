import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  name: "",
  gender: "",
  email: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_STATE,

  reducers: {
    clearUserData(state) {
      state = DEFAULT_STATE;
      return state;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
