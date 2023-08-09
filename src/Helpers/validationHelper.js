import { maxBookingRequestValidation } from "../shared/constants/validationRules";

export const getSystemConfigFieldValidation = (name) => {
  switch (name) {
    case "maxRequestedBooking":
      return maxBookingRequestValidation;
  }
};
