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

const BookingDialog = (props) => {
  const [topicList, setTopicList] = React.useState([]);
  const [mentorInfo, setMentorInfo] = React.useState(null);

  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

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

    if (props.mentorId) {
      fetchData(props.mentorId);
    }
  }, []);

  return (
    <Dialog fullWidth open={props.open} maxWidth="none">
      <CustomDialogTitle onClose={() => props.handleOpenDialog(false)}>
        <Typography variant="h5" color="#1a237e">
          Đặt lịch cố vấn
        </Typography>
      </CustomDialogTitle>
      <DialogContent>
        <BookingStepper
          topics={topicList}
          mentorId={props.mentorId}
          mentorInfo={mentorInfo}
          handleCloseDialog={() => props.handleOpenDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
