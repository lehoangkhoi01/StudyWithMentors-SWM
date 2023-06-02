import axiosClient from "./Axios/axiosClient";
import { SeminarFeedbackEndpoints } from "./apiEndpoints";

export const seminarFeedbackService = {
  getQuestion: (id) => {
    const url = `${SeminarFeedbackEndpoints.SEMINAR_FEEDBACK}/${id}`;
    return axiosClient.get(url);
  },
  send: (id, data) => {
    const url = `${SeminarFeedbackEndpoints.SEMINAR_FEEDBACK}/${id}`;
    return axiosClient.post(url, data);
  },
};
