import { Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { format } from "date-fns";
import React from "react";
import { getDayOfWeek } from "../../../../Helpers/dateHelper";
import { DATE_FORMAT } from "../../../../shared/constants/common";
import style from "./TimeSlot.module.scss";

const TimeSlots = (props) => {
  return (
    <Grid2 container rowSpacing={2} spacing={2} marginY={1}>
      {props.timeSlots.length > 0 ? (
        props.timeSlots.map((slot, index) => (
          <Grid2 xs={6} xl={3} key={`timeslot${index}`}>
            <Paper className={`${style.timeSlot__paper}`}>
              <Typography fontWeight={600}>
                {getDayOfWeek(new Date(slot.startDate))}
              </Typography>
              <Typography>
                {format(new Date(slot.startDate), "dd-MM")}
              </Typography>
              <Typography color="#1a237e" fontWeight={600}>
                {format(new Date(slot.startTime), DATE_FORMAT.HH_mm)} -
                {format(new Date(slot.endTime), DATE_FORMAT.HH_mm)}
              </Typography>
            </Paper>
          </Grid2>
        ))
      ) : (
        <Typography>Chưa có dữ liệu</Typography>
      )}
    </Grid2>
  );
};

export default TimeSlots;
