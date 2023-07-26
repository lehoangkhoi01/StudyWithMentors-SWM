import axiosClient from "./Axios/axiosClient";
import { FollowMentorEndpoints } from "./apiEndpoints";

export const followMentorService = {
  follow: (id) => {
    const url = `${FollowMentorEndpoints.PROFILE}/follow?mentor=${id}`;
    return axiosClient.post(url);
  },
  unfollow: (id) => {
    const url = `${FollowMentorEndpoints.PROFILE}/unfollow?mentor=${id}`;
    return axiosClient.post(url);
  },
  getFollowing: (id) => {
    const url = `${FollowMentorEndpoints.PROFILE}/${id}/followings`;
    return axiosClient.get(url);
  },
};
