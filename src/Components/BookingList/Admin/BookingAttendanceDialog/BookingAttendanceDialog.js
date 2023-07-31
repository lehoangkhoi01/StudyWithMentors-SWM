import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import {
  useCustomLoading,
  useNotification,
} from "../../../../Helpers/generalHelper";
import { bookingService } from "../../../../Services/bookingService";
import { ERROR_MESSAGES } from "../../../../shared/constants/common";

const BookingAttendanceDialog = (props) => {
  const [logs, setLogs] = React.useState([]);

  const { setLoading } = useCustomLoading();
  const { setNotification } = useNotification();

  const renderData = () => {
    if (logs.length > 0) {
      return logs.map((log) => (
        <>
          <Typography>{log.message + " at " + log.logDate}</Typography>
        </>
      ));
    } else return <Typography>Chưa có dữ liệu</Typography>;
  };

  React.useEffect(() => {
    const fetchLogsByBooking = async () => {
      try {
        if (props.bookingId) {
          setLoading(true);
          const result = await bookingService.getLogAttendance(props.bookingId);
          setLogs(result);
        }
      } catch (error) {
        setNotification({
          isOpen: true,
          type: "error",
          message: ERROR_MESSAGES.COMMON_ERROR,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchLogsByBooking();
  }, []);

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={() => props.setOpenDialog(false)}
    >
      <DialogTitle>
        <Typography variant="h4" color="#1a237e">
          Ghi chú hệ thống
        </Typography>
      </DialogTitle>
      <DialogContent>{renderData()}</DialogContent>
    </Dialog>
  );
};

export default BookingAttendanceDialog;
