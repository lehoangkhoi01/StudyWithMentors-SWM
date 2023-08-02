import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import { useForm, Controller } from "react-hook-form";
import RatingInput from "../../../shared/components/RatingInput/RatingInput";
import { seminarFeedbackValidationField } from "../../SeminarFeedback/seminarFeedbackValidation";
import { meetingFeedbackService } from "../../../Services/meetingFeedbackService";
import {
  useCustomLoading,
  useNotification,
} from "../../../Helpers/generalHelper";

const FeedbackDialog = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const submitFeedback = async (data) => {
    try {
      setLoading(true);
      const body = {
        content: data.feedbackText,
        rating: data.bookingRating,
        receiver: props.bookingInfo.mentor.accountId,
      };
      const bookingId = props.bookingInfo.id;
      await meetingFeedbackService.sendFeedback(bookingId, body);
      setNotification({
        isOpen: true,
        type: "success",
        message: "Gửi đánh giá thành công",
      });
      props.setOpenFeedbackDialog(false);
      props.setOpenBookingInfoDialog(false);
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: "Gửi đánh giá thất bại. Xin vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={() => props.setOpenFeedbackDialog(false)}
    >
      <form onSubmit={handleSubmit(submitFeedback)}>
        <DialogTitle>
          <Typography
            fontWeight={700}
            fontSize="2rem"
            textAlign="center"
            color="#283493"
          >
            Đánh giá
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Controller
            name="bookingRating"
            control={control}
            defaultValue={0}
            rules={{
              validate: seminarFeedbackValidationField,
            }}
            render={({ field }) => (
              <RatingInput
                title="Đánh giá của bạn về buổi tư vấn"
                field={field}
                name="rating"
                onChange={(event, value) => field.onChange(value)}
                error={errors.bookingRating}
              />
            )}
          />

          <div style={{ padding: "1rem" }}>
            <CustomizedTextField
              multiline
              maxRows={3}
              optional={true}
              name="Bạn có ý kiến gì thêm không"
              options={{
                ...register("feedbackText"),
              }}
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{ width: "60%", alignSelf: "flex-end", marginLeft: "auto" }}
        >
          <CustomizedButton
            color="primary600"
            variant="outlined"
            size="small"
            onClick={() => props.setOpenFeedbackDialog(false)}
          >
            Trở lại
          </CustomizedButton>
          <CustomizedButton
            color="primary600"
            variant="contained"
            size="small"
            type="submit"
          >
            Gửi đánh giá
          </CustomizedButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FeedbackDialog;
