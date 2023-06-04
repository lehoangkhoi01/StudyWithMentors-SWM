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
  SEMINAR_CREATE: "/create-seminar",
  SEMINAR_UPDATE: "/update-seminar/:id",
};

export const ROUTES_STATIC = {
  SEMINAR_DETAIL: "/seminars",
  SEMINAR_UPDATE: "/update-seminar",
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
    TITLE: "Về Growth Me",
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
    TITLE: "Hội thảo",
    ROUTE: ROUTES.SEMINAR_LIST,
  },
  {
    TITLE: "Về Growth Me",
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
