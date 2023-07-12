import {
  Dialog,
  //   Button,
  //   DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import BookingStepper from "../BookingSteppers/BookingStepper";
import CloseIcon from "@mui/icons-material/Close";

const BookingDialog = (props) => {
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

  return (
    <Dialog fullWidth open={props.open} maxWidth="none">
      <CustomDialogTitle onClose={() => props.handleOpenDialog(false)}>
        <Typography variant="h5">Đặt lịch cố vấn</Typography>
      </CustomDialogTitle>
      <DialogContent>
        <BookingStepper />
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={() => props.handleOpenDialog(false)}>Trở về</Button>
        <Button onClick={() => props.handleOpenDialog(false)}>Tiếp tục</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default BookingDialog;
