export const ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  SIGN_UP_CONFIRMATION: "/confirmation",
  FILL_INFORMATION: "/fill-information",
};

export const BUTTON_LABEL = {
  LOGIN: "Đăng nhập",
  GOOGLE_LOGIN: "Tiếp tục với Google",
  SAVE: "Lưu",
  LATER: "Để sau",
};

export const TITLE = {
  SIGN_IN: "Đăng nhập",
  SIGN_UP: "Đăng ký",
  SIGN_UP_CONFIRMATION: "Xác nhận tài khoản",
  FORGOT_PASSWORD: "Quên mật khẩu?",
  OR: "Hoặc",
  PASSWORD: "Mật khẩu",
  CONFIRM_PASSWORD: "Nhập lại mật khẩu",
  EMAIL: "Email",
  GROWTH_ME: "Growth Me",
  FULL_NAME: "Họ và tên",
  UPDATE: "Cập nhật",
  PHONE: "Số điện thoại",
  GENDER: "Giới tính",
  DOB: "Ngày sinh",
};

export const SIGN_UP_STAGE = {
  SIGN_UP: "Sign up",
  SENT_EMAIL: "Sent email",
};

export const SIGN_UP_TEXT = {
  HAD_ACCOUNT: "Bạn đã có tài khoản?",
  HAD_NO_ACCOUNT: "Bạn chưa có tài khoản?",
  SIGN_IN_NOW: "Đăng nhập ngay!",
  EMAIL_WAS_SENT: "Email xác nhận tài khoản đã được gửi đến bạn.",
  PLEASE_CHECK_EMAIL:
    "Vui lòng kiểm tra và kích hoạt tài khoản bằng cách nhấp vào liên kết Growth Me đã gửi đến địa chỉ email",
  DID_NOT_RECEIVED_EMAIL: "Bạn chưa nhận được mail?",
  CHANGE_EMAIL: `Trường hợp email chưa chính xác, vui lòng cập nhật lại email bên duối và bấm "Cập nhật" để được gửi lại`,
  SIGN_UP_SUGGEST: "Đăng ký tại đây!",
  RESENT_EMAIL: "Gửi lại mail xác nhận.",
  EMAIL_INCORRECT_1: "Trường hợp email chưa chính xác, vui lòng bạn quay lại",
  SIGN_UP_PAGE: "trang đăng ký",
  EMAIL_INCORRECT_2: "để xác nhận lại",
};

export const SIGN_UP_PLACEHOLDER = {
  EMAIL: "Hãy nhập email của bạn",
  FULL_NAME: "Hãy nhập họ và tên của bạn",
  PASSWORD: "Hãy nhập mật khẩu của bạn",
  CONFIRM_PASSWORD: "Hãy nhập mật khẩu của bạn",
};

export const APP_NAME = "Growth Me";

export const NAVIGATION_TITLE = [
  {
    TITLE: "Trang chủ",
  },
  {
    TITLE: "Về Growth Me",
  },
  {
    TITLE: "Tìm Mentor",
  },
];

export const PLACE_HOLDER = {
  LOGIN_EMAIL: "Nhập Email",
  LOGIN_PASSWORD: "Nhập mật khẩu",
  DEFAULT_EMAIL: "Example@gmail.com",
  DEFAULT_NAME: "Nguyễn Văn A",
  DEFAULT_PHONE: "0982 123 456",
  DEFAULT_DOB: "01/01/2001",
};

export const FILL_INFORMATION = {
  WELCOME: "Chào mừng bạn đến với Growth Me",
  PLEASE_FILL_INFORMATION:
    "Vui lòng cập nhật thông tin cá nhân để có thể đặt lịch với mentor",
};

export const OPTIONAL = "optional";

export const GENDER = {
  MALE: "Nam",
  FEMALE: "Nữ",
  OTHER: "Khác",
};

export const LENGTH = {
  PASSWORD_MAX: 100,
  PASSWORD_MIN: 8,
  EMAIL_MAX: 254,
};

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "Vui lòng điền thông tin này.",
  DUPLICATED_EMAIL: "Email này đã được đăng ký.",
  EMPTY_EMAIL_FIELD: "Email không được để trống.",
  EMPTY_PASSWORD_FIELD: "Password không được để trống.",
  MAX_LENGTH_EMAIL: "Độ dài tối đa cho email là " + LENGTH.EMAIL_MAX + " kí tự",
  INVALID_PASSWORD_LENGTH:
    "Chọn mật khẩu có độ dài từ " +
    LENGTH.PASSWORD_MIN +
    " đến " +
    LENGTH.PASSWORD_MAX +
    " kí tự.",
  WRONG_EMAIL_OR_PASSWORD: "Email hoặc mật khẩu không chính xác.",
  CONFIRM_PASSWORD_NOT_MATCH: "Mật khẩu không trùng khớp.",
  WRONG_PASSWORD_FORMAT:
    "Chọn một mật khẩu ít nhất 8 kí tự, có chứa chữ cái, số và ký tự đặc biệt.",
  WRONG_EMAIL_FORMAT: "Vui lòng nhập địa chỉ email đúng định dạng.",
};

export const COLOR = {
  SYSTEM_RED: "#FF5252",
};
