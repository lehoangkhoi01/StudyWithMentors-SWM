import React from "react";
import { IconButton, Typography } from "@mui/material";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
} from "../../../../shared/constants/common";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import style from "./SecondStage.module.scss";
import { authenticationService } from "../../../../Services/authenticationService";
import { useCustomLoading } from "../../../../Helpers/generalHelper";

const SecondStage = ({ moveBack, email }) => {
  const { setLoading } = useCustomLoading();

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
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Typography variant="h5" className={`${style.text}`}>
        {COMMON_MESSAGE.EMAIL_WAS_SENT}{" "}
        <span className={`${style.email}`}>{email}</span>.
      </Typography>
      <Typography variant="h5" className={`${style.text}`}>
        {COMMON_MESSAGE.EMAIL_RE_SEND}
      </Typography>
      <img alt="pic3" src={require("../../../../assets/image3.png")} />
      <IconButton className={`${style.iconButton}`} onClick={moveBack}>
        <ArrowBackIosNewOutlined
          fontSize="large"
          className={`${style.iconButton__icon}`}
        />
      </IconButton>
      <div className={`${style.buttonContainer}`}>
        <CustomizedButton
          variant="contained"
          color="primary600"
          onClick={handleResendEmail}
        >
          {BUTTON_LABEL.RE_SEND}
        </CustomizedButton>
      </div>
      <Typography variant="h5" className={`${style.text}`}>
        {COMMON_MESSAGE.EMAIl_RE_ENTER}
      </Typography>
    </>
  );
};

export default SecondStage;
