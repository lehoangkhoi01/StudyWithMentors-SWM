import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import style from "./EventInfoDialog.module.scss";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../shared/constants/common";

const EventInfoDialog = (props) => {
  const formatedEventDateTime = (startTime, endTime) => {
    if (startTime && endTime) {
      return (
        format(startTime, DATE_FORMAT.DD_MM_YYYY) +
        " - Từ " +
        format(startTime, DATE_FORMAT.HH_mm) +
        " đến " +
        format(endTime, DATE_FORMAT.HH_mm)
      );
    } else return null;
  };

  const onRemoveSchedule = async () => {
    await props.handleRemoveSchedule(props.event?.scheduleId);
    props.handleClose();
  };

  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.handleClose}>
        <DialogContent>
          <div className={`${style.eventDialog__container}`}>
            <SquareIcon
              className={`${style.freeTime} ${style.eventDialog__icon}`}
            />
            <Typography fontSize="1.2rem" fontWeight={600}>
              {props.event?.title}
            </Typography>
          </div>
          <div className={`${style.eventDialog__container}`}>
            <AccessTimeIcon className={`${style.eventDialog__icon}`} />
            <Typography fontSize="1.2rem">
              {formatedEventDateTime(props.event?.start, props.event?.end)}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onRemoveSchedule}>
            Xóa
          </Button>
          <Button variant="contained">Chỉnh sửa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventInfoDialog;
