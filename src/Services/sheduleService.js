import axiosClient from "./Axios/axiosClient";
import { ScheduleEndpoints } from "./apiEndpoints";

export const scheduleService = {
  getSchedule: (startDate, endDate) => {
    const url = `${ScheduleEndpoints.SCHEDULE}?startDate=${startDate}&endDate=${endDate}`;
    return axiosClient.get(url);
  },
  createSchedule: (data) => {
    const url = ScheduleEndpoints.SCHEDULE;
    return axiosClient.post(url, data);
  },
  deleteSchedule: (id) => {
    const url = ScheduleEndpoints.SCHEDULE + "/" + id;
    return axiosClient.delete(url);
  },
  createException: (data) => {
    const url = ScheduleEndpoints.SCHEDULE + "/create-exception";
    return axiosClient.post(url, data);
  },
  updateSchedule: (id, data) => {
    const url = ScheduleEndpoints.SCHEDULE + "/" + id;
    return axiosClient.post(url, data);
  },
};