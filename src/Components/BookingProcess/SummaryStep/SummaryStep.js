import React from "react";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";
import style from "./SummaryStep.module.scss";

const SummaryStep = (props) => {
  const renderStartEndTime = () => {
    return (
      format(props.selectedSlot?.start, DATE_FORMAT.HH_mm) +
      "-" +
      format(props.selectedSlot?.end, DATE_FORMAT.HH_mm) +
      ", " +
      format(props.selectedSlot?.start, DATE_FORMAT.DD_MM_YYYY)
    );
  };

  return (
    <div>
      <Typography className={`${style.bookingSummary__title}`} variant="h5">
        Xác nhận thông tin
      </Typography>
      <div className={`${style.bookingSummary__detail}`}>
        <span className={`${style.bookingSummary__subTitle}`}>Mentor: </span>
        <span>Khoi Le</span>
      </div>

      <div className={`${style.bookingSummary__detail}`}>
        <span className={`${style.bookingSummary__subTitle}`}>Chủ đề: </span>
        <span>{props.selectedTopic?.name}</span>
      </div>

      <div className={`${style.bookingSummary__detail}`}>
        <span className={`${style.bookingSummary__subTitle}`}>Thời gian: </span>
        <span>{renderStartEndTime()}</span>
      </div>

      <div className={`${style.bookingSummary__detail}`}>
        <span className={`${style.bookingSummary__subTitle}`}>Mô tả: </span>
        <span>{props.studentNote}</span>
      </div>
    </div>
  );
};

export default SummaryStep;