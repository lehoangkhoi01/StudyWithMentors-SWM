import axiosClient from "./Axios/axiosClient";
import { DepartmentEndPoints } from "./apiEndpoints";

export const departmentService = {
  getDepartments: () => {
    const url = DepartmentEndPoints.DEPARTMENT;

    return axiosClient.get(url);
  },
  deleteDepartment: (id) => {
    const url = `${DepartmentEndPoints.DEPARTMENT}/${id}`;

    return axiosClient.delete(url);
  },
  updateDepartment: (data, id) => {
    const url = DepartmentEndPoints.DEPARTMENT + "/" + id;

    return axiosClient.post(url, data);
  },
  createDepartment: (data) => {
    const url = DepartmentEndPoints.DEPARTMENT;

    return axiosClient.post(url, data);
  },
};
