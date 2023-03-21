import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import helperSlice from "./slices/helperSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    helper: helperSlice.reducer,
  },
});

export default store;
