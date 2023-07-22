import React from "react";
import moment from "moment/moment";
import style from "./CustomBigCalendar.module.scss";
import "moment/locale/vi";
import { Views, momentLocalizer } from "react-big-calendar";
import * as dates from "../../../Helpers/dateHelper";
import CustomToolbar from "./CustomToolbar/CustomToolbar";
import { BOOKING_STATUS } from "../../constants/systemType";

moment.locale("vi");
moment.updateLocale("vi", {
  weekdays: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  months: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
});

const MyCustomHeader = ({ label }) => (
  <div className={`${style.week}`}>
    <div>{label}</div>
  </div>
);

const AgendaHeader = ({ label }) => {
  return (
    <div>
      <div>{label}</div>
    </div>
  );
};

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    className: style.cell,
  });

export const mLocalizer = momentLocalizer(moment);
export const defaultDate = new Date();
export const max = dates.add(
  dates.endOf(new Date(2015, 17, 1), "day"),
  -1,
  "hours"
);

export const formats = {
  dayFormat: (date, culture, localizer) =>
    localizer.format(date, "dddd - D/M", culture),
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, "D MMMM ", culture) +
    " - " +
    localizer.format(end, "D MMMM", culture) +
    ", " +
    localizer.format(new Date(), "YYYY", culture),
};

export const views = [Views.WEEK, Views.AGENDA];

export const components = {
  timeSlotWrapper: ColoredDateCellWrapper,
  week: {
    header: MyCustomHeader,
  },
  timeGutterWrapper: (timeGutterWrapperProps) => {
    return (
      <div id="time-gutter-wrapper" style={{ backgroundColor: "#E8EAF6" }}>
        {timeGutterWrapperProps.children}
      </div>
    );
  },
  eventWrapper: (eventWrapperProps) => {
    const style = {
      backgroundColor: "#3948AB",
    };
    return <div style={style}>{eventWrapperProps.children}</div>;
  },
  agenda: {
    agendaHeader: AgendaHeader,
  },
  toolbar: CustomToolbar,
};

export const customDayPropGetter = () => {
  return {
    className: style.cell,
  };
};

export const eventPropGetter = (event, start, end, isSelected) => ({
  ...(isSelected &&
    event.title.includes("Nhận tư vấn") && {
      style: {
        backgroundColor: "#5c6ac0",
      },
    }),
  ...(isSelected &&
    !event.title.includes("Nhận tư vấn") && {
      style: {
        backgroundColor: "#FFF7DF !important",
      },
    }),
  ...(isSelected &&
    event.bookStatus &&
    event.bookStatus === BOOKING_STATUS.REQUESTED && {
      className: style.requestedEvent,
    }),
  ...(isSelected &&
    event.bookStatus &&
    event.bookStatus === BOOKING_STATUS.ACCEPTED && {
      className: style.acceptedEvent,
    }),

  ...(event && {
    className: style.requestedEvent,
  }),
  ...(event.bookStatus &&
    event.bookStatus === BOOKING_STATUS.REQUESTED && {
      className: style.requestedEvent,
    }),
  ...(event.bookStatus &&
    event.bookStatus === BOOKING_STATUS.ACCEPTED && {
      className: style.acceptedEvent,
    }),
  ...(event.title.includes("Nhận tư vấn") && {
    className: style.freeEvent,
  }),
});

export const messages = {
  date: "Ngày",
  time: "Giờ",
  event: "Sự kiện",
  noEventsInRange: "Không có dữ liệu",
};
