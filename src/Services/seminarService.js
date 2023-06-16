import axiosClient from "./Axios/axiosClient";
import { SeminarEndpoints } from "./apiEndpoints";

export const seminarService = {
  getSemniars: (filterInfo, specificedUrl) => {
    const url = specificedUrl ? specificedUrl : SeminarEndpoints.SEARCH_SEMINAR;
    return axiosClient.get(url, {
      params: filterInfo,
    });
  },
  create: (data) => {
    const url = SeminarEndpoints.SEMINAR;
    return axiosClient.post(url, data);
  },
  update: (id, data) => {
    const url = `${SeminarEndpoints.SEMINAR}/${id}`;
    return axiosClient.post(url, data);
  },
  getById: (data) => {
    const url = SeminarEndpoints.SEMINAR + "/" + data;
    return axiosClient.get(url);
  },
  getSeminarDetail: (id) => {
    const url = `${SeminarEndpoints.GET_SEMINAR_DETAIL}/${id}`;
    return axiosClient.get(url);
  },
  removeSeminar: (id) => {
    const url = `${SeminarEndpoints.SEMINAR}/${id}`;
    return axiosClient.delete(url);
  },
};
