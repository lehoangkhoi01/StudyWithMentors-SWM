import axiosClient from "./Axios/axiosClient";
import { MeetingFeedbackEndpoints } from "./apiEndpoints";

export const meetingFeedbackService = {
  sendFeedback: (id, data) => {
    const url = `${MeetingFeedbackEndpoints.MEETING_FEEDBACK}/${id}`;
    return axiosClient.post(url, data);
  },
  getFeedbackByBookingId: (id) => {
    const url = `${MeetingFeedbackEndpoints.MEETING_FEEDBACK_BY_BOOKING}/${id}`;
    return axiosClient.get(url);
  },
};
