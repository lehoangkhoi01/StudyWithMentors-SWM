import { UserAccountEndpoints } from "./apiEndpoints";
import axiosClient from "./Axios/axiosClient";

export const userAccountService = {
  getUserInfo: () => {
    const url = UserAccountEndpoints.GET_USER_INFO;
    return axiosClient.get(url);
  },
  updateUserProfile: (id, data) => {
    const url = `${UserAccountEndpoints.UPDATE_PROFILE}/${id}`;
    return axiosClient.post(url, data);
  },
  confirmUserProfile: (data) => {
    const url = UserAccountEndpoints.CONFIRM_PROFILE;
    return axiosClient.post(url, data);
  },
  getUserProfileById: (id) => {
    const url = `${UserAccountEndpoints.GET_USER_PROFILE}/${id}`;
    return axiosClient.get(url);
  },
  getAllStudents: () => {
    const url = `${UserAccountEndpoints.GET_USER_PROFILE}/mentees`;
    return axiosClient.get(url);
  },
};
