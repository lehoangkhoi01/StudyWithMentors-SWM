import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import BookingStepper from "../BookingSteppers/BookingStepper";
import CloseIcon from "@mui/icons-material/Close";
import { topicService } from "../../../Services/topicService";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";
import { userAccountService } from "../../../Services/userAccountService";
import { ERROR_MESSAGES } from "../../../shared/constants/common";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../Store/slices/userSlice";
import { bookingService } from "../../../Services/bookingService";

const BookingDialog = (props) => {
  const [topicList, setTopicList] = React.useState([]);
  const [mentorInfo, setMentorInfo] = React.useState(null);
  const [allowedBooking, setAllowedBooking] = React.useState(true);

  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();
  const userInfo = useSelector(selectUserInfo);

  function CustomDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "grey",
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  React.useEffect(() => {
    const fetchData = async (mentorId) => {
      try {
        setLoading(true);
        const topics = await topicService.getTopicsByMentor(mentorId);
        const mentorInfo = await userAccountService.getUserProfileById(
          mentorId
        );

        setTopicList(topics);
        setMentorInfo(mentorInfo);
      } catch (error) {
        setNotification({
          isOpen: true,
          type: "error",
          message: ERROR_MESSAGES.COMMON_ERROR,
        });
      } finally {
        setLoading(false);
      }
    };
    const checkAllowedBooking = async (studentId) => {
      if (studentId) {
        let data = await bookingService.checkBookingAllowed(studentId);
        setAllowedBooking(data.result);
      }
    };

    if (props.mentorId) {
      fetchData(props.mentorId);
    }
    checkAllowedBooking(userInfo.accountId);
  }, []);

  return (
    <Dialog fullWidth open={props.open} maxWidth="none">
      <CustomDialogTitle onClose={() => props.handleOpenDialog(false)}>
        <Typography
          fontWeight={700}
          fontSize="2rem"
          textAlign="center"
          color="#283493"
        >
          Đặt lịch cố vấn
        </Typography>
      </CustomDialogTitle>
      <DialogContent>
        {allowedBooking ? (
          <BookingStepper
            topics={topicList}
            mentorId={props.mentorId}
            mentorInfo={mentorInfo}
            handleCloseDialog={() => props.handleOpenDialog(false)}
          />
        ) : (
          <Typography fontSize="1.2rem">
            Hiện tại bạn không thể đặt lịch hẹn.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
