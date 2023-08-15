import React from "react";
import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import style from "./BookingCard.module.scss";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";
import {
  BOOKING_STATUS,
  SYSTEM_ROLE,
} from "../../../shared/constants/systemType";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";

const BookingCard = (props) => {
  const userInfo = useSelector(selectUserInfo);

  const convertTimeToDateTime = (time, date) => {
    return new Date(date + " " + time);
  };

  const getConvertDate = (date) => {
    if (date) {
      return format(new Date(date), DATE_FORMAT.DD_MM_YYYY);
    } else return null;
  };

  const renderStatusLabel = (status) => {
    switch (status) {
      case BOOKING_STATUS.ACCEPTED:
        return (
          <div
            className={`${style.bookingCard__label} ${style.bookingCard__label__accepted}`}
          >
            Đã xác nhận
          </div>
        );
      case BOOKING_STATUS.REQUESTED:
        return (
          <div
            className={`${style.bookingCard__label} ${style.bookingCard__label__waiting}`}
          >
            Đang chờ
          </div>
        );
      case BOOKING_STATUS.REJECTED:
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

  const renderBookingCardDetail = () => {
    if (userInfo?.role === SYSTEM_ROLE.MENTOR) {
      return (
        <div className={`${style.bookingCard__detail}`}>
          <span>Chủ đề: {props.bookingInfo?.topicDetailResponse?.name}</span> |{" "}
          <span>
            Phân loại: {props.bookingInfo?.topicDetailResponse?.field}
          </span>{" "}
          |{" "}
          <span>
            Lĩnh vực: {props.bookingInfo?.topicDetailResponse?.category}
          </span>{" "}
          <div style={{ margin: "5px 0" }}>
            Sinh viên: {props.bookingInfo?.menteeNames?.join(", ")}
          </div>
        </div>
      );
    } else {
      return (
        <div className={`${style.bookingCard__detail}`}>
          <span>Mentor: {props.bookingInfo?.mentor?.fullName}</span> |{" "}
          <span>Chủ đề: {props.bookingInfo?.topicDetailResponse?.name}</span> |{" "}
          <span>
            Phân loại chủ đề: {props.bookingInfo?.topicDetailResponse?.field}
          </span>{" "}
          |{" "}
          <span>
            Lĩnh vực: {props.bookingInfo?.topicDetailResponse?.category}
          </span>
        </div>
      );
    }
  };

  return (
    <div className={`${style.bookingCard__container}`}>
      <Grid2 container spacing={4}>
        <Grid2 xs={2} className={`${style.bookingCard__datetime__container}`}>
          <Typography className={`${style.bookingCard__datetime__text}`}>
            {getConvertDate(props.bookingInfo?.startDate)}
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
          {renderBookingCardDetail()}
          {renderStatusLabel(props.bookingInfo?.status)}
        </Grid2>
      </Grid2>
    </div>
  );
};

export default BookingCard;
