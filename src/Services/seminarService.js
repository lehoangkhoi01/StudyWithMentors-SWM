import axiosClient from "./Axios/axiosClient";
import { SeminarEndpoints } from "./apiEndpoints";

export const seminarService = {
  getSemniars: () => {
    const url = SeminarEndpoints.SEARCH_SEMINAR;
    return axiosClient.get(url);
  },
  create: (data) => {
    const url = SeminarEndpoints.SEMINAR;
    return axiosClient.post(url, data);
  },
  getById: (data) => {
    const url = SeminarEndpoints.SEMINAR + "/" + data;
    return axiosClient.get(url);
  },
};
