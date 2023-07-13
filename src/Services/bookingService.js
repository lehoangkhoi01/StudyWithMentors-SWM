import axiosClient from "./Axios/axiosClient";
import { BookingEndpoints } from "./apiEndpoints";

export const bookingService = {
  createBooking: (data) => {
    const url = BookingEndpoints.BOOKING;
    return axiosClient.post(url, data);
  },
};
