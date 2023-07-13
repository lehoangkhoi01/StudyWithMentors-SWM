import moment from "moment";
import format from "date-fns/format";
import { DATE_FORMAT } from "../shared/constants/common";

export const getStartEndTime = (date, view) => {
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
    start: format(rangeStart.toDate(), DATE_FORMAT.BACK_END_YYYY_MM_DD),
    end: format(rangeEnd.toDate(), DATE_FORMAT.BACK_END_YYYY_MM_DD),
  };
  return result;
};

export const processSchedules = (schedules) => {
  let result = [];

  if (schedules && schedules.timeSlots.length > 0) {
    schedules.timeSlots.map((schedule, index) => {
      if (schedule.enable) {
        const newSchedule = {
          id: index,
          exceptionId: schedule.exceptionId,
          scheduleId: schedule.scheduleId,
          title: "Nhận tư vấn",
          start: new Date(schedule.startTime),
          end: new Date(schedule.endTime),
          belongToSeries: schedule.belongToSeries,
        };
        result.push(newSchedule);
      }
    });
  }

  return result;
};
