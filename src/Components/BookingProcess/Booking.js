import { Button } from "@mui/material";
import React from "react";
import BookingDialog from "./BookingDialog/BookingDialog";

const Booking = () => {
  const [openBookingDialog, setOpenBookingDialog] = React.useState(false);
  const mentorId = "333439c9-d32c-488f-b39d-92df2bcbdb6d";

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
          mentorId={mentorId}
          handleOpenDialog={handleOpenBookingDialog}
        />
      )}
    </div>
  );
};

export default Booking;
