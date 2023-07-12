import { Button } from "@mui/material";
import React from "react";
import BookingDialog from "./BookingDialog/BookingDialog";

const Booking = () => {
  const [openBookingDialog, setOpenBookingDialog] = React.useState(false);

  const handleOpenBookingDialog = (status) => {
    setOpenBookingDialog(status);
  };

  return (
    <div>
      Booking
      <Button variant="contained" onClick={() => handleOpenBookingDialog(true)}>
        Đặt lịch
      </Button>
      {openBookingDialog && (
        <BookingDialog
          open={openBookingDialog}
          handleOpenDialog={handleOpenBookingDialog}
        />
      )}
    </div>
  );
};

export default Booking;
