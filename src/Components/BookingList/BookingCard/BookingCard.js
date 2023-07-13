import React from "react";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import style from "./BookingCard.module.scss";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";

const BookingCard = (props) => {
  const convertTimeToDateTime = (time, date) => {
    return new Date(date + " " + time);
  };

  const renderStatusLabel = (status) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <div
            className={`${style.bookingCard__label} ${style.bookingCard__label__accepted}`}
          >
            Đã xác nhận
          </div>
        );
      case "REQUESTED":
        return (
          <div
            className={`${style.bookingCard__label} ${style.bookingCard__label__waiting}`}
          >
            Đang chờ
          </div>
        );
      case "CANCELED":
        return (
          <div
            className={`${style.bookingCard__label} ${style.bookingCard__label__canceled}`}
          >
            Đã hủy
          </div>
        );
      default:
        return (
          <div
            className={`${style.bookingCard__label} ${style.bookingCard__label__waiting}`}
          >
            Đang chờ
          </div>
        );
    }
  };

  return (
    <div className={`${style.bookingCard__container}`}>
      <Grid2 container spacing={4}>
        <Grid2 xs={2} className={`${style.bookingCard__datetime__container}`}>
          <Typography className={`${style.bookingCard__datetime__text}`}>
            {props.bookingInfo?.startDate}
          </Typography>
          <Typography
            className={`${style.bookingCard__datetime__text} ${style.bookingCard__datetime__time}`}
          >
            {props.bookingInfo?.startTime
              ? format(
                  convertTimeToDateTime(
                    props.bookingInfo?.startTime,
                    props.bookingInfo?.startDate
                  ),
                  DATE_FORMAT.HH_mm
                )
              : null}{" "}
            -{" "}
            {props.bookingInfo?.startTime
              ? format(
                  convertTimeToDateTime(
                    props.bookingInfo?.endTime,
                    props.bookingInfo?.startDate
                  ),
                  DATE_FORMAT.HH_mm
                )
              : null}
          </Typography>
        </Grid2>
        <Grid2 xs={10} className={`${style.bookingCard__infoContainer}`}>
          <Typography
            variant="h5"
            className={`${style.bookingCard__topicTitle}`}
          >
            {props.bookingInfo?.topic.name}
          </Typography>
          <div className={`${style.bookingCard__detail}`}>
            <span>Mentor: {props.bookingInfo?.mentor.name}</span> |{" "}
            <span>Nhóm: {props.bookingInfo?.topic.field}</span> |{" "}
            <span>Lĩnh vực: {props.bookingInfo?.topic.category}</span>
          </div>
          {renderStatusLabel(props.bookingInfo?.status)}
        </Grid2>
      </Grid2>
    </div>
  );
};

export default BookingCard;
