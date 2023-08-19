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
  USER_CV: "user-profile/current/cv",
  UPDATE_PROFILE: "user-profile/mentors",
  CONFIRM_PROFILE: "user-profile/current",
  GET_USER_PROFILE: "user-profile",
  UPDATE_DETAIL_PROFILE: "user-profile/current",
};

export const SeminarEndpoints = {
  SEARCH_SEMINAR: "seminars/search",
  SEARCH_SEMINAR_BY_DEPARTMENT: "seminars/byMyDepartment",
  GET_SEMINAR_DETAIL: "seminars",
  SEMINAR: "seminars",
  GET_SEMINARS_BY_MENTOR: "seminars/byMentor",
};

export const AccountEndpoints = {
  ACCOUNT_STAFF: "accounts/staffs",
  ACCONT_MENTOR: "accounts/mentors",
  DELETE_MENTOR: "accounts/mentors/invalidate",
  CREATE_MENTOR: "accounts/mentors",
  GET_MORE_DETAIL_MENTOR: "booking/mentors",
  ACCOUNT_STATUS: "admin/accounts",
  CREATE_STAFF: "admin/staffs",
  UPDATE_STAFF: "user-profile/staffs",
  ACCOUNT_STUDENT: "accounts/students",
  DELETE_ACCOUNT: "accounts"
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
  SEMINAR_FEEDBACK_REPORT: "/feedbacks/seminar-feedback-report",
};

export const TopicEndpoints = {
  GET_TOPIC_FIELDS: "admin/topic-fields",
  GET_TOPIC_CATEGORIES: "admin/topic-categories",
  GET_TOPICS: "admin/topics",
  TOPICS: "topics",
  TOPICS_MENTOR: "topics/by-mentor",
  TOPICS_OWN_MENTOR: "topics/by-mentor/own",
  UPADATE_TOPIC_STATUS: "topics/update-status",
  DELETE_TOPIC_FIELD: "admin/topic-fields",
  UPSERT_TOPIC_FIELD: "admin/topic-fields",
  DELETE_TOPIC_CATEGORIES: "admin/topic-categories",
  UPSERT_TOPIC_CATEGORIES: "admin/topic-categories",
};

export const ScheduleEndpoints = {
  SCHEDULE: "schedules",
  SCHEDULE_MENTOR: "schedules/by-mentor",
};

export const BookingEndpoints = {
  BOOKING: "booking",
  ADMIN_BOOKING: "admin/bookings",
};

export const MeetingFeedbackEndpoints = {
  MEETING_FEEDBACK: "meeting-feedback",
  MEETING_FEEDBACK_BY_USER: "meeting-feedback/by-user",
  MEETING_FEEDBACK_BY_BOOKING: "meeting-feedback/by-booking",
};

export const FollowMentorEndpoints = {
  PROFILE: "user-profile",
};

export const MailEndpoints = {
  MAIL: "mails",
};

export const SystemConfigEndpoints = {
  CONFIG: "admin/configs",
};
