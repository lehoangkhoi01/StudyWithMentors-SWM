import React, { useMemo, useCallback } from "react";
import moment from "moment/moment";
import "moment/locale/vi";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events";
import * as dates from "../../Helpers/dateHelper";
import style from "./CustomCalendar.module.scss";

moment.locale("vi");
moment.updateLocale("vi", {
  weekdays: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
});
const mLocalizer = momentLocalizer(moment);
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    className: style.cell,
  });

const customDayPropGetter = () => {
  return {
    className: style.cell,
  };
};

const CustomCalendar = ({ localizer = mLocalizer }) => {
  const { components, defaultDate, max, views, formats } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(),
      max: dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours"),
      formats: {
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, "dddd - D/M", culture),
      },
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  const eventPropGetter = useCallback(
    (event) => ({
      ...(event.title.includes("Meeting") && {
        className: style.meeting,
      }),
    }),
    []
  );

  return (
    <>
      <div className="height600">
        <Calendar
          components={components}
          defaultDate={defaultDate}
          dayPropGetter={customDayPropGetter}
          eventPropGetter={eventPropGetter}
          events={events}
          localizer={localizer}
          formats={formats}
          max={max}
          showMultiDayTimes
          step={60}
          timeslots={1}
          views={views}
        />
      </div>
    </>
  );
};

export default CustomCalendar;
