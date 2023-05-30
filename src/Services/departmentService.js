import axiosClient from "./Axios/axiosClient";
import { DepartmentEndPoints } from "./apiEndpoints";

export const departmentService = {
  getDepartments: () => {
    const url = DepartmentEndPoints.DEPARTMENT;

    return axiosClient.get(url);
  },
};
