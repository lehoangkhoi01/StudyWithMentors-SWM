import axiosClient from "./Axios/axiosClient";
import { SeminarEndpoints } from "./apiEndpoints";

export const seminarService = {
  getSemniars: (filterInfo) => {
    const url = SeminarEndpoints.SEARCH_SEMINAR;
    return axiosClient.get(url, {
      params: filterInfo,
    });
  },
  create: (data) => {
    const url = SeminarEndpoints.SEMINAR;
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
};
