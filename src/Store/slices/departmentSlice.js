import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  departments: [],
};

const departmentSlice = createSlice({
  name: "department",
  initialState: DEFAULT_STATE,
  reducers: {
    setDepartments(state, action) {
      state.departments = [...action.payload];
    },
  },
});

export const departmentAction = departmentSlice.actions;
export const selectDepartments = (state) => state.department.departments;

export default departmentSlice;
