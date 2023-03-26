import axiosClient from "./Axios/axiosClient";

export const authenticationService = {
  signUp: (data) => {
    const url = "sign-up/with-password";
    return axiosClient.post(url, {
      body: data,
    });
  },
};
