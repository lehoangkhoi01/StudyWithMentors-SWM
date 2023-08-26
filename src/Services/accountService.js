import axiosClient from "./Axios/axiosClient";
import { AccountEndpoints, BookingEndpoints } from "./apiEndpoints";

export const accountService = {
  getAllMentors: () => {
    const url = AccountEndpoints.ACCONT_MENTOR;
    return axiosClient.get(url);
  },
  deleteMentors: (ids) => {
    const url = AccountEndpoints.DELETE_MENTOR;
    return axiosClient.post(url, {
      ids,
    });
  },
  createMentor: (data) => {
    const url = AccountEndpoints.CREATE_MENTOR;
    return axiosClient.post(url, data);
  },
  getAllMoreInfoMentors: (params) => {
    const url = AccountEndpoints.GET_MORE_DETAIL_MENTOR;
    // return axiosClient.get(url, {
    //   params: {
    //     searchString: ["", ...params],
    //   },
    // });
    return axiosClient.post(url, params)
  },
  getRecommendMentors: (params) => {
    const url = BookingEndpoints.BOOKING + "/mentors-recommend";
    // return axiosClient.get(url, {
    //   params: {
    //     searchString: ["", ...params],
    //   },
    // });
    return axiosClient.post(url, params)
  },
  getAllStaffs: () => {
    const url = AccountEndpoints.ACCOUNT_STAFF;
    return axiosClient.get(url);
  },
  createStaff: (data) => {
    const url = AccountEndpoints.CREATE_STAFF;
    return axiosClient.post(url, data);
  },
  updateAccountStatus: (id, status) => {
    const url = `${AccountEndpoints.ACCOUNT_STATUS}/${id}`;

    return axiosClient.post(url, {
      status,
    });
  },
  updateStaff: (data, id) => {
    const url = `${AccountEndpoints.UPDATE_STAFF}/${id}`;
    return axiosClient.post(url, data);
  },
  getStudents: () => {
    const url = AccountEndpoints.ACCOUNT_STUDENT;
    return axiosClient.get(url);
  },
  deleteAccount: (id) => {
    const url = `${AccountEndpoints.DELETE_ACCOUNT}/${id}`;
    return axiosClient.delete(url);
  }
};
