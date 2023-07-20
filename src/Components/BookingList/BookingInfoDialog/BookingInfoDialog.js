import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import style from "./BookingInfoDialog.module.scss";
import { format } from "date-fns";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { DATE_FORMAT } from "../../../shared/constants/common";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import {
  BOOKING_STATUS,
  SYSTEM_ROLE,
} from "../../../shared/constants/systemType";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomizeButton from "../../../shared/components/Button/CustomizedButton";
import CancelBookingDialog from "../CancelBookingDialog/CancelBookingDialog";
import FeedbackDialog from "../FeedbackDialog/FeedbackDialog";
import { useCustomLoading } from "../../../Helpers/generalHelper";
import { meetingFeedbackService } from "../../../Services/meetingFeedbackService";

const hostname = window.location.host;

const BookingInfoDialog = (props) => {
  const userInfo = useSelector(selectUserInfo);
  const [openCancelBookingDialog, setOpenCancelBookingDialog] =
    React.useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = React.useState(false);
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [studentFeedback, setStudentFeedback] = React.useState(null);

  const { setLoading } = useCustomLoading();

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

  const handleAccept = async () => {
    const data = {
      bookingIds: [props.bookingInfo?.id],
      reason: "Approved",
      status: BOOKING_STATUS.ACCEPTED,
    };

    await props.handleUpdateBookingStatus(data, BOOKING_STATUS.ACCEPTED);
  };

  const renderActionButton = (status) => {
    const bookingDate = new Date(
      props.bookingInfo?.startDate + " " + props.bookingInfo?.startTime
    );

    const diffHour =
      (new Date().valueOf() - bookingDate.valueOf()) / 1000 / 60 / 60;

    if (diffHour >= -8) {
      if (
        props.bookingInfo?.status === BOOKING_STATUS.ACCEPTED &&
        userInfo.role === SYSTEM_ROLE.STUDENT &&
        !studentFeedback
      ) {
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
                onClick={() => setOpenFeedbackDialog(true)}
              >
                Đánh giá
              </CustomizeButton>
            </Grid2>
          </Grid2>
        );
      } else return null;
    }

    if (userInfo.role === SYSTEM_ROLE.STUDENT) {
      switch (status) {
        case BOOKING_STATUS.ACCEPTED:
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
                  onClick={() => setOpenCancelBookingDialog(true)}
                >
                  Hủy lịch
                </CustomizeButton>
              </Grid2>
            </Grid2>
          );
        case BOOKING_STATUS.REQUESTED:
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
                  onClick={() => setOpenCancelBookingDialog(true)}
                >
                  Hủy lịch
                </CustomizeButton>
              </Grid2>
            </Grid2>
          );
      }
    }

    if (userInfo.role === SYSTEM_ROLE.MENTOR) {
      switch (status) {
        case BOOKING_STATUS.ACCEPTED:
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
                  onClick={() => setOpenCancelBookingDialog(true)}
                >
                  Hủy lịch
                </CustomizeButton>
              </Grid2>
            </Grid2>
          );
        case BOOKING_STATUS.REQUESTED:
          return (
            <Grid2
              container
              rowSpacing={2}
              width="100%"
              justifyContent="space-around"
              margin={0}
            >
              <Grid2 xs={4}>
                <CustomizeButton
                  color="primary600"
                  size="small"
                  variant="outlined"
                  onClick={() => setOpenCancelBookingDialog(true)}
                >
                  Hủy lịch
                </CustomizeButton>
              </Grid2>
              <Grid2 xs={4}>
                <CustomizeButton
                  color="primary600"
                  size="small"
                  variant="contained"
                  onClick={handleAccept}
                >
                  Xác nhận
                </CustomizeButton>
              </Grid2>
            </Grid2>
          );
      }
    }
  };

  const renderStudentViewFeedback = (feedback) => {
    if (feedback) {
      return (
        <>
          <Divider />
          <Typography variant="h6" marginY={2}>
            Phản hồi của sinh viên về buổi tư vấn
          </Typography>
          <div className={`${style.bookingSummary__detail}`}>
            <span className={`${style.bookingSummary__subTitle}`}>
              Đánh giá:{" "}
            </span>
            <span>{feedback.rating}/5</span>
          </div>
          <div className={`${style.bookingSummary__detail}`}>
            <span className={`${style.bookingSummary__subTitle}`}>
              Ý kiến của sinh viên:{" "}
            </span>
            <span>{feedback.content}</span>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  const renderMentorViewFeedback = (feedbacks) => {
    if (feedbacks.length > 0) {
      return (
        <>
          <Divider />
          <Typography variant="h6" marginY={2}>
            Phản hồi của sinh viên về buổi tư vấn
          </Typography>
          {feedbacks.map((feedback) => (
            <div key={feedback.id} style={{ margin: "10px 0" }}>
              <div className={`${style.bookingSummary__detail}`}>
                <span className={`${style.bookingSummary__subTitle}`}>
                  Sinh viên:{" "}
                </span>
                <span>{feedback.giver.fullName}</span>
              </div>
              <div className={`${style.bookingSummary__detail}`}>
                <span className={`${style.bookingSummary__subTitle}`}>
                  Đánh giá:{" "}
                </span>
                <span>{feedback.rating}/5</span>
              </div>
              <div className={`${style.bookingSummary__detail}`}>
                <span className={`${style.bookingSummary__subTitle}`}>
                  Ý kiến của sinh viên:{" "}
                </span>
                <span>{feedback.content}</span>
              </div>
            </div>
          ))}
        </>
      );
    } else return null;
  };

  React.useState(() => {
    const fetchFeedbacksByBooking = async () => {
      if (props.bookingInfo?.id) {
        try {
          setLoading(true);
          const result = await meetingFeedbackService.getFeedbackByBookingId(
            props.bookingInfo?.id
          );
          if (result.feedbacks.length > 0) {
            setFeedbacks(result.feedbacks);
            setStudentFeedback(
              result.feedbacks.find(
                (feedback) => feedback.giver.accountId === userInfo.accountId
              )
            );
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    console.log(props.bookingInfo?.id);

    fetchFeedbacksByBooking();
  }, []);

  React.useState(() => {
    console.log(feedbacks);
  }, [feedbacks]);

  return (
    <>
      <Dialog
        fullWidth
        open={props.open}
        onClose={() => props.setOpenBookingInfo(false)}
      >
        <DialogTitle>
          <Typography variant="h5" color="#1a237e">
            Chi tiết lịch hẹn
          </Typography>
        </DialogTitle>
        <DialogContent>
          <div>{renderStatusLabel(props.bookingInfo?.status)}</div>
          <div className={`${style.bookingSummary__detail}`}>
            <span className={`${style.bookingSummary__subTitle}`}>
              Mentor:{" "}
            </span>
            <span>{props.bookingInfo?.mentor.fullName}</span>
          </div>

          <div className={`${style.bookingSummary__detail}`}>
            <span className={`${style.bookingSummary__subTitle}`}>
              Người tham gia:{" "}
            </span>
            <span>{props.bookingInfo?.menteeNames?.toString()}</span>
          </div>

          <div className={`${style.bookingSummary__detail}`}>
            <span className={`${style.bookingSummary__subTitle}`}>
              Chủ đề:{" "}
            </span>
            <span> {props.bookingInfo?.topicDetailResponse?.name}</span>
          </div>

          <div className={`${style.bookingSummary__detail}`}>
            <span className={`${style.bookingSummary__subTitle}`}>
              Thời gian:{" "}
            </span>
            <span>{renderDateTime()}</span>
          </div>

          <div className={`${style.bookingSummary__detail}`}>
            <span className={`${style.bookingSummary__subTitle}`}>
              Ngày tạo:{" "}
            </span>
            <span>
              {props.bookingInfo?.convertedCreateDate
                ? format(
                    props.bookingInfo?.convertedCreateDate,
                    "HH:mm:ss dd-MM-yyyy"
                  )
                : null}
            </span>
          </div>

          <div className={`${style.bookingSummary__detail}`}>
            <span className={`${style.bookingSummary__subTitle}`}>Mô tả: </span>
            <span>{props.bookingInfo?.description}</span>
          </div>

          {props.bookingInfo?.status === BOOKING_STATUS.ACCEPTED && (
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
          )}
          {userInfo.role === SYSTEM_ROLE.STUDENT
            ? renderStudentViewFeedback(studentFeedback)
            : renderMentorViewFeedback(feedbacks)}
        </DialogContent>
        <div>{renderActionButton(props.bookingInfo?.status)}</div>
      </Dialog>

      {openCancelBookingDialog && (
        <CancelBookingDialog
          open={openCancelBookingDialog}
          setOpenCancelBookingDialog={setOpenCancelBookingDialog}
          handleUpdateBookingStatus={props.handleUpdateBookingStatus}
          bookingInfo={props.bookingInfo}
        />
      )}

      {openFeedbackDialog && (
        <FeedbackDialog
          open={openFeedbackDialog}
          bookingInfo={props.bookingInfo}
          setOpenFeedbackDialog={setOpenFeedbackDialog}
          setOpenBookingInfoDialog={props.setOpenBookingInfo}
        />
      )}
    </>
  );
};

export default BookingInfoDialog;
