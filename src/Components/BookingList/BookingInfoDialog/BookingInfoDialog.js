import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import style from "./BookingInfoDialog.module.scss";
import { format } from "date-fns";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { DATE_FORMAT } from "../../../shared/constants/common";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { SYSTEM_ROLE } from "../../../shared/constants/systemType";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomizeButton from "../../../shared/components/Button/CustomizedButton";

const hostname = window.location.host;

const BookingInfoDialog = (props) => {
  const userInfo = useSelector(selectUserInfo);

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

  const convertTimeToDateTime = (time, date) => {
    return new Date(date + " " + time);
  };

  const renderDateTime = () => {
    return (
      (props.bookingInfo?.startTime
        ? format(
            convertTimeToDateTime(
              props.bookingInfo?.startTime,
              props.bookingInfo?.startDate
            ),
            DATE_FORMAT.HH_mm
          )
        : null) +
      " - " +
      (props.bookingInfo?.endTime
        ? format(
            convertTimeToDateTime(
              props.bookingInfo?.endTime,
              props.bookingInfo?.startDate
            ),
            DATE_FORMAT.HH_mm
          )
        : null) +
      ", " +
      props.bookingInfo?.startDate
    );
  };

  const renderActionButton = (status) => {
    if (userInfo.role === SYSTEM_ROLE.STUDENT) {
      switch (status) {
        case "ACCEPTED":
          return (
            <Grid2
              container
              rowSpacing={2}
              width="100%"
              justifyContent="center"
              margin={0}
            >
              <Grid2 xs={6}>
                <CustomizeButton
                  color="primary600"
                  size="small"
                  variant="contained"
                >
                  Hủy lịch
                </CustomizeButton>
              </Grid2>
            </Grid2>
          );
        case "REQUESTED":
          return (
            <Grid2
              container
              rowSpacing={2}
              width="100%"
              justifyContent="center"
              margin={0}
            >
              <Grid2 xs={6}>
                <CustomizeButton
                  color="primary600"
                  size="small"
                  variant="contained"
                >
                  Hủy lịch
                </CustomizeButton>
              </Grid2>
            </Grid2>
          );
        default:
          return <Button>Hủy lịch</Button>;
      }
    }
  };

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={() => props.setOpenBookingInfo(false)}
    >
      <DialogTitle>
        <Typography variant="h5">Chi tiết lịch hẹn</Typography>
      </DialogTitle>
      <DialogContent>
        <div>{renderStatusLabel(props.bookingInfo?.status)}</div>
        <div className={`${style.bookingSummary__detail}`}>
          <span className={`${style.bookingSummary__subTitle}`}>Mentor: </span>
          <span>{props.bookingInfo?.mentor.fullName}</span>
        </div>

        <div className={`${style.bookingSummary__detail}`}>
          <span className={`${style.bookingSummary__subTitle}`}>Chủ đề: </span>
          <span> {props.bookingInfo?.topicDetailResponse.name}</span>
        </div>

        <div className={`${style.bookingSummary__detail}`}>
          <span className={`${style.bookingSummary__subTitle}`}>
            Thời gian:{" "}
          </span>
          <span>{renderDateTime()}</span>
        </div>

        <div className={`${style.bookingSummary__detail}`}>
          <span className={`${style.bookingSummary__subTitle}`}>Mô tả: </span>
          <span>{props.bookingInfo?.description}</span>
        </div>
        <div className={`${style.bookingSummary__detail}`}>
          <span className={`${style.bookingSummary__subTitle}`}>
            Link tham gia:{" "}
          </span>
          <span>
            <Link
              to={`/meeting-room/${props.bookingInfo?.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hostname}/meeting-room/{props.bookingInfo?.id}
            </Link>
          </span>
        </div>
      </DialogContent>
      <div>{renderActionButton(props.bookingInfo?.status)}</div>
    </Dialog>
  );
};

export default BookingInfoDialog;
