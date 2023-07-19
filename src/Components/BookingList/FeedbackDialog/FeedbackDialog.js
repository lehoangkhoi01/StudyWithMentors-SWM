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

const FeedbackDialog = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitFeedback = (data) => {
    console.log(data);
  };

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={() => props.setOpenFeedbackDialog(false)}
    >
      <form onSubmit={handleSubmit(submitFeedback)}>
        <DialogTitle>
          <Typography variant="h5" color="#1a237e">
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
