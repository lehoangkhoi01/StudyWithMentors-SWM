import React from "react";
import { IconButton, Typography } from "@mui/material";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
} from "../../../../shared/constants/common";
import { ROUTES } from "../../../../shared/constants/navigation";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import style from "./SecondStage.module.scss";
import { authenticationService } from "../../../../Services/authenticationService";
import { useCustomLoading } from "../../../../Helpers/generalHelper";
import { Link, useHistory } from "react-router-dom";

const SecondStage = ({ moveBack, email, isEmailNotFound = false }) => {
  const { setLoading } = useCustomLoading();
  const history = useHistory();

  const handleResendEmail = async () => {
    if (email) {
      setLoading(true);
      const requestBody = {
        email: email,
      };
      try {
        const response = await authenticationService.sendResetPasswordEmail(
          requestBody
        );
        console.log(response);
      } catch (error) {
        history.push(ROUTES.SERVER_ERROR);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {isEmailNotFound ? (
        <>
          <Typography
            variant="h5"
            className={`${style.forgotpassword__stage2__text}`}
          >
            Email <span className={`${style.email}`}>{email}</span>{" "}
            {COMMON_MESSAGE.IS_NOT_EXIST} {COMMON_MESSAGE.SIGN_UP_WITH_EMAIL}
          </Typography>
          <img
            alt="pic3"
            src={require("../../../../assets/image4.png")}
            className={`${style.forgotpassword__img}`}
          />
        </>
      ) : (
        <>
          <div className={`${style.forgotpassword__stage2}`}>
            <Typography
              variant="h5"
              className={`${style.forgotpassword__stage2__text}`}
            >
              {COMMON_MESSAGE.EMAIL_WAS_SENT}{" "}
              <span className={`${style.email}`}>{email}</span>.
            </Typography>
            <Typography
              variant="h5"
              className={`${style.forgotpassword__stage2__text}`}
            >
              {COMMON_MESSAGE.EMAIL_RE_SEND}
            </Typography>
          </div>

          <img
            alt="pic3"
            src={require("../../../../assets/image3.png")}
            className={`${style.forgotpassword__img}`}
          />
        </>
      )}
      <IconButton className={`${style.iconButton}`} onClick={moveBack}>
        <ArrowBackIosNewOutlined
          fontSize="large"
          className={`${style.iconButton__icon}`}
        />
      </IconButton>
      <div className={`${style.buttonContainer}`}>
        {isEmailNotFound ? (
          <Link to={ROUTES.SIGN_UP} className={`${style.navigation}`}>
            <CustomizedButton variant="contained" color="primary600">
              {BUTTON_LABEL.SIGN_UP_ACCOUNT}
            </CustomizedButton>
          </Link>
        ) : (
          <CustomizedButton
            variant="contained"
            color="primary600"
            onClick={handleResendEmail}
          >
            {BUTTON_LABEL.RE_SEND}
          </CustomizedButton>
        )}
      </div>
      <Typography
        variant="h5"
        className={`${style.forgotpassword__stage2__text}`}
      >
        {COMMON_MESSAGE.EMAIl_RE_ENTER}
      </Typography>
    </>
  );
};

export default SecondStage;
