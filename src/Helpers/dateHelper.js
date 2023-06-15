import { format, parse } from "date-fns";
import * as dates from "date-arithmetic";
import { DATE_FORMAT } from "../shared/constants/common";

// CONVERT {date} from {fromFormat} (ex: dd/MM/yyyy) to {toFormat} (ex: MM-yyyy)
export const convertDateFormat = (date, fromFormat, toFormat) => {
  if (!date || !fromFormat || !toFormat) return "";

  const fromDateFormat = parse(date, fromFormat, new Date());

  return format(fromDateFormat, toFormat);
};

// CONVERT {date} from {dateFormat} (ex: dd/MM/yyyy) to ISODate (ex: 2011-10-05T14:48:00.000Z)
export const covertToISODate = (dateFormat, date) => {
  if (!date || date === "Invalid Date") return "";

  if (date instanceof Date) return date;

  return parse(date, dateFormat, new Date());
};

// CONVERT {date} from ISODate (ex: 2011-10-05T14:48:00.000Z) to {dateFormat} (ex: dd/MM/yyyy)
export const convertISOToFormat = (dateFormat, date) => {
  if (!date) {
    return "";
  }

  const selectedDate = new Date(date ?? new Date());

  return format(selectedDate, dateFormat);
};

// CONVERT the time (hh:mm:ss) to object {hour, minute, second}
export const convertTimeToObject = (time) => {
  const splitTime = time.toString().trim().split(":");

  return {
    hour: splitTime[0],
    minute: splitTime[1],
    second: splitTime[2],
  };
};

// CONVERT FROM {fromDateFormat (default yyyy-MM-dd} 12:20:06)
// TO 12:20{seperator (default ",")} {toDateFormat (default yyyy-MM-dd}
export const handleTimeToDisplay = (
  fullDate,
  fromDateFormat,
  toDateFormat,
  seperator
) => {
  const [date, time] = fullDate.toString().split(" ");

  const timeObject = convertTimeToObject(time);
  const formatedDate = convertDateFormat(
    date,
    fromDateFormat ?? DATE_FORMAT.BACK_END_YYYY_MM_DD,
    toDateFormat ?? DATE_FORMAT.DOT_DD_MM_YYYY
  );

  return `${timeObject.hour}:${timeObject.minute}${
    seperator ?? ","
  } ${formatedDate}`;
};

export {
  milliseconds,
  seconds,
  minutes,
  hours,
  month,
  startOf,
  endOf,
  add,
  eq,
  neq,
  gte,
  gt,
  lte,
  lt,
  inRange,
  min,
  max,
} from "date-arithmetic";

const MILLI = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
};

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export function monthsInYear(year) {
  let date = new Date(year, 0, 1);

  return MONTHS.map((i) => dates.month(date, i));
}

export function firstVisibleDay(date, localizer) {
  let firstOfMonth = dates.startOf(date, "month");

  return dates.startOf(firstOfMonth, "week", localizer.startOfWeek());
}

export function lastVisibleDay(date, localizer) {
  let endOfMonth = dates.endOf(date, "month");

  return dates.endOf(endOfMonth, "week", localizer.startOfWeek());
}

export function visibleDays(date, localizer) {
  let current = firstVisibleDay(date, localizer),
    last = lastVisibleDay(date, localizer),
    days = [];

  while (dates.lte(current, last, "day")) {
    days.push(current);
    current = dates.add(current, 1, "day");
  }

  return days;
}

export function ceil(date, unit) {
  let floor = dates.startOf(date, unit);

  return dates.eq(floor, date) ? floor : dates.add(floor, 1, unit);
}

export function range(start, end, unit = "day") {
  let current = start,
    days = [];

  while (dates.lte(current, end, unit)) {
    days.push(current);
    current = dates.add(current, 1, unit);
  }

  return days;
}

export function merge(date, time) {
  if (time == null && date == null) return null;

  if (time == null) time = new Date();
  if (date == null) date = new Date();

  date = dates.startOf(date, "day");
  date = dates.hours(date, dates.hours(time));
  date = dates.minutes(date, dates.minutes(time));
  date = dates.seconds(date, dates.seconds(time));
  return dates.milliseconds(date, dates.milliseconds(time));
}

export function eqTime(dateA, dateB) {
  return (
    dates.hours(dateA) === dates.hours(dateB) &&
    dates.minutes(dateA) === dates.minutes(dateB) &&
    dates.seconds(dateA) === dates.seconds(dateB)
  );
}

export function isJustDate(date) {
  return (
    dates.hours(date) === 0 &&
    dates.minutes(date) === 0 &&
    dates.seconds(date) === 0 &&
    dates.milliseconds(date) === 0
  );
}

export function duration(start, end, unit, firstOfWeek) {
  if (unit === "day") unit = "date";
  return Math.abs(
    dates[unit](start, undefined, firstOfWeek) -
      dates[unit](end, undefined, firstOfWeek)
  );
}

export function diff(dateA, dateB, unit) {
  if (!unit || unit === "milliseconds") return Math.abs(+dateA - +dateB);

  // the .round() handles an edge case
  // with DST where the total won't be exact
  // since one day in the range may be shorter/longer by an hour
  return Math.round(
    Math.abs(
      +dates.startOf(dateA, unit) / MILLI[unit] -
        +dates.startOf(dateB, unit) / MILLI[unit]
    )
  );
}

export function total(date, unit) {
  let ms = date.getTime(),
    div = 1;

  switch (unit) {
    case "week":
      div *= 7;
      break;
    case "day":
      div *= 24;
      break;
    case "hours":
      div *= 60;
      break;
    case "minutes":
      div *= 60;
      break;
    case "seconds":
      div *= 1000;
      break;
    default:
  }

  return ms / div;
}

export function week(date) {
  var d = new Date(date);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
}

export function today() {
  return dates.startOf(new Date(), "day");
}

export function yesterday() {
  return dates.add(dates.startOf(new Date(), "day"), -1, "day");
}

export function tomorrow() {
  return dates.add(dates.startOf(new Date(), "day"), 1, "day");
}
