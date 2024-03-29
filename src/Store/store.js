import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import helperSlice from "./slices/helperSlice";
import notificationSlice from "./slices/notificationSlice";
import mentorSlice from "./slices/mentorSlice";
import topicSlice from "./slices/topicSlice";
import departmentSlice from "./slices/departmentSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    helper: helperSlice.reducer,
    notification: notificationSlice.reducer,
    mentor: mentorSlice.reducer,
    topic: topicSlice.reducer,
    department: departmentSlice.reducer,
  },
});

export default store;
