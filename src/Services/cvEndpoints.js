import axiosClient from "./Axios/axiosClient";
import { UserAccountEndpoints } from "./apiEndpoints";

export const cvEndpoints = {
  getUserCV: () => {
    const url = UserAccountEndpoints.USER_CV;

    return axiosClient.get(url);
  },
  updateUserCV: (cv) => {
    if (!cv) return;

    const url = UserAccountEndpoints.USER_CV;
    return axiosClient.post(url, cv);
  },
  getMentorCV: (id) => {
    const url = `user-profile/${id}/cv`;

    return axiosClient.get(url);
  },
};
