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
  NOT_FOUND: "/not-found",
  SERVER_ERROR: "/server-error",
};

export const UNAUTHORIZED_NAVBAR = [
  {
    TITLE: "Trang chủ",
    ROUTE: ROUTES.HOME,
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
