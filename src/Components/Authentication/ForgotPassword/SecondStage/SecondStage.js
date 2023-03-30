import React from "react";
import { IconButton, Typography } from "@mui/material";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import {
  BUTTON_LABEL,
  COMMON_MESSAGE,
} from "../../../../shared/constants/common";
import CustomizedButton from "../../../../shared/components/Button/CustomizedButton";
import style from "./SecondStage.module.scss";

const SecondStage = ({ moveNext, moveBack }) => {
  return (
    <>
      <Typography variant="h5" className={`${style.text}`}>
        {COMMON_MESSAGE.EMAIL_WAS_SENT}{" "}
        <span className={`${style.email}`}>khoileit01@gmail.com</span>.
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
          onClick={moveNext}
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
