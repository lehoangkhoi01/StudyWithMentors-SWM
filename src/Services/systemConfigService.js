import axiosClient from "./Axios/axiosClient";
import { SystemConfigEndpoints } from "./apiEndpoints";

export const systemConfigService = {
  getConfigs: () => {
    const url = SystemConfigEndpoints.CONFIG;
    return axiosClient.get(url);
  },
  updateConfig: (data) => {
    const url = SystemConfigEndpoints.CONFIG;
    return axiosClient.post(url, data);
  },
};
