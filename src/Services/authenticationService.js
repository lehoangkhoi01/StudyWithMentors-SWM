import { AuthenticationEndpoints } from "./apiEndpoints";
import axiosClient from "./Axios/axiosClient";

export const authenticationService = {
  signUp: (data) => {
    const url = AuthenticationEndpoints.SIGN_UP_WITH_PASSWORD;
    return axiosClient.post(url, data);
  },
  signInGoogle: (data) => {
    const url = AuthenticationEndpoints.SIGN_IN_WITH_GOOGLE;
    return axiosClient.post(url, data);
  },
  signInWithPassword: (data) => {
    const url = AuthenticationEndpoints.SIGN_IN_WITH_PASSWORD;
    return axiosClient.post(url, data);
  },
};
