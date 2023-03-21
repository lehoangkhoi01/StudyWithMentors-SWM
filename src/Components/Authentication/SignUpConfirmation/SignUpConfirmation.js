import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { SIGN_UP_TEXT, TITLE } from "../../../shared/constants/common";
import style from "./SignUpConfirmation.module.scss";
import CustomTopTitle from "../CustomTopTitle/CustomTopTitle";
import CustomDivider from "../CustomDivider/CustomDivider";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import ImageSideContainer from "../ImageSideContainer/ImageSideContainer";

const SignUpConfirmation = () => {
  return (
    <Grid2 container className={style.container}>
      <ImageSideContainer />
      <Grid2 xs={12} md={6} className={style.rightSide}>
        <CustomPattern width={"50%"} height={"95%"} />
        <div className={`${style.rightSide__container}`}>
          <img alt="image" src={require("../../../assets/envelope.png")} />
          <CustomTopTitle title={TITLE.SIGN_UP_CONFIRMATION} />
          <span className={`${style.textCenter}`}>
            {SIGN_UP_TEXT.EMAIL_WAS_SENT}
          </span>
          <span className={`${style.textCenter}`}>
            {SIGN_UP_TEXT.PLEASE_CHECK_EMAIL}
          </span>
          <CustomDivider />
          <div className={`${style.paragraphText}`}>
            <span>{SIGN_UP_TEXT.DID_NOT_RECEIVED_EMAIL}</span>{" "}
            <a href="/sign-in" className={`${style.link}`}>
              {SIGN_UP_TEXT.RESENT_EMAIL}
            </a>
          </div>
          <div className={`${style.bottomSide}`}>
            <div>
              {SIGN_UP_TEXT.EMAIL_INCORRECT_1}{" "}
              <a href="/sign-up" className={`${style.link}`}>
                {SIGN_UP_TEXT.SIGN_UP_PAGE}
              </a>{" "}
              {SIGN_UP_TEXT.EMAIL_INCORRECT_2}
            </div>
          </div>
        </div>
      </Grid2>
    </Grid2>
  );
};

export default SignUpConfirmation;
