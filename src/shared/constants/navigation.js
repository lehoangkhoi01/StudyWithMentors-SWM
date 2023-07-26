export const ROUTES = {
  SIGN_IN: "/sign-in",
  FILL_INFORMATION: "/fill-information",
  FORGOT_PASSWORD: "/forgot-password",
  CV: "/cv",
  HOME: "/home",
  MENTOR_LIST: "/mentors",
  CALENDAR: "/mentor/calendar",
  SEMINAR_FEEDBACK: "/seminar-feedback/:id",
  NOT_FOUND: "/not-found",
  SERVER_ERROR: "/server-error",
  SEMINAR_LIST: "/seminars",
  SEMINAR_DETAIL: "/seminars/:id",
  SEMINAR_CREATE: "/staff/seminar-create",
  SEMINAR_UPDATE: "/staff/update-seminar/:id",
  FEEDBACK_OVERVIEW: "/management/feedback-overview/:id",
  ADMIN_MENTOR_LIST: "/management/mentors",
  MEETING: "/meeting-room/:id",
  TOPIC_LIST: "/topic/list",
  BOOKING_LIST: "/booking/list",
  CATEGORY_LIST: "/admin/categories",
  DEPARTMENT_LIST: "/admin/departments",
  FIELD_LIST: "/admin/fields",
  ADMIN_BOOKING_LIST: "/admin/bookings",
};

export const ROUTES_STATIC = {
  SEMINAR_DETAIL: "/seminars",
  SEMINAR_UPDATE: "/staff/update-seminar",
  FEEDBACK_OVERVIEW: "/management/feedback-overview",
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
    TITLE: "Về GrowthMe",
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
    TITLE: "Lịch hẹn",
    ROUTE: ROUTES.BOOKING_LIST,
  },
  {
    TITLE: "Tìm Mentor",
    ROUTE: ROUTES.MENTOR_LIST,
  },
];

export const MENTOR_NAVBAR = [
  {
    TITLE: "Trang chủ",
    ROUTE: ROUTES.HOME,
  },
  {
    TITLE: "Hội thảo",
    ROUTE: ROUTES.SEMINAR_LIST,
  },
  {
    TITLE: "Lịch hẹn",
    ROUTE: ROUTES.BOOKING_LIST,
  },
  {
    TITLE: "Chủ đề",
    ROUTE: ROUTES.TOPIC_LIST,
  },
  {
    TITLE: "Lịch rảnh",
    ROUTE: ROUTES.CALENDAR,
  },
  {
    TITLE: "Hồ sơ của tôi",
    ROUTE: ROUTES.CV,
  },
];

export const MENTOR_NAVBAR_LARGE_SCREEN = [
  {
    TITLE: "Trang chủ",
    ROUTE: ROUTES.HOME,
  },
  {
    TITLE: "Hội thảo",
    ROUTE: ROUTES.SEMINAR_LIST,
  },
  {
    TITLE: "Lịch hẹn",
    ROUTE: ROUTES.BOOKING_LIST,
  },
  {
    TITLE: "Cố vấn",
    MENU: [
      {
        TITLE: "Chủ đề",
        ROUTE: ROUTES.TOPIC_LIST,
      },
      {
        TITLE: "Lịch rảnh",
        ROUTE: ROUTES.CALENDAR,
      },
    ],
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
