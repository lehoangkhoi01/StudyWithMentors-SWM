import { StaticResourceEndpoints } from "./apiEndpoints";
import axiosClient from "./Axios/axiosClient";

export const resourceService = {
  uploadImage: (data) => {
    const url = StaticResourceEndpoints.IMAGE;
    return axiosClient.post(url, data);
  },
  uploadAttachment: (data) => {
    const url = StaticResourceEndpoints.ATTACHMENT;
    return axiosClient.post(url, data);
  },
};
