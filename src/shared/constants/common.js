export const ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  SIGN_UP_CONFIRMATION: "/confirmation",
  FILL_INFORMATION: "/fill-information",
  FORGOT_PASSWORD: "/forgot-password",
  CV: "/cv",
  HOME: "/home",
};

export const BUTTON_LABEL = {
  LOGIN: "Đăng nhập",
  GOOGLE_LOGIN: "Tiếp tục với Google",
  SAVE: "Lưu",
  LATER: "Để sau",
  RESET_PASSWORD: "Lấy lại tài khoản",
  RE_SEND: "Gửi lại",
  ADD: "Thêm vào",
  CANCEL: "Hủy lưu",
};

export const TEXTFIELD_LABEL = {
  YOUR_EMAIL: "Email của bạn",
  DESCRIPION: "Mô tả",
  POSITION: "Vị trí",
  COMPANY: "Công ty",
  IS_WORKING_AT_THIS_POSITION: "Tôi đang làm việc ở vị trí này",
  START_DATE: "Thời gian bắt đầu",
  END_DATE: "Thời gian kết thúc",
  COMPLETE_DATE: "Thời gian hoàn thành (dự kiến)",
  SCHOOL: "Trường",
  MAJORS: "Chuyên ngành",
  IS_DOING_THIS_ACTIVITY: "Tôi đang tham gia tại đây",
  ACHIEVEMENT_NAME: "Tên giải thưởng",
  ORGANIZATION_NAME: "Tên tổ chức",
  RECEIVED_DATE: "Thời gian nhận",
  CERTIFICATE_NAME: "Tên chứng chỉ",
  ISSUED_DATE: "Ngày cấp",
  DUE_DATE: "Thời hạn đến",
  SKILL: "Kỹ năng",
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
  LOGIN_TROUBLE: "Gặp rắc rối trong việc đăng nhập?",
};

export const COMMON_MESSAGE = {
  ENTER_EMAIL_FOR_INSTRUCTIONS:
    "Hãy nhập email tài khoản của bạn để nhận được chỉ dẫn thay đổi mật khẩu mới.",
  EMAIL_WAS_SENT: "Email đã được gửi đến",
  EMAIL_RE_SEND: "Trường hợp sau 5 phút email vẫn không đến, hãy nhấn gửi lại.",
  EMAIl_RE_ENTER:
    "Trường hợp email không đúng, vui lòng quay lại bước 1 để được gửi lại email xác nhận.",
  CONFIRM_EMAIL_SUCCESS:
    "Email đã được xác nhận thành công. Mong bạn vui lòng đăng nhập lại để tiếp tục đồng hành cùng Growth Me.",
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
    ROUTE: ROUTES.HOME,
  },
  {
    TITLE: "Về Growth Me",
  },
  {
    TITLE: "Tìm Mentor",
  },
  {
    TITLE: "Hồ sơ của tôi",
    ROUTE: ROUTES.CV,
  },
];

export const PLACE_HOLDER = {
  LOGIN_EMAIL: "Nhập Email",
  LOGIN_PASSWORD: "Nhập mật khẩu",
  DEFAULT_EMAIL: "Example@gmail.com",
  DEFAULT_NAME: "Nguyễn Văn A",
  DEFAULT_PHONE: "0982 123 456",
  DEFAULT_DOB: "01/01/2001",
  ENTER_EMAIL: "Hãy nhập email của bạn",
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

export const PROFILE_TITLES = {
  INTRODUCION: "Giới thiệu",
  EXPERIENCE: "Kinh nghiệm làm việc",
  STUDY_PROGRESS: "Quá trình học tập",
  ACTIVITIES: "Hoạt động ngoại khóa",
  ACHIEVEMENT: "Giải thưởng",
  CERTIFICATES: "Chứng chỉ",
  SKILLS: "Kỹ năng",
};

export const PROGRESS_INFORMATION_TEXT = {
  NEED_UPDATE_INFORMATION: "Cần cập nhật thông tin để hồ sơ của bạn trở nên",
  MORE_COMPLETE: "hoàn thiện hơn",
  PROGRESS: "Quá trình hoàn thiện",
};
export const FORGOT_PASSWORD_STEPS = [
  "Nhập email",
  "Chờ email xác nhận",
  "Đăng nhập lại",
];

export const INPUT_TYPES = {
  TEXT_AREA: "textArea",
  TEXT: "text",
  DATE: "date",
  CHECK_BOX: "checkBox",
};
