import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { BUTTON_LABEL } from "../../constants/common";

const ConfirmationDialog = (props) => {
  return (
    <Dialog
      open={props.open ?? false}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>{BUTTON_LABEL.CANCEL}</Button>
        <Button onClick={props.handleSubmit} autoFocus>
          {BUTTON_LABEL.CONFIRM}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
