import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { SIGN_UP_TEXT, TITLE } from "../../../shared/constants";
import style from "./SignUpConfirmation.module.scss";
import CustomTopTitle from "../CustomTopTitle/CustomTopTitle";
import CustomDivider from "../CustomDivider/CustomDivider";

const SignUpConfirmation = () => {
  return (
    <Grid2 container className={style.container}>
      <Grid2 md={6} maxWidth={"50%"}>
        <img
          width={"100%"}
          alt="background"
          src={require("../../../assets/image1.png")}
        />
      </Grid2>
      <Grid2 md={6} className={style.rightSide}>
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
            <a href="#" className={`${style.link}`}>
              {SIGN_UP_TEXT.RESENT_EMAIL}
            </a>
          </div>
          <div className={`${style.bottomSide}`}>
            <p>
              {SIGN_UP_TEXT.EMAIL_INCORRECT_1}{" "}
              <a href="#" className={`${style.link}`}>
                {SIGN_UP_TEXT.SIGN_UP_PAGE}
              </a>{" "}
              {SIGN_UP_TEXT.EMAIL_INCORRECT_2}
            </p>
          </div>
        </div>
      </Grid2>
    </Grid2>
  );
};

export default SignUpConfirmation;
