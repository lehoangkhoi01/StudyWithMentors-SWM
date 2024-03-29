import axiosClient from "./Axios/axiosClient";
import { BookingEndpoints } from "./apiEndpoints";

export const bookingService = {
  createBooking: (data) => {
    const url = BookingEndpoints.BOOKING;
    return axiosClient.post(url, data);
  },
  getBooking: () => {
    const url = BookingEndpoints.BOOKING;
    return axiosClient.get(url);
  },
  getBookingAdmin: () => {
    const url = BookingEndpoints.ADMIN_BOOKING;
    return axiosClient.get(url);
  },
  updateBookingStatus: (data) => {
    const url = BookingEndpoints.BOOKING;
    return axiosClient.put(url, data);
  },
  getBookingById: (id) => {
    const url = `${BookingEndpoints.BOOKING}/${id}`;
    return axiosClient.get(url);
  },
  checkBookingAllowed: (id) => {
    const url = `${BookingEndpoints.BOOKING}/is-allowed/${id}`;
    return axiosClient.get(url);
  },
  logAttendance: (id, data) => {
    const url = `${BookingEndpoints.BOOKING}/attend/${id}`;
    return axiosClient.post(url, data);
  },
  getLogAttendance: (id) => {
    const url = `${BookingEndpoints.BOOKING}/${id}/logs`;
    return axiosClient.get(url);
  },
};
