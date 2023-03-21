import { ERROR_MESSAGES } from "../constants/common";

export const emailValidationRules = {
  required: { value: true, message: ERROR_MESSAGES.EMPTY_EMAIL_FIELD },
  maxLength: {
    value: 10,
    message: ERROR_MESSAGES.MAX_LENGTH_EMAIL,
  },
};
