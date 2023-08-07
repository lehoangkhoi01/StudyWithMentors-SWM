import axiosClient from "./Axios/axiosClient";
import { ScheduleEndpoints } from "./apiEndpoints";

export const scheduleService = {
  getSchedule: (startDate, endDate) => {
    const url = `${ScheduleEndpoints.SCHEDULE}?startDate=${startDate}&endDate=${endDate}`;
    return axiosClient.get(url);
  },
  getMentorSchedule: (id, startDate, endDate, isShowBooking = false) => {
    const url = `${ScheduleEndpoints.SCHEDULE_MENTOR}/${id}?startDate=${startDate}&endDate=${endDate}&showBooking=${isShowBooking}`;
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
  updateException: (exceptionId, data) => {
    const url = `${ScheduleEndpoints.SCHEDULE}/exception/${exceptionId}`;
    return axiosClient.post(url, data);
  },
  removeException: (exceptionId, parentId) => {
    const url = `${ScheduleEndpoints.SCHEDULE}/exception/${exceptionId}`;
    const data = {
      parentId: parentId,
      remove: true,
    };
    return axiosClient.post(url, data);
  },
};
