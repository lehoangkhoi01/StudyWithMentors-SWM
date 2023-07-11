import React from "react";
import { Calendar, Views } from "react-big-calendar";
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
import "./react-big-calendar.css";

export const CustomBigCalendar = (props) => {
  return (
    <Calendar
      components={components}
      defaultView={Views.WEEK}
      date={props.date}
      dayPropGetter={customDayPropGetter}
      eventPropGetter={eventPropGetter}
      events={props.events}
      messages={messages}
      localizer={mLocalizer}
      formats={formats}
      max={max}
      showMultiDayTimes
      step={60}
      timeslots={1}
      views={views}
      selectable={true}
      onSelectEvent={props.onSelectEvent}
      onSelectSlot={props.onSelectSlot}
      onNavigate={props.onNavigate}
    />
  );
};
