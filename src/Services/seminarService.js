import axiosClient from "./Axios/axiosClient";
import { SeminarEndpoints } from "./apiEndpoints";

export const seminarService = {
  getSemniars: () => {
    const url = SeminarEndpoints.SEARCH_SEMINAR;

    return axiosClient.get(url);
  },
  getSeminarDetail: (id) => {
    const url = `${SeminarEndpoints.GET_SEMINAR_DETAIL}/${id}`;

    return axiosClient.get(url);
  }
};
