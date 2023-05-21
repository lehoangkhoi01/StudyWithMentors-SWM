import React, { useEffect, useState } from "react";
import "moment/locale/vi";
import { Calendar as BigCalendar, Views } from "react-big-calendar";
import "./react-big-calendar.css";
import MiniCalendar from "./MiniCalendar/MiniCalendar";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import events from "./customEvents";
import style from "./CustomCalendar.module.scss";
import {
  components,
  defaultDate,
  formats,
  mLocalizer,
  max,
  views,
  customDayPropGetter,
  eventPropGetter,
} from "./calendarConfig";
import NoteSection from "./NoteSection/NoteSection";
import ScheduleDialog from "./ScheduleDialog/ScheduleDialog";

const CustomCalendar = () => {
  const [openScheduleForm, setOpenScheduleForm] = useState(false);
  const [eventList, setEventList] = useState([]);
  const handleCloseScheduleForm = () => {
    setOpenScheduleForm(false);
  };
  const handleOpenScheduleForm = () => {
    setOpenScheduleForm(true);
  };

  const handleSubmitCreateSchedule = (newSchedule) => {
    console.log(newSchedule);
    setEventList((prev) => [...prev, newSchedule]);
    console.log(eventList);
  };

  useEffect(() => {
    setEventList(events);
  }, []);

  return (
    <div className={`${style.calendar__page}`}>
      <Grid2 container className={`${style.calendar__container}`}>
        <Grid2 className={`${style.calendar__wrapper}`} xs={4}>
          <MiniCalendar handleOpen={handleOpenScheduleForm} />
          <NoteSection />
        </Grid2>
        <Grid2
          className={`${style.calendar__wrapper} ${style.calendar__bigCalendar}`}
          xs={8}
        >
          <BigCalendar
            components={components}
            defaultDate={defaultDate}
            defaultView={Views.WEEK}
            dayPropGetter={customDayPropGetter}
            eventPropGetter={eventPropGetter}
            events={eventList}
            localizer={mLocalizer}
            formats={formats}
            max={max}
            showMultiDayTimes
            step={60}
            timeslots={1}
            views={views}
            selectable={false}
          />
        </Grid2>
      </Grid2>

      <ScheduleDialog
        open={openScheduleForm}
        handleClose={handleCloseScheduleForm}
        handleSubmitCreateSchedule={handleSubmitCreateSchedule}
      />
    </div>
  );
};

export default CustomCalendar;
