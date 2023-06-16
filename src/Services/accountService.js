import axiosClient from "./Axios/axiosClient";
import { AccountEndpoints } from "./apiEndpoints";

export const accountService = {
  getAllMentors: () => {
    const url = AccountEndpoints.ACCONT_MENTOR;
    return axiosClient.get(url);
  },
  deleteMentors: (ids) => {
    const url = AccountEndpoints.DELETE_MENTOR;
    return axiosClient.post(url, {
      ids,
    });
  },
  createMentor: (data) => {
    const url = AccountEndpoints.CREATE_MENTOR;
    return axiosClient.post(url, data);
  },
};
