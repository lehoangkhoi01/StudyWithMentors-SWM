import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  topicFields: [],
  topicCategories: [],
};

const topicSlice = createSlice({
  name: "topic",
  initialState: DEFAULT_STATE,
  reducers: {
    setTopicFields(state, action) {
      state.topicFields = [...action.payload];
    },
    setTopicCategories(state, action) {
        state.topicCategories = [...action.payload];
      },
  },
});

export const topicAction = topicSlice.actions;
export const selectTopicFields = (state) => state.topic.topicFields;
export const selectTopicCategories = (state) => state.topic.topicCategories;

export default topicSlice;
