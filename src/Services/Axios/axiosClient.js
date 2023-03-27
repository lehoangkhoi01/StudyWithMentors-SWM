import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {},
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params),
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (err) => {
    return Promise.reject(err.response);
  }
);

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
