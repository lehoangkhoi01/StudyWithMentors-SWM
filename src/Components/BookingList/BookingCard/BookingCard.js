import React from "react";
import { Button, IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import style from "./BookingCard.module.scss";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";
import { MoreVert } from "@mui/icons-material";

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
      case "REJECTED":
        return (
          <div
            className={`${style.bookingCard__label} ${style.bookingCard__label__canceled}`}
          >
            Đã hủy
          </div>
        );
    }
  };

  const onSelectBooking = () => {
    props.setOpenBookingInfo(true);
    props.setSelectedBooking(props.bookingInfo);
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
            {props.bookingInfo?.endTime
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
          <Button
            variant="text"
            className={`${style.bookingCard__topicTitle}`}
            onClick={() => onSelectBooking()}
          >
            {props.bookingInfo?.topicDetailResponse?.name}
          </Button>
          <div className={`${style.bookingCard__detail}`}>
            <span>Mentor: {props.bookingInfo?.mentor?.fullName}</span> |{" "}
            <span>Nhóm: {props.bookingInfo?.topicDetailResponse?.field}</span> |{" "}
            <span>
              Lĩnh vực: {props.bookingInfo?.topicDetailResponse?.category}
            </span>
          </div>
          {renderStatusLabel(props.bookingInfo?.status)}
        </Grid2>
      </Grid2>
      <IconButton className={`${style.bookingCard__icon}`}>
        <MoreVert />
      </IconButton>
    </div>
  );
};

export default BookingCard;
