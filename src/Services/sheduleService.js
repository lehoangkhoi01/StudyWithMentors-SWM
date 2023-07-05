import axiosClient from "./Axios/axiosClient";
import { ScheduleEndpoints } from "./apiEndpoints";

export const scheduleService = {
  getSchedule: (startDate, endDate) => {
    const url = `${ScheduleEndpoints.GET_SCHEDULE}?startDate=${startDate}&endDate=${endDate}`;
    return axiosClient.get(url);
  },
};
