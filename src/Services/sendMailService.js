import { MailEndpoints } from "./apiEndpoints";
import axiosClient from "./Axios/axiosClient";

export const sendMailService = {
  sendMentorInvitation: (mentorId) => {
    const url = `${MailEndpoints.MAIL}/by-mentor/${mentorId}`;
    return axiosClient.get(url);
  },
};
