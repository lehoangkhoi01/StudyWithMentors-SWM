/*
  Component: ConfirmationDialog
  Description: Populate the dialog for confirmation of a critical user's action. 
              Dialog contain 2 buttons: Confirm and Cancel
  Component's props:
    - open(Boolean): dialog state is open or not
    - title(String): Title of the dialog
    - content(String): Content or messages in the dialog
    - confirmLabel(String): The label for confirm button
    - cancelLabel(String): The label for cancel button
    - handleClose(func): The function to change state (hide) the dialog
    - handleSubmit (func): The function invoked after the confirmation is clicked. 
                          Consider to close dialog in this function.
*/

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { BUTTON_LABEL } from "../../constants/common";
import CustomizedButton from "../Button/CustomizedButton";

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
      <DialogActions sx={{ width: "60%", alignSelf: "flex-end" }}>
        <CustomizedButton
          size="small"
          variant="outlined"
          color="primary600"
          onClick={props.handleClose}
        >
          {props.cancelLabel ?? BUTTON_LABEL.CANCEL}
        </CustomizedButton>
        <CustomizedButton
          size="small"
          variant="contained"
          color="primary600"
          onClick={props.handleSubmit}
          autoFocus
        >
          {props.confirmLabel ?? BUTTON_LABEL.CONFIRM}
        </CustomizedButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
