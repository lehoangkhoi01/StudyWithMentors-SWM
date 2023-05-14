import React from "react";
import Calendar from "react-calendar";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./MiniCalendar.scss";
import { BUTTON_LABEL } from "../../../shared/constants/common";

const MiniCalendar = (props) => {
  return (
    <div>
      <Calendar locale="vi" minDate={new Date()} className="react-calendar" />
      <Button
        className="react-calendar__addButton"
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={props.handleOpen}
      >
        {BUTTON_LABEL.CREATE_SCHEDULE}
      </Button>
    </div>
  );
};

export default MiniCalendar;
