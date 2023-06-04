import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { useNotification } from "../../../Helpers/generalHelper";

const NotiSnackbar = () => {
  const { setNotiOpen } = useNotification();
  const notification = useSelector((state) => state.notification);

  const handleClose = () => {
    setNotiOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={notification.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        severity={notification.type ?? "success"}
        sx={{ width: "100%" }}
        onClose={handleClose}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotiSnackbar;
