import { ERROR_MESSAGES } from "../constants/common";

export const emailValidationRules = {
  required: { value: true, message: ERROR_MESSAGES.REQUIRED_FIELD },
  maxLength: {
    value: 254,
    message: ERROR_MESSAGES.MAX_LENGTH_EMAIL,
  },
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: ERROR_MESSAGES.WRONG_EMAIL_FORMAT,
  },
};

export const passwordValidation = {
  required: { value: true, message: ERROR_MESSAGES.REQUIRED_FIELD },
  maxLength: {
    value: 100,
    message: ERROR_MESSAGES.INVALID_PASSWORD_LENGTH,
  },
  minLength: {
    value: 8,
    message: ERROR_MESSAGES.INVALID_PASSWORD_LENGTH,
  },
  pattern: {
    value: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
    message: ERROR_MESSAGES.WRONG_PASSWORD_FORMAT,
  },
};

export const registerFullNameValidation = {
  required: { value: true, message: ERROR_MESSAGES.REQUIRED_FIELD },
};

export const registerConfirmPassword = {
  required: { value: true, message: ERROR_MESSAGES.REQUIRED_FIELD },
};
