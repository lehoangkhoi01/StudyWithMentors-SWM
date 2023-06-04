import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  isOpen: false,
  message: "",
  type: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: DEFAULT_STATE,
  reducers: {
    setNotification(state, action) {
      state.isOpen = action.payload.isOpen;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    setOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const notificationAction = notificationSlice.actions;
export const selectNotification = (state) => state.notification;

export default notificationSlice;
