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

const CancelBookingDialog = (props) => {
  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={() => props.setOpenCancelBookingDialog(false)}
    >
      <DialogTitle>
        <Typography variant="h5">Hủy lịch</Typography>
      </DialogTitle>
      <DialogContent>
        <CustomizedTextField
          multiline
          maxRows={3}
          optional={true}
          name="Lý do hủy lịch"
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
        <CustomizedButton color="primary600" variant="contained" size="small">
          Xác nhận
        </CustomizedButton>
      </DialogActions>
    </Dialog>
  );
};

export default CancelBookingDialog;
