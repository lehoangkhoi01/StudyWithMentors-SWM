import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  mentorList: [],
};

const mentorSlice = createSlice({
  name: "mentor",
  initialState: DEFAULT_STATE,
  reducers: {
    setMentorList(state, action) {
      state.mentorList = [...action.payload];
    },
  },
});

export const mentorAcion = mentorSlice.actions;
export const selectMentorList = (state) => state.mentor.mentorList;

export default mentorSlice;
