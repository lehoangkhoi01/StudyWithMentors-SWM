import axiosClient from "./Axios/axiosClient";

export const serviceTemp = {
  getUser: (id) => {
    const url = `user/${id}`;

    return axiosClient.get(url);
  },
  updateUser: (info) => {
    if (!info) return;

    const url = `user/${info.id}`;
    return axiosClient.post(url, {
      body: info,
    });
  },
};
