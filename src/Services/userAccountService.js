import { UserAccountEndpoints } from "./apiEndpoints";
import axiosClient from "./Axios/axiosClient";

export const userAccountService = {
  getUserInfo: () => {
    const url = UserAccountEndpoints.GET_USER_INFO;
    return axiosClient.get(url);
  },
};
