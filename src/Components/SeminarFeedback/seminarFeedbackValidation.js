import { ERROR_MESSAGES } from "../../shared/constants/common";

export const seminarFeedbackValidationField = (value) => {
  if (!value || value === 0) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
};
