import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import helperSlice from "./slices/helperSlice";
import notificationSlice from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    helper: helperSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;
