import { getPlainTextFromHtmlString } from "../../../Helpers/generalHelper";
import { convertBytesToMB } from "../../../Helpers/mathHelper";
import {
  ERROR_MESSAGES,
  LENGTH,
  VALID_IMAGE_FILE_TYPE,
} from "../../../shared/constants/common";

export const validateSeminarDescription = (val) => {
  const plainTextValue = getPlainTextFromHtmlString(val);
  if (plainTextValue || plainTextValue.length > 0) {
    if (plainTextValue.length > LENGTH.SEMINAR_DESCRIPTION) {
      return ERROR_MESSAGES.SEMINAR_DESCRIPTION_LENGTH;
    }
  }
};

export const validationSeminarDate = (value) => {
  if (!value || value.length === 0) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (value <= Date.now()) {
    return ERROR_MESSAGES.INVALID_DATE_TIME_FUTURE;
  }
};

export const validationSeminarSpeakers = (value) => {
  if (!value || value.length === 0) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (value.length > LENGTH.SPEAKERS_MAX) {
    return ERROR_MESSAGES.INVALID_NO_SPEAKERS;
  }
};

export const validationSeminarImage = (file) => {
  if (
    file &&
    (VALID_IMAGE_FILE_TYPE.indexOf(file.type) < 0 ||
      convertBytesToMB(file.size) > 10)
  ) {
    return ERROR_MESSAGES.INVALID_IMAGE_FILE;
  }
};
