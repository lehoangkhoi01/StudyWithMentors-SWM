export const AuthenticationEndpoints = {
  SIGN_UP_WITH_PASSWORD: "sign-up/with-password",
  SIGN_IN_WITH_PASSWORD: "sign-in/with-password",
  SIGN_IN_WITH_GOOGLE: "sign-in/with-google",
  SEND_RESET_EMAIL: "sign-in/send-reset-email",
  APPLY_PASSWORD_CHANGE: "sign-in/apply-password-change",
  VERIFY_EMAIL: "sign-up/email-verification",
};

export const UserAccountEndpoints = {
  GET_USER_INFO: "user-profile/current",
  USER_CV: "user-profile/cv/current",
};

export const SeminarEndpoints = {
  SEARCH_SEMINAR: "seminars/search",
  SEARCH_SEMINAR_BY_DEPARTMENT: "seminars/byMyDepartment",
  GET_SEMINAR_DETAIL: "seminars",
  SEMINAR: "seminars",
};

export const AccountEndpoints = {
  ACCOUNT_STAFF: "accounts/staffs",
  ACCONT_MENTOR: "accounts/mentors",
};

export const StaticResourceEndpoints = {
  IMAGE: "resource/images",
  ATTACHMENT: "resource/attachments",
};

export const DepartmentEndPoints = {
  DEPARTMENT: "departments",
};

export const SeminarFeedbackEndpoints = {
  SEMINAR_FEEDBACK: "feedbacks/seminar",
};
