export const ROUTES = {
  SIGN_IN: "/sign-in",
  FILL_INFORMATION: "/fill-information",
  FORGOT_PASSWORD: "/forgot-password",
  CV: "/cv",
  HOME: "/home",
  ABOUT: "/about",
  MENTOR_LIST: "/mentors",
  CALENDAR: "/mentor/calendar",
  SEMINAR_FEEDBACK: "/seminar-feedback/:id",
  NOT_FOUND: "/not-found",
  SERVER_ERROR: "/server-error",
  SEMINAR_LIST: "/seminars",
  SEMINAR_DETAIL: "/seminars/:id",
  SEMINAR_CREATE: "/seminar-create",
  SEMINAR_UPDATE: "/update-seminar/:id",
  FEEDBACK_OVERVIEW: "/management/feedback-overview/:id",
  ADMIN_MENTOR_LIST: "/management/mentors",
  MEETING: "/meeting-room/:id",
  TOPIC_LIST: "/topic/list",
  BOOKING_LIST: "/booking/list",
  CATEGORY_LIST: "/admin/categories",
  DEPARTMENT_LIST: "/admin/departments",
  FIELD_LIST: "/admin/fields",
  ADMIN_BOOKING_LIST: "/admin/bookings",
  STAFF_LIST: "/admin/staffs",
  STUDENT_LIST: "/admin/students",
  ADMIN_CONFIG: "/admin/config",
  ADMIN_SEMINAR_LIST: "/admin/seminars",
  PROFILE: "/profile"
};

export const ROUTES_STATIC = {
  SEMINAR_DETAIL: "/seminars",
  SEMINAR_UPDATE: "/update-seminar",
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
    TITLE: "Tìm Mentor",
    ROUTE: ROUTES.MENTOR_LIST,
  },
  {
    TITLE: "Về GrowthMe",
    ROUTE: ROUTES.ABOUT,
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
    TITLE: "Tìm Mentor",
    ROUTE: ROUTES.MENTOR_LIST,
  },
  {
    TITLE: "Lịch hẹn",
    ROUTE: ROUTES.BOOKING_LIST,
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
  {
    TITLE: "Lịch hẹn",
    ROUTE: ROUTES.BOOKING_LIST,
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
    ACTION: "UPDATE_PROFILE"
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

export const ADMIN_MANAGE_SYSTEM_MENU = [
  {
    TITLE: "Lịch hẹn",
    ROUTE: ROUTES.ADMIN_BOOKING_LIST,
  },
  {
    TITLE: "Sự kiện",
    ROUTE: ROUTES.ADMIN_SEMINAR_LIST,
  },
  {
    TITLE: "Chủ đề",
    ROUTE: ROUTES.TOPIC_LIST,
  },
  {
    TITLE: "Lĩnh vực",
    ROUTE: ROUTES.FIELD_LIST,
  },
  { TITLE: "Thể loại", ROUTE: ROUTES.CATEGORY_LIST },
  { TITLE: "Phòng ban", ROUTE: ROUTES.DEPARTMENT_LIST },
  { TITLE: "Cài đặt", ROUTE: ROUTES.ADMIN_CONFIG },
];

export const STAFF_MANAGE_SYSTEM_MENU = [
  {
    TITLE: "Sự kiện",
    ROUTE: ROUTES.SEMINAR_LIST,
  },
];

export const ADMIN_MANAGE_ACCOUNT_MENU = [
  {
    TITLE: "Diễn giả",
    ROUTE: ROUTES.ADMIN_MENTOR_LIST,
  },
  {
    TITLE: "Nhân viên",
    ROUTE: ROUTES.STAFF_LIST,
  },
  {
    TITLE: "Sinh viên",
    ROUTE: ROUTES.STUDENT_LIST,
  },
];

export const STAFF_MANAGE_ACCOUNT_MENU = [
  {
    TITLE: "Diễn giả",
    ROUTE: ROUTES.ADMIN_MENTOR_LIST,
  },
];
