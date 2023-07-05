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
  formats,
  mLocalizer,
  max,
  views,
  customDayPropGetter,
  eventPropGetter,
  messages,
} from "./calendarConfig";
import NoteSection from "./NoteSection/NoteSection";
import ScheduleDialog from "./ScheduleDialog/ScheduleDialog";
import { userAccountService } from "../../Services/userAccountService";
import { useCustomLoading } from "../../Helpers/generalHelper";
import moment from "moment/moment";

const CustomCalendar = () => {
  const [openScheduleForm, setOpenScheduleForm] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { setLoading } = useCustomLoading();

  const handleCloseScheduleForm = () => {
    setOpenScheduleForm(false);
  };
  const handleOpenScheduleForm = () => {
    setSelectedEvent(null);
    setOpenScheduleForm(true);
  };

  const handleSubmitCreateSchedule = (newSchedule) => {
    console.log(newSchedule);
    setEventList((prev) => [...prev, newSchedule]);
    console.log(eventList);
  };

  const handleSelectEvent = (e) => {
    setSelectedEvent(e);
    setOpenScheduleForm(true);
  };

  const handleSelectSlot = (e) => {
    console.log(e);
  };

  const handleNavigate = (newDate, view) => {
    setCurrentDate(newDate);
    triggerRangeChangeEvent(newDate, view);
  };

  const navigateToDate = (date) => {
    setCurrentDate(date);
    triggerRangeChangeEvent(date);
  };

  const onRangeChange = async (range) => {
    console.log(range);
    try {
      setLoading(true);
      const result = await userAccountService.getUserInfo();
      console.log(result);
      setEventList(events);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const triggerRangeChangeEvent = (date, view) => {
    const start = moment(date).startOf(view);
    const end = moment(date).endOf(view);
    let rangeStart = 0;
    let rangeEnd = 0;
    if (start.day() !== 0) {
      rangeStart = start.clone().subtract(start.day() - 1, "days");
    } else {
      rangeStart = start.clone().subtract(6 - start.day(), "days");
    }

    if (end.day() !== 0) {
      rangeEnd = end.clone().add(7 - end.day(), "days");
    } else {
      rangeEnd = end.clone().add(end.day(), "days");
    }

    console.log(rangeStart.toDate());
    console.log(rangeEnd.toDate());
  };

  useEffect(() => {
    setEventList(events);
  }, []);

  return (
    <div className={`${style.calendar__page}`}>
      <Grid2 container className={`${style.calendar__container}`}>
        <Grid2 className={`${style.calendar__wrapper}`} xs={4}>
          <MiniCalendar
            handleOpen={handleOpenScheduleForm}
            navigateToDate={navigateToDate}
          />
          <NoteSection />
        </Grid2>
        <Grid2
          className={`${style.calendar__wrapper} ${style.calendar__bigCalendar}`}
          xs={8}
        >
          <BigCalendar
            components={components}
            defaultView={Views.WEEK}
            date={currentDate}
            dayPropGetter={customDayPropGetter}
            eventPropGetter={eventPropGetter}
            events={eventList}
            messages={messages}
            localizer={mLocalizer}
            formats={formats}
            max={max}
            showMultiDayTimes
            step={60}
            timeslots={1}
            views={views}
            selectable={true}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            onRangeChange={onRangeChange}
            onNavigate={handleNavigate}
          />
        </Grid2>
      </Grid2>

      <ScheduleDialog
        open={openScheduleForm}
        selectedEvent={selectedEvent}
        startDate={currentDate}
        handleClose={handleCloseScheduleForm}
        handleSubmitCreateSchedule={handleSubmitCreateSchedule}
      />
    </div>
  );
};

export default CustomCalendar;
