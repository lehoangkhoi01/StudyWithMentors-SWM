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
import { useCustomLoading } from "../../Helpers/generalHelper";
import { scheduleService } from "../../Services/sheduleService";
import moment from "moment/moment";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../shared/constants/common";

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

  const handleSubmitCreateSchedule = async (newSchedule) => {
    setLoading(true);
    try {
      await scheduleService.createSchedule(newSchedule);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEvent = (e) => {
    setSelectedEvent(e);
    setOpenScheduleForm(true);
  };

  const handleSelectSlot = (e) => {
    console.log(e);
  };

  const handleNavigate = async (newDate, view) => {
    setCurrentDate(newDate);
    await triggerRangeChangeEvent(newDate, view);
  };

  const navigateToDate = async (date) => {
    setCurrentDate(date);
    await triggerRangeChangeEvent(date);
  };

  const getStartEndTime = (date, view) => {
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

    let result = {
      start: format(
        rangeStart.toDate(),
        DATE_FORMAT.BACK_END_YYYY_MM_DD__HH_mm_ss
      ),
      end: format(rangeEnd.toDate(), DATE_FORMAT.BACK_END_YYYY_MM_DD__HH_mm_ss),
    };
    return result;
  };

  const triggerRangeChangeEvent = async (date, view) => {
    setLoading(true);
    const startEnd = getStartEndTime(date, view);
    // const startTime = format(
    //   startEnd.start,
    //   DATE_FORMAT.BACK_END_YYYY_MM_DD__HH_mm_ss
    // );
    // const endTime = format(
    //   startEnd.end,
    //   DATE_FORMAT.BACK_END_YYYY_MM_DD__HH_mm_ss
    // );

    try {
      const result = await scheduleService.getSchedule(
        startEnd.start,
        startEnd.end
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEventList(events);
    const fetchSchedule = async () => {
      await triggerRangeChangeEvent(new Date());
    };
    fetchSchedule();
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
            //onRangeChange={onRangeChange}
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
