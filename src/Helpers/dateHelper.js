import { format, parse } from "date-fns";

export const convertDateFormat = (date, from, to) => {
  if (!date) return "";

  const fromDateFormat = parse(date, from, new Date());

  return format(fromDateFormat, to);
};

export const covertToISODate = (dateFormat, date) => {
  if (!date) return new Date();

  return parse(date, dateFormat, new Date());
};

export const convertISOToFormat = (dateFormat, date) => {
  const selectedDate = new Date(date ?? new Date());

  return format(selectedDate, dateFormat);
};
