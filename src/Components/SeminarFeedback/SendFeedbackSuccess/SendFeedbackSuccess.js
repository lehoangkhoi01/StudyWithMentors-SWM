import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import style from "./SendFeedbackSuccess.module.scss";
import CustomPattern from "../../../shared/components/CustomPattern/CustomPattern";
import { COMMON_MESSAGE } from "../../../shared/constants/common";

const SendFeedbackSuccess = () => {
  return (
    <Grid2 container className={style.seminarFeedbackSuccess__container}>
      <Grid2 xs={12} className={style.seminarFeedbackSuccess__rightSide}>
        <CustomPattern width={"50%"} height={"95%"} />
        <div
          className={`${style.seminarFeedbackSuccess__rightSide__container}`}
        >
          <img alt="image" src={require("../../../assets/envelope.png")} />
          <span className={`${style.textCenter}`}>
            {COMMON_MESSAGE.SEND_FEEDBACK_SUCCESS}
          </span>
        </div>
      </Grid2>
    </Grid2>
  );
};

export default SendFeedbackSuccess;
