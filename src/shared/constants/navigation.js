export const ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  SIGN_UP_CONFIRMATION: "/confirmation",
  FILL_INFORMATION: "/fill-information",
  FORGOT_PASSWORD: "/forgot-password",
  CV: "/cv",
  HOME: "/home",
  CALENDAR: "/calendar",
  ACCOUNT: "/account",
  SEMINAR_FEEDBACK: "/seminar-feedback/:id",
  NOT_FOUND: "/not-found",
  SERVER_ERROR: "/server-error",
  SEMINAR_LIST: "/seminars",
  SEMINAR_DETAIL: "/seminars/:id",
  SEMINAR_CREATE: "/staff/seminar-create",
  SEMINAR_UPDATE: "/staff/update-seminar/:id",
  FEEDBACK_OVERVIEW: "/feedback-overview/:id",
  MENTOR_LIST: "/mentors",
  ADMIN_MENTOR_LIST: "/admin/mentors",
  DISCUSSION: "/discussion/:id",
  MEETING: "/meeting",
  TOPIC_LIST: "/topics",
  BOOKING: "/booking",
};

export const ROUTES_STATIC = {
  SEMINAR_DETAIL: "/seminars",
  SEMINAR_UPDATE: "/staff/update-seminar",
  FEEDBACK_OVERVIEW: "/feedback-overview",
};

export const UNAUTHORIZED_NAVBAR = [
  {
    TITLE: "Trang chủ",
    ROUTE: ROUTES.HOME,
  },
  {
    TITLE: "Hội thảo",
    ROUTE: ROUTES.SEMINAR_LIST,
  },
  {
    TITLE: "Tìm Mentor",
  },
];

export const COMMON_NAVBAR = [
  {
    TITLE: "Trang chủ",
    ROUTE: ROUTES.HOME,
  },
  {
    TITLE: "Hội thảo",
    ROUTE: ROUTES.SEMINAR_LIST,
  },
  {
    TITLE: "Về Growth Me",
  },
  {
    TITLE: "Tìm Mentor",
  },
];

export const MENTOR_NAVBAR = [
  {
    TITLE: "Trang chủ",
    ROUTE: ROUTES.HOME,
  },
  {
    TITLE: "Tìm mentor",
    ROUTE: ROUTES.MENTOR_LIST,
  },
  {
    TITLE: "Hội thảo",
    ROUTE: ROUTES.SEMINAR_LIST,
  },
  {
    TITLE: "Hồ sơ của tôi",
    ROUTE: ROUTES.CV,
  },
];

export const STAFF_NAVBAR = [
  {
    TITLE: "Trang chủ",
    ROUTE: ROUTES.HOME,
  },
  {
    TITLE: "Hội thảo",
    ROUTE: ROUTES.SEMINAR_LIST,
  },
  {
    TITLE: "Về Growth Me",
  },
  {
    TITLE: "Các hội thảo",
  },
];

export const ACCOUNT_MENU = [
  {
    TITLE: "Tài khoản",
  },
  {
    TITLE: "Đăng xuất",
    ACTION: "LOG_OUT",
  },
];

export const AUTHENTICATION_MENU = [
  {
    TITLE: "Đăng nhập",
    ROUTE: ROUTES.SIGN_IN,
  },
];
