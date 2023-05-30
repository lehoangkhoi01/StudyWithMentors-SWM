import {
  ERROR_MESSAGES,
  VALID_IMAGE_FILE_TYPE,
} from "../../../shared/constants/common";

export const validationSeminarDate = (value) => {
  if (!value || value.length === 0) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (value <= Date.now()) {
    return ERROR_MESSAGES.INVALID_DATE_TIME;
  }
};

export const validationSeminarImage = (file) => {
  if (file && VALID_IMAGE_FILE_TYPE.indexOf(file.type) < 0) {
    return ERROR_MESSAGES.INVALID_IMAGE_FILE;
  }
};
