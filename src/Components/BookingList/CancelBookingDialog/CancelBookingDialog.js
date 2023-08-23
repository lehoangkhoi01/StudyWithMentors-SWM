import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CustomizedButton from "../../../shared/components/Button/CustomizedButton";
import CustomizedTextField from "../../../shared/components/TextField/CustomizedTextField";
import { BOOKING_STATUS } from "../../../shared/constants/systemType";
import { ERROR_MESSAGES, LENGTH } from "../../../shared/constants/common";

const CancelBookingDialog = (props) => {
  const [cancelReason, setCancelReason] = React.useState(null);
  const [error, setError] = React.useState(null);

  const onReasonChange = (e) => {
    setError(null);
    setCancelReason(e.target.value);
  };

  const handleCancelBooking = async () => {
    if (!cancelReason || !cancelReason?.trim()) {
      setError(ERROR_MESSAGES.REQUIRED_FIELD);
      return;
    } else if (cancelReason?.trim().length > LENGTH.CANCEL_REASON) {
      setError(`Tối đa ${LENGTH.CANCEL_REASON} kí tự.`);
      return;
    }
    const data = {
      bookingIds: [props.bookingInfo?.id],
      reason: cancelReason,
      status: BOOKING_STATUS.REJECTED,
    };
    await props.handleUpdateBookingStatus(data, BOOKING_STATUS.REJECTED);
    props.setOpenCancelBookingDialog(false);
  };

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={() => props.setOpenCancelBookingDialog(false)}
    >
      <DialogTitle>
        <Typography
          fontWeight={700}
          fontSize="2rem"
          textAlign="center"
          color="#283493"
        >
          Hủy lịch
        </Typography>
      </DialogTitle>
      <DialogContent>
        <CustomizedTextField
          multiline
          maxRows={3}
          optional={false}
          required={true}
          name="Lý do hủy lịch"
          error={error}
          helperText={error}
          maxLength={LENGTH.CANCEL_REASON}
          onChange={onReasonChange}
        />
      </DialogContent>
      <DialogActions
        sx={{ width: "60%", alignSelf: "flex-end", marginLeft: "auto" }}
      >
        <CustomizedButton
          color="primary600"
          variant="outlined"
          size="small"
          onClick={() => props.setOpenCancelBookingDialog(false)}
        >
          Trở lại
        </CustomizedButton>
        <CustomizedButton
          color="primary600"
          variant="contained"
          size="small"
          onClick={handleCancelBooking}
        >
          Xác nhận
        </CustomizedButton>
      </DialogActions>
    </Dialog>
  );
};

export default CancelBookingDialog;
