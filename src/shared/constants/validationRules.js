import { ERROR_MESSAGES, LENGTH } from "../constants/common";

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
  maxLength: {
    value: LENGTH.FULLNAME_MAX,
    message: ERROR_MESSAGES.SEMINAR_NAME_LENGTH,
  },
};

export const registerConfirmPassword = {
  required: { value: true, message: ERROR_MESSAGES.REQUIRED_FIELD },
};

export const seminarNameValidation = {
  required: { value: true, message: ERROR_MESSAGES.REQUIRED_FIELD },
  maxLength: {
    value: LENGTH.SEMINAR_NAME,
    message: ERROR_MESSAGES.SEMINAR_NAME_LENGTH,
  },
};

export const seminarPlaceValidation = {
  required: { value: true, message: ERROR_MESSAGES.REQUIRED_FIELD },
  maxLength: {
    value: LENGTH.SEMINAR_PLACE,
    message: ERROR_MESSAGES.SEMINAR_NAME_LENGTH,
  },
};

export const modalFieldValidation = {
  required: { value: true, message: ERROR_MESSAGES.REQUIRED_FIELD },
  maxLength: {
    value: LENGTH.SEMINAR_PLACE,
    message: ERROR_MESSAGES.SEMINAR_NAME_LENGTH,
  },
  validate: (val) => {
    if (val && !val.trim()) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }
  },
};

export const modalOptionalFieldValidation = {
  required: { value: false, message: ERROR_MESSAGES.REQUIRED_FIELD },
  maxLength: {
    value: LENGTH.SEMINAR_PLACE,
    message: ERROR_MESSAGES.SEMINAR_NAME_LENGTH,
  },
};

//---------- System Config Validation ---------------

const validationNumber = (val) => {
  const isValid = /^\d+$/.test(val); // Check if value is a positive integer
  return isValid || ERROR_MESSAGES.COMMON_SYSTEM_CONFIG_ERROR;
};

export const commonSystemConfigValidation = {
  required: { value: true, message: ERROR_MESSAGES.REQUIRED_FIELD },
  min: {
    value: LENGTH.SYSTEM_CONFIG_NUM_MIN,
    message: ERROR_MESSAGES.COMMON_SYSTEM_CONFIG_ERROR,
  },
  max: {
    value: LENGTH.SYSTEM_CONFIG_NUM_MAX,
    message: ERROR_MESSAGES.COMMON_SYSTEM_CONFIG_ERROR,
  },
  maxLength: {
    value: LENGTH.SYSTEM_CONFIG_NUM_LENGTH,
    message: ERROR_MESSAGES.COMMON_SYSTEM_CONFIG_ERROR,
  },
  validate: (val) => validationNumber(val),
};

// ------------------ Seminar feedback ----------------------
export const validateSeminarFeedbackText = (val) => {
  if (val && val.trim().length > 0) {
    if (val.length > LENGTH.SEMINAR_FEEDBACK_TEXT) {
      return ERROR_MESSAGES.MAX_LENGTH_FEEDBACK_TEXT;
    }
  }
};
