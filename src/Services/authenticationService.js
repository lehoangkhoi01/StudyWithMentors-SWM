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
  sendResetPasswordEmail: (data) => {
    const url = AuthenticationEndpoints.SEND_RESET_EMAIL;
    return axiosClient.post(url, data);
  },
  applyPasswordChange: (data) => {
    const url = AuthenticationEndpoints.APPLY_PASSWORD_CHANGE;
    return axiosClient.post(url, data);
  },
};
