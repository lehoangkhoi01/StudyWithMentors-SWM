import axiosClient from "./Axios/axiosClient";
import { AccountEndpoints } from "./apiEndpoints";

export const accountService = {
  getAllMentors: () => {
    const url = AccountEndpoints.ACCONT_MENTOR;
    return axiosClient.get(url);
  },
};
