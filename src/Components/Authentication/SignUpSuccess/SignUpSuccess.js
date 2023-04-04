import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import ImageSideContainer from "../ImageSideContainer/ImageSideContainer";
import style from "./SignUpSuccess.module.scss";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import { BUTTON_LABEL, COMMON_MESSAGE } from "../../../shared/constants/common";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";

const SignUpSuccess = () => {
  return (
    <Grid2 container className={style.signUp__container}>
      <ImageSideContainer />
      <Grid2 xs={12} md={6} className={style.signUp__rightSide}>
        <CustomPattern width={"50%"} height={"95%"} />
        <div className={`${style.signUp__rightSide__container}`}>
          <img alt="image" src={require("../../../assets/envelope.png")} />
          <span className={`${style.textCenter}`}>
            {COMMON_MESSAGE.CONFIRM_EMAIL_SUCCESS}
          </span>
          <CustomizedButton variant="contained" color="primary600">
            {BUTTON_LABEL.BACK_TO_LOG_IN}
          </CustomizedButton>
        </div>
      </Grid2>
    </Grid2>
  );
};

export default SignUpSuccess;
